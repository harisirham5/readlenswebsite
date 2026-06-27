/**
 * readlens — Shared JavaScript
 * Handles top nav, sidebar injection, scroll animations, mobile menu
 */

/* ── Sidebar Section Configuration ── */
const SIDEBAR_SECTIONS = {
  /* Home page — no sidebar */
  'index.html': null,

  /* Our Team — no sidebar */
  'pageourteam/index.html': null,

  /* Problem Identification */
  'pageproblemidentification/index.html': {
    groups: [
      {
        title: 'Problem Identification',
        items: [
          { label: 'The Challenge', href: '#challenge' },
          { label: 'Target Users', href: '#target-users' },
          { label: 'Project Goal', href: '#project-goal' },
          { label: 'Global Impact', href: '#global-impact' },
          { label: 'Benchmarking', href: '#benchmarking' },
          { label: 'Research Validation', href: '#research' },
        ]
      }
    ]
  },

  /* Engineering Design */
  'pageengineeringdesign/index.html': {
    groups: [
      {
        title: 'Engineering Design',
        items: [
          { label: 'Bill of Process', href: '#bill-of-process' },
          { label: 'System Flowchart', href: '#system-flowchart' },
          { label: 'Project Timeline', href: '#project-timeline' },
          { label: 'Design Sketch', href: '#design-sketch' },
          { label: 'Circuit Diagram', href: '#circuit-diagram' },
        ]
      }
    ]
  },

  /* Design Requirements */
  'pagedesignrequirement/index.html': {
    groups: [
      {
        title: 'Design Requirements',
        items: [
          { label: 'Core Features', href: '#core-features' },
          { label: 'Design Specification', href: '#design-specification' },
        ]
      }
    ]
  },
};

/* ── Utility: get path prefix based on current page depth ── */
function getPathPrefix() {
  const path = window.location.pathname;
  const depth = path.split('/').filter(Boolean).length - 1;
  return depth > 0 ? '../'.repeat(depth) : '';
}

/* ── Utility: get relative href ── */
function resolveHref(href) {
  if (href.startsWith('http') || href.startsWith('#')) return href;
  return getPathPrefix() + href;
}

/* ── Get current page key for sidebar config ── */
function getCurrentPageKey() {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return 'index.html';
  return parts.join('/');
}

/* ── Inject Top Navigation ── */
function injectTopNav() {
  const nav = document.querySelector('.top-nav');
  if (!nav) return;

  const currentPage = getCurrentPageKey();
  const prefix = getPathPrefix();
  const logoPath = prefix + 'blacklogoandtext.png';

  // Build nav links
  let navLinksHTML = '';
  const navItems = [
    { label: 'Home', href: 'index.html' },
    { label: 'Our Team', href: 'pageourteam/index.html' },
    { label: 'Problems', href: 'pageproblemidentification/index.html' },
    { label: 'Engineering', href: 'pageengineeringdesign/index.html' },
    { label: 'Requirements', href: 'pagedesignrequirement/index.html' },
  ];

  navItems.forEach(item => {
    const isActive = currentPage === item.href ||
      (currentPage.startsWith(item.href.replace('/index.html', '')) && item.href !== 'index.html');
    navLinksHTML += `<a href="${resolveHref(item.href)}" class="${isActive ? 'active' : ''}">${item.label}</a>`;
  });

  let html = `<a href="#main-content" class="skip-link">Skip to content</a>`;
  html += `<a href="${resolveHref('index.html')}" class="logo" aria-label="home">`;
  html += `<img src="${logoPath}" alt="readlens logo">`;
  html += `</a>`;
  html += `<button class="hamburger" aria-label="Toggle menu" aria-controls="top-nav-links" aria-expanded="false">`;
  html += `<span></span><span></span><span></span>`;
  html += `</button>`;
  html += `<div class="top-nav-links" id="top-nav-links">${navLinksHTML}</div>`;

  nav.innerHTML = html;
}

/* ── Inject Sidebar ── */
function injectSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const currentPage = getCurrentPageKey();
  const config = SIDEBAR_SECTIONS[currentPage];
  if (!config) return;

  let html = '';
  config.groups.forEach(group => {
    html += `<div class="sidebar-group">`;
    html += `<div class="sidebar-group__title">${group.title}</div>`;
    group.items.forEach(item => {
      html += `<a href="${item.href}" class="sidebar-link">${item.label}</a>`;
    });
    html += `</div>`;
  });

  sidebar.innerHTML = html;
}

/* ── Inject Footer ── */
function injectFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  const year = new Date().getFullYear();
  footer.innerHTML = `<p>&copy; ${year} <a href="${resolveHref('index.html')}">readlens</a> Project. All rights reserved.</p>`;
}

/* ── Mobile Menu Toggle ── */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.top-nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen.toString());
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Sidebar Toggle (mobile) ── */
function initSidebarToggle() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('visible', isOpen);
    toggle.setAttribute('aria-expanded', isOpen.toString());
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Close sidebar on link click (mobile)
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('visible');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ── Scroll Effects ── */
function initScrollEffects() {
  const nav = document.querySelector('.top-nav');

  const onScroll = () => {
    if (window.scrollY > 10) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reduced motion: hide canvas
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const canvas = document.getElementById('canvas-container');
    if (canvas) canvas.style.display = 'none';
  }
}

/* ── Intersection Observer for reveal animations ── */
function initReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.content-section, .team-card, .reveal').forEach(el => {
    observer.observe(el);
  });
}

/* ── Sidebar Active Link Highlighting ── */
function initSidebarActive() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const links = sidebar.querySelectorAll('.sidebar-link');
  if (!links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' });

  document.querySelectorAll('.content-section[id]').forEach(section => {
    observer.observe(section);
  });
}

/* ── Initialize ── */
document.addEventListener('DOMContentLoaded', () => {
  injectTopNav();
  injectSidebar();
  injectFooter();
  initMobileMenu();
  initSidebarToggle();
  initScrollEffects();
  initReveal();
  initSidebarActive();
});
