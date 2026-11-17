# Contact form email on Hostinger

Enquiries are sent to **devika@bbp-india.com**, from
**website@drreshmadrsmile.com**. Replies go to the visitor's email.
The form uses PHP 8.2+ and authenticated SMTP with PHPMailer.

1. In Hostinger hPanel, create or confirm the mailbox
   `website@drreshmadrsmile.com`. Check its outgoing SMTP details in Emails.
2. Select PHP 8.2 or later for the website.
3. Upload the website, including `send-enquiry.php`, `composer.json`,
   `contact.html`, and `contact.js`, to the website's `public_html` directory.
4. In that directory, run `composer install --no-dev --optimize-autoloader`
   over SSH. If SSH is unavailable, run it on a computer with PHP and Composer,
   then upload the resulting `vendor` directory and `composer.lock` too.
5. On the server, copy `mail-config.example.php` to `mail-config.php`.
   Replace the password placeholder with the mailbox password. The defaults
   are `smtp.hostinger.com`, SSL, port `465`. If the mailbox uses another
   provider (such as Titan), use that provider's outgoing SMTP settings.
   Keep the real configuration out of Git; never put credentials in JavaScript.
6. Confirm the domain's SPF and DKIM records using hPanel's email DNS checks.
7. Submit a test from the live HTTPS contact page. Confirm the email arrives
   at Devika's address, check spam, and confirm Reply targets the visitor.

PHP does not run with a static Live Server preview or by opening the HTML file
directly. The success message means the SMTP server accepted the message;
inbox delivery still needs the live test. Failed submissions retain the form
details. No live email has been sent as part of this local change.

Spam protection includes a hidden honeypot and five attempts per IP address
per ten minutes. Rate counters contain timestamps only in PHP's temporary
directory. On high-traffic sites, schedule cleanup of stale `drsmile-enquiry-*`
temporary files or replace this with a managed rate limiter.

References: [Hostinger SMTP settings](https://www.hostinger.com/support/1575756-how-to-get-email-account-configuration-details-for-hostinger-email/),
[Hostinger PHPMailer setup](https://www.hostinger.com/tutorials/how-to-send-emails-using-phpmailer/),
[PHPMailer installation](https://github.com/PHPMailer/PHPMailer).
