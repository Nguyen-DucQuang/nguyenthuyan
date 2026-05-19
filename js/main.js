const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

const pageAliases = {
  main: 'home',
  home: 'home',
  about: 'about',
  branding: 'branding',
  projects: 'projects',
  workshop: 'workshop',
  posters: 'posters'
};
const pageLinks = document.querySelectorAll('.nav-links a[href^="#"], .cv-menu a[href^="#"], .brand[href^="#"], .footer-brand[href^="#"], .skip-link[href^="#"]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
const pages = document.querySelectorAll('.portfolio-page[data-page]');

function getCurrentPage() {
  const hash = location.hash.replace('#', '');
  return pageAliases[hash] || 'home';
}

function showPortfolioPage(page, shouldScroll = true) {
  pages.forEach(section => {
    section.classList.toggle('is-active-page', section.dataset.page === page);
  });

  document.querySelectorAll(`.portfolio-page[data-page="${page}"] .reveal`).forEach(el => {
    el.classList.add('is-visible');
  });

  navItems.forEach(link => {
    const target = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', pageAliases[target] === page);
  });

  if (navLinks) navLinks.classList.remove('open');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  if (shouldScroll) requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
}

pageLinks.forEach(link => {
  link.addEventListener('click', event => {
    const target = link.getAttribute('href').replace('#', '');
    if (!pageAliases[target]) return;
    event.preventDefault();
    const nextHash = `#${pageAliases[target]}`;
    if (location.hash === nextHash) {
      showPortfolioPage(pageAliases[target]);
    } else {
      location.hash = pageAliases[target];
    }
  });
});

window.addEventListener('hashchange', () => showPortfolioPage(getCurrentPage()));
showPortfolioPage(getCurrentPage(), false);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const box = document.createElement('div');
    box.className = 'form-note';
    box.textContent = 'Biểu mẫu demo: bạn có thể kết nối form này với EmailJS, Formspree hoặc backend riêng.';
    form.appendChild(box);
    setTimeout(() => box.remove(), 4500);
  });
}
