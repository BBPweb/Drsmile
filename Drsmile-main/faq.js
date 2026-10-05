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

const categoryButtons = [...document.querySelectorAll('[data-category]')].filter(el => el.tagName === 'BUTTON');
const questions = [...document.querySelectorAll('.faq-item')];
const search = document.querySelector('#faq-search');
const status = document.querySelector('.faq-results');
const emptyState = document.querySelector('.faq-empty');
let selectedCategory = 'all';
const normalize = value => value.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
function filterQuestions() {
  const terms = normalize(search.value).split(' ').filter(Boolean);
  let visible = 0;
  questions.forEach(question => {
    const matchesCategory = selectedCategory === 'all' || question.dataset.category === selectedCategory;
    const content = normalize(question.textContent);
    question.hidden = !matchesCategory || !terms.every(term => content.includes(term));
    if (!question.hidden) visible++;
  });
  categoryButtons.forEach(button => {
    const active = button.dataset.category === selectedCategory;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  status.textContent = `${visible} ${visible === 1 ? 'question' : 'questions'} found`;
  emptyState.hidden = visible > 0;
}
categoryButtons.forEach(button => button.addEventListener('click', () => {
  selectedCategory = button.dataset.category;
  filterQuestions();
}));
search.addEventListener('input', filterQuestions);
document.querySelector('.faq-reset').addEventListener('click', () => {
  selectedCategory = 'all';
  search.value = '';
  filterQuestions();
  search.focus();
});
document.querySelector('.faq-categories').hidden = false;
document.querySelector('.faq-search-wrap').hidden = false;
filterQuestions();
