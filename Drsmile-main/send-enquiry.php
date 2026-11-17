<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $success, string $message): never
{
    http_response_code($status);
    if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => $success, 'message' => $message]);
    } else {
        header('Content-Type: text/html; charset=utf-8');
        echo '<!doctype html><html lang="en"><meta charset="utf-8">'
            . '<meta name="viewport" content="width=device-width, initial-scale=1">'
            . '<title>Contact Dr. Smile</title><body><main><h1>Contact Dr. Smile</h1><p>'
            . htmlspecialchars($message, ENT_QUOTES, 'UTF-8')
            . '</p><a href="contact.html#enquiry">Back to contact form</a></main></body></html>';
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Please submit the contact form.');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 32768) {
    respond(413, false, 'Your enquiry is too long. Please shorten it and try again.');
}

function field(string $name): string
{
    $value = $_POST[$name] ?? '';
    if (!is_string($value) || preg_match('//u', $value) !== 1 || str_contains($value, "\0")) {
        respond(422, false, 'Please check your form details and try again.');
    }
    return trim($value);
}

$successMessage = 'Thank you. Your enquiry has been submitted to our team. We will get back to you soon.';
if (field('website') !== '') {
    respond(200, true, $successMessage);
}

$name = field('name');
$email = field('email');
$phone = field('phone');
$clinic = field('clinic');
$message = field('message');

// Byte limits allow up to four UTF-8 bytes per character for free-text fields.
if ($name === '' || strlen($name) > 400 || preg_match('/[\r\n]/', $name)
    || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || preg_match('/[\r\n]/', $email)
    || strlen($phone) > 120 || preg_match('/[\r\n]/', $phone)
    || !in_array($clinic, ['No preference', 'Kalamassery', 'Panampilly Nagar'], true)
    || $message === '' || strlen($message) > 12000) {
    respond(422, false, 'Please enter a valid name, email, clinic and message within the form limits.');
}

// Keep attempt counters out of the public web directory and lock across requests.
$rateFile = sys_get_temp_dir() . '/drsmile-enquiry-'
    . hash('sha256', __DIR__ . '|' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
$rateHandle = @fopen($rateFile, 'c+');
if (!$rateHandle || !flock($rateHandle, LOCK_EX)) {
    if ($rateHandle) fclose($rateHandle);
    respond(503, false, 'Enquiries are temporarily unavailable. Please call 08296099118.');
}
$attempts = json_decode(stream_get_contents($rateHandle), true);
$attempts = is_array($attempts) ? array_values(array_filter($attempts,
    static fn ($time) => is_int($time) && $time > time() - 600)) : [];
if (count($attempts) >= 5) {
    flock($rateHandle, LOCK_UN);
    fclose($rateHandle);
    header('Retry-After: 600');
    respond(429, false, 'Too many enquiries. Please wait 10 minutes or call 08296099118.');
}
$attempts[] = time();
ftruncate($rateHandle, 0);
rewind($rateHandle);
fwrite($rateHandle, json_encode($attempts));
flock($rateHandle, LOCK_UN);
fclose($rateHandle);

try {
    $autoload = __DIR__ . '/vendor/autoload.php';
    $configPath = __DIR__ . '/mail-config.php';
    if (!is_file($autoload) || !is_file($configPath)) {
        throw new RuntimeException('Mail setup is incomplete.');
    }
    require $autoload;
    $config = require $configPath;
    if (empty($config['password']) || $config['password'] === 'REPLACE_WITH_MAILBOX_PASSWORD') {
        throw new RuntimeException('Mailbox credentials are not configured.');
    }

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->Port = (int) $config['port'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPSecure = $mail->Port === 465
        ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Timeout = 20;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom('website@drreshmadrsmile.com', 'Dr. Smile Website');
    $mail->addAddress('devika@bbp-india.com');
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'Website enquiry - Dr. Smile';
    $mail->isHTML(false);
    $mail->Body = implode("\r\n", [
        'New enquiry from the Dr. Smile website', '',
        'Name: ' . $name, 'Email: ' . $email,
        'Phone: ' . ($phone ?: 'Not provided'),
        'Preferred clinic: ' . $clinic, '', 'Message:', $message,
    ]);
    $mail->send();
} catch (Throwable $error) {
    // Do not expose SMTP credentials, server responses or enquiry details.
    error_log('Dr. Smile enquiry: email submission failed; check SMTP configuration and availability.');
    respond(503, false, 'Your enquiry could not be sent. Please try again later or call 08296099118.');
}

respond(200, true, $successMessage);
