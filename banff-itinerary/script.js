(() => {
  'use strict';

  /* ── Scroll-reveal for day blocks ── */
  const dayBlocks = document.querySelectorAll('.day-block');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // Stagger each block slightly within its section
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  dayBlocks.forEach((b) => revealObserver.observe(b));

  /* ── Reading-progress bar ── */
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop    = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0) {
      progressBar.style.width = (scrollTop / scrollHeight) * 100 + '%';
    }
  }, { passive: true });

  /* ── Active section tracking for the nav ── */
  const sections  = document.querySelectorAll('.loc-section');
  const navItems  = document.querySelectorAll('.snav-item');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navItems.forEach((n) => {
            n.classList.toggle('active', n.dataset.target === id);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ── Persist checklist state in localStorage ── */
  const STORAGE_KEY = 'banff-2026-checks';

  function loadChecks() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }

  function saveChecks(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
  const saved = loadChecks();

  checkboxes.forEach((cb, i) => {
    const key = 'check-' + i;
    if (saved[key]) cb.checked = true;
    cb.addEventListener('change', () => {
      const current = loadChecks();
      current[key] = cb.checked;
      saveChecks(current);
    });
  });

  /* ── Live countdown in hero eyebrow ── */
  const tripStart  = new Date('2026-10-17T00:00:00');
  const eyebrow    = document.getElementById('countdown');

  function updateCountdown() {
    const diff = tripStart - new Date();
    if (diff <= 0) {
      eyebrow.textContent = '🏔️ Have an amazing trip!';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    eyebrow.textContent = days + (days === 1 ? ' day' : ' days') + ' until your trip · October 2026';
  }

  updateCountdown();
  setInterval(updateCountdown, 60_000);
})();
