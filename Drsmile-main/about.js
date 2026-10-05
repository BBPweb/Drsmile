const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    mobileMenu.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileMenu.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      mobileMenu.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-label', 'Open menu');
      mobileMenu.textContent = '☰';
    });
  });
}

const revealItems = document.querySelectorAll('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const counters = document.querySelectorAll('[data-count]');
const countUp = (element) => {
  const target = Number(element.dataset.count);
  const start = performance.now();
  const duration = reduceMotion ? 0 : 850;

  const update = (now) => {
    const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
    element.textContent = String(Math.round(target * progress));
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

if ('IntersectionObserver' in window && !reduceMotion) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });
  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => { counter.textContent = counter.dataset.count; });
}

const approachTabs = [...document.querySelectorAll('.approach-tab')];
const approachPanel = document.querySelector('.approach-panel');

const activateTab = (tab, moveFocus = false) => {
  approachTabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-selected', String(isActive));
    item.setAttribute('tabindex', isActive ? '0' : '-1');
  });

  approachPanel.setAttribute('aria-labelledby', tab.id);
  approachPanel.querySelector('.panel-index').textContent = tab.dataset.index;
  approachPanel.querySelector('h3').textContent = tab.dataset.title;
  approachPanel.querySelector('p').textContent = tab.dataset.copy;
  approachPanel.classList.remove('is-changing');
  requestAnimationFrame(() => approachPanel.classList.add('is-changing'));
  if (moveFocus) tab.focus();
};

approachTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      activateTab(approachTabs[event.key === 'Home' ? 0 : approachTabs.length - 1], true);
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + approachTabs.length) % approachTabs.length;
    activateTab(approachTabs[nextIndex], true);
  });
});
