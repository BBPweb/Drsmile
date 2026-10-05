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