const menuButton = document.querySelector('.mobile-menu');
const menuLinks = document.querySelector('.nav-links');

function closeMenu() {
  menuLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.textContent = '\u2630';
}

menuButton.addEventListener('click', () => {
  const open = menuLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.textContent = open ? '\u00d7' : '\u2630';
});

menuLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuLinks.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

const enquiryForm = document.querySelector('.contact-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(enquiryForm);
    const value = name => String(fields.get(name) || '').trim();
    const body = [
      `Name: ${value('name')}`,
      `Email: ${value('email')}`,
      `Phone: ${value('phone') || 'Not provided'}`,
      `Preferred clinic: ${value('clinic')}`,
      '',
      value('message')
    ].join('\r\n');
    const subject = 'Website enquiry - Dr. Smile';
    window.location.href = `mailto:info@drreshmadrsmile.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    enquiryForm.querySelector('.contact-form-status').textContent =
      'Your enquiry is ready in your email app. If it did not open, email info@drreshmadrsmile.com or call 08296099118.';
  });
}
