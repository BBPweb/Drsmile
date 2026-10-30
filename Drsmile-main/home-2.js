const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
function closeMenu() {
  primaryNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}
menuToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
primaryNav.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
const storyTrack = document.querySelector('.story-track');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function moveStory(direction) {
  const step = storyTrack.querySelector('.story-card').getBoundingClientRect().width + 20;
  const atStart = storyTrack.scrollLeft < 4;
  const atEnd = storyTrack.scrollLeft + storyTrack.clientWidth >= storyTrack.scrollWidth - 4;
  const left = direction > 0 && atEnd ? 0 : direction < 0 && atStart ? storyTrack.scrollWidth : storyTrack.scrollLeft + direction * step;
  storyTrack.scrollTo({left, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}
document.querySelectorAll('.story-controls button').forEach(button => {
  button.addEventListener('click', () => moveStory(Number(button.dataset.direction)));
});
storyTrack.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    moveStory(event.key === 'ArrowRight' ? 1 : -1);
  }
});
