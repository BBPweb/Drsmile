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
  enquiryForm.addEventListener('submit', async event => {
    event.preventDefault();
    const button = enquiryForm.querySelector('button[type="submit"]');
    const status = enquiryForm.querySelector('.contact-form-status');
    if (button.disabled || !enquiryForm.reportValidity()) return;
    const originalLabel = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Sending…';
    enquiryForm.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your enquiry…';
    try {
      const response = await fetch(enquiryForm.action, {
        method: 'POST',
        body: new FormData(enquiryForm),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Unable to send your enquiry. Please try again or call 08296099118.');
      }
      status.textContent = result.message;
      enquiryForm.reset();
    } catch (error) {
      status.textContent = error instanceof SyntaxError || error instanceof TypeError
        ? 'Unable to confirm your enquiry was sent. Please try again or call 08296099118.'
        : error.message;
    } finally {
      button.disabled = false;
      button.innerHTML = originalLabel;
      enquiryForm.removeAttribute('aria-busy');
    }
  });
}
