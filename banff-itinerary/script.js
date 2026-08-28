(() => {
  'use strict';

  /* ── Scroll-reveal for day blocks ── */
  const dayBlocks = document.querySelectorAll('.day-block');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
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

  /* ── Photo galleries + Lightbox ── */
  /* Photo data is embedded here so it works with file:// and any server.
     To add more photos per place, append more URLs to the photos array.   */
  const POIS = {
    'calgary-zoo': {
      name: 'Wilder Institute / Calgary Zoo',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmBeP2o4K3wXE10NHquXD22dlccGG4avlxkvrId7jIDdpSnhyOnOaXaqb9bIFPAuPa9N3uwggkKL4pBHoiztvCt7Qx7aucZzd4ytSOQeSy2Zvobwx08ccbO54_qpF60l4yq8-Bjgg']
    },
    'canmore-main-street': {
      name: 'Canmore Main Street',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl4Z1C_ScpO2G1rDHpF0EnmC9pxlle12foFW7tZQ82JTB8BX-MdgrcYJgBGrYu4TnMc9LpHkFooXYPvuvx-1Cm7jvVnO-RkOrgqkHhqU-P44n4IRGCZiI2SUpvK7Ap7DMm5HP3BGg']
    },
    'banff-avenue': {
      name: 'Banff Avenue',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlORwM7XFWABgJCDQcRqe36EO_5wthGJfastOEGOVDdylDNI3-saWV7c6tsDZKcY_foF29ggPfmRFiKKCrG_HaFORJW6kKkvpOu0Yn-cE_zPMhlVLB3PkG7hdiG6T1FrHyKfrAQ']
    },
    'bow-falls': {
      name: 'Bow Falls',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkKG9D6rUw2pfKeebVqMGeanFDPL5YRgD94l4qhNwPXorc8N2VItloPQ-6CHpFKtSgatS6BrPZXFnj-Og7Hb73OgVJO8uB1wgjq-DNq6o2RFPK4hC4A4CpBZvNQenBnJ4R8_iA3']
    },
    'banff-gondola': {
      name: 'Banff Gondola',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkY9LC_YIFPgj4eXFRA0IweuLVm4WyFupILE2N7AENAbBHxMq7wsVuBlDwAfstYDBmhUlF0GLvD-KVwNj8tHrGxE8EsCFjPH1cyWa-OV76yvNMRdmBGxMbBOFZbJyza3QBS21eJ1o9RwUcE']
    },
    'lake-louise': {
      name: 'Lake Louise',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn9mmhdRMaTQQrHzqyIZLCetPaWQyO7OsPRNiOdgQoAO78h6xx1GShu2FCm4IAFaw8aUBbmitfd-sUg5YmOMMOARLPrWeutGqclNjeEWR4vQn_PJFl78b9C_IkSxM98lS3946Wl']
    },
    'bow-lake': {
      name: 'Bow Lake',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlx8JX5zdt3alQeftM_AHSAxGttTl1310gSPIuk3E5_63WUt9KFvLhwRZl2xvv5U-L8D-2QeBa_MfKD7Hn9QiBinajXErxHqUSkMAA1e3ZpFAnVYwshfqP9XKEZBWH1wBFziRG7']
    },
    'peyto-lake': {
      name: 'Peyto Lake',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm-0gVY03UfxP1gz4Huxfbglxar3_S06hESVOs2kuMIVS3HjcFjMUXC8FUsGiy91XoTPVCqFa0bxFPHh3J9pgpubyBkfEBCQWajoFvPBqXWW5QO6LMzlFW1GLY_C0OtSPiVJGWz']
    },
    'icefields-parkway': {
      name: 'Icefields Parkway',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWldme1qENwCezd_zbq2o_OKFMag5bIZQA_H4eybI25DRhM7Uv_EeTBKsUFoQKQHtYqqs4YKxTzWIgK6zimtbhKLyjZzagN0dTJwuzJ3DFCBXolBZNWGA7no5bTTf04oTD8ndvxn']
    },
    'athabasca-falls': {
      name: 'Athabasca Falls',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWncWkDRxBxM1UkRDqytDEmVqoKEjF6FwHp5XJodkVg__iaBizOzaa3yRievpdHAQV3rUqIVxUgHCCbZ50EqvT7zXaWENECYHm2sgd-JOPNU6umyH98Xm41XjRhfis4TD22U73GkpQ']
    },
    'pyramid-lake': {
      name: 'Pyramid Lake & Pyramid Island',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnT_EdZVmp-tYEGXQdxa0BniO4p8YsIhc-lq0jP6pOspRa7LeX_AE3wZk7DurDzAcx_ZrDZiFGqXNG5IGFD90_ZMCt8YLfQHCi8mM-HTvwxH2htLBeHfN8roziaTb8qpeoWLS6c']
    },
    'jasper-townsite': {
      name: 'Jasper Townsite',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl8clo6jlWY9JtUgVe78_n37LfrnPeCRTLe8mPFkRH8e-5lELPC7tZCvtWnGp9xe0bb80Vm74NhIjA6Jdvlw83tyqYLOd5F_hX3yPLhsqHuKFvtT9SejvtNNWkzv8k3yMpBNjuNtQ']
    },
    'jasper-skytram': {
      name: 'Jasper SkyTram',
      photos: ['https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnVQY21XhaToWBqmdlfPOnv0MqdGGD8jLuqZp7hL9ZVOZQ76up3qA5xaj_5O9xUYpY1EXkfcCLeaeYx0vhauKs4iYyTkzsCCuVWn06iOJmPfr8161tC3eQAS0jqr9BOLNFnGTsSGA']
    }
  };

  function initPhotoGalleries() {
    const pois = POIS;

    /* Build lightbox DOM (single instance, reused) */
    const lb = document.createElement('div');
    lb.id = 'lb';
    lb.className = 'lb-overlay';
    lb.setAttribute('aria-hidden', 'true');
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = `
      <button class="lb-close" aria-label="Close lightbox">&#x2715;</button>
      <button class="lb-nav" id="lb-prev" aria-label="Previous photo">&#8249;</button>
      <div class="lb-img-wrap">
        <img class="lb-img" src="" alt="" />
      </div>
      <button class="lb-nav" id="lb-next" aria-label="Next photo">&#8250;</button>
      <div class="lb-caption">
        <span class="lb-caption-name"></span>
        <span class="lb-caption-count"></span>
      </div>
    `;
    document.body.appendChild(lb);

    const lbImg       = lb.querySelector('.lb-img');
    const lbPrev      = lb.querySelector('#lb-prev');
    const lbNext      = lb.querySelector('#lb-next');
    const lbName      = lb.querySelector('.lb-caption-name');
    const lbCount     = lb.querySelector('.lb-caption-count');

    let currentPhotos = [];
    let currentIndex  = 0;
    let currentName   = '';

    /* Size helpers — strip existing size suffix then append desired one */
    function thumb(base) { return base + '=w600-h450-k-no'; }
    function full(base)  { return base + '=w1400-h1050-k-no'; }

    function renderSlide(index) {
      lbImg.src          = full(currentPhotos[index]);
      lbImg.alt          = currentName;
      lbPrev.disabled    = index === 0;
      lbNext.disabled    = index === currentPhotos.length - 1;
      lbCount.textContent = currentPhotos.length > 1
        ? `${index + 1} / ${currentPhotos.length}` : '';
      /* Show nav only when there are multiple photos */
      const multi = currentPhotos.length > 1;
      lbPrev.style.visibility = multi ? '' : 'hidden';
      lbNext.style.visibility = multi ? '' : 'hidden';
    }

    function openLightbox(photos, index, name) {
      currentPhotos = photos;
      currentIndex  = index;
      currentName   = name;
      lbName.textContent = name;
      renderSlide(index);
      lb.classList.add('lb-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbImg.focus?.();
    }

    function closeLightbox() {
      lb.classList.remove('lb-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function prev() {
      if (currentIndex > 0) { currentIndex--; renderSlide(currentIndex); }
    }
    function next() {
      if (currentIndex < currentPhotos.length - 1) { currentIndex++; renderSlide(currentIndex); }
    }

    lbPrev.addEventListener('click', prev);
    lbNext.addEventListener('click', next);
    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);

    /* Close on backdrop click */
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

    /* Keyboard navigation */
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('lb-open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    });

    /* Touch swipe support */
    let touchStartX = 0;
    lb.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend',   (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    });

    /* Inject photo strips into each poi-row that has a data-place-id */
    document.querySelectorAll('[data-place-id]').forEach((row) => {
      const id  = row.dataset.placeId;
      const poi = pois[id];
      if (!poi || !poi.photos || poi.photos.length === 0) return;

      const strip = document.createElement('div');
      strip.className = 'poi-photos';

      poi.photos.forEach((photoBase, i) => {
        const img      = document.createElement('img');
        img.className  = 'poi-photo-thumb';
        img.src        = thumb(photoBase);
        img.alt        = poi.name;
        img.loading    = 'lazy';
        img.title      = `Click to view ${poi.name}`;
        img.addEventListener('click', () => openLightbox(poi.photos, i, poi.name));
        strip.appendChild(img);
      });

      row.appendChild(strip);
    });
  }

  initPhotoGalleries();
})();
