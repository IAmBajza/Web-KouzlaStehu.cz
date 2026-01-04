(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on nav click (mobile)
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      const within = nav.contains(e.target) || toggle.contains(e.target);
      if (!within) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section highlight in nav (desktop + mobile)
  if (nav && 'IntersectionObserver' in window) {
    const sectionIds = ['uvod', 'ukazky', 'produkty', 'jaktofunguje', 'onas', 'kontakt'];
    const links = new Map(
      sectionIds
        .map((id) => [id, nav.querySelector(`a[href="#${id}"]`)] )
        .filter(([, a]) => !!a)
    );

    const ratios = new Map();

    const setActive = (id) => {
      links.forEach((a) => a.classList.remove('active'));
      const a = links.get(id);
      if (a) a.classList.add('active');
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.target?.id) return;
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });

        let bestId = null;
        let bestRatio = 0;
        for (const [id, r] of ratios.entries()) {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }

        if (bestId) setActive(bestId);
      },
      {
        // “active” when the section is roughly around the center of the viewport
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  // Lightbox (gallery modal)
  const dlg = document.querySelector('[data-lightbox]');
  const gallery = document.querySelector('[data-gallery]');
  const closeBtn = dlg?.querySelector('[data-close]');
  const prevBtn = dlg?.querySelector('[data-prev]');
  const nextBtn = dlg?.querySelector('[data-next]');
  const img = dlg?.querySelector('img');
  const caption = dlg?.querySelector('figcaption');

  const items = gallery ? Array.from(gallery.querySelectorAll('[data-full]')) : [];
  let currentIndex = -1;

  function dialogIsOpen() {
    // <dialog> has `.open` when shown via showModal(), and the "open" attribute in general
    return !!dlg && (dlg.open || dlg.hasAttribute('open'));
  }

  function normIndex(i) {
    if (!items.length) return -1;
    return ((i % items.length) + items.length) % items.length;
  }

  function renderIndex(index) {
    if (!dlg || !img || !caption) return;
    if (!items.length) return;

    const safeIndex = normIndex(index);
    currentIndex = safeIndex;

    const el = items[safeIndex];
    const src = el.getAttribute('data-full') || '';
    const text = el.getAttribute('data-caption') || 'Fotka výrobku';

    img.src = src;
    img.alt = text;
    caption.textContent = text;

    // Small UX win: pre-load neighbors
    const preload = (i) => {
      const idx = normIndex(i);
      const s = items[idx]?.getAttribute('data-full');
      if (!s) return;
      const pre = new Image();
      pre.src = s;
    };
    preload(safeIndex + 1);
    preload(safeIndex - 1);

    dlg.setAttribute('aria-label', `${text} (${safeIndex + 1} / ${items.length})`);
  }

  function openAt(index) {
    if (!dlg) return;
    renderIndex(index);

    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', 'true');
  }

  function closeLightbox() {
    if (!dlg) return;
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
  }

  function next() {
    if (!items.length) return;
    renderIndex(currentIndex + 1);
  }

  function prev() {
    if (!items.length) return;
    renderIndex(currentIndex - 1);
  }

  if (gallery) {
    gallery.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-full]');
      if (!btn) return;
      const idx = items.indexOf(btn);
      openAt(idx >= 0 ? idx : 0);
    });
  }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);
  closeBtn?.addEventListener('click', closeLightbox);

  // Close when clicking backdrop (works reliably with <dialog>)
  dlg?.addEventListener('click', (e) => {
    if (!dialogIsOpen()) return;
    if (e.target === dlg) closeLightbox();
  });

  // Keyboard controls (only when modal is open)
  window.addEventListener('keydown', (e) => {
    if (!dialogIsOpen()) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Basic swipe (mobile). Not fancy, but gets the job done.
  let startX = null;

  dlg?.addEventListener('pointerdown', (e) => {
    if (!dialogIsOpen()) return;
    const target = e.target;
    // ignore pointerdown on interactive elements (buttons/links)
    if (target && (target.closest('button') || target.closest('a'))) return;
    startX = e.clientX;
  });

  dlg?.addEventListener('pointerup', (e) => {
    if (!dialogIsOpen() || startX === null) return;
    const dx = e.clientX - startX;
    startX = null;

    // threshold tuned to avoid accidental triggers
    if (Math.abs(dx) < 60) return;
    if (dx < 0) next();
    else prev();
  });

  dlg?.addEventListener('pointercancel', () => {
    startX = null;
  });

  // Scroll-to-top button
  const topBtn = document.querySelector('[data-to-top]');
  if (topBtn) {
    const onScroll = () => {
      const show = window.scrollY > 600;
      topBtn.classList.toggle('is-visible', show);
      topBtn.setAttribute('aria-hidden', String(!show));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
