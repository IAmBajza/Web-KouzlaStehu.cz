(() => {
  const header = document.querySelector('[data-header]');
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

  // Lightbox
  const dlg = document.querySelector('[data-lightbox]');
  const gallery = document.querySelector('[data-gallery]');
  const closeBtn = dlg?.querySelector('[data-close]');
  const img = dlg?.querySelector('img');
  const caption = dlg?.querySelector('figcaption');

  function openLightbox(src, text) {
    if (!dlg || !img || !caption) return;
    img.src = src;
    img.alt = text || 'Fotka výrobku';
    caption.textContent = text || '';
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', 'true');
  }

  function closeLightbox() {
    if (!dlg) return;
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
  }

  if (gallery) {
    gallery.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-full]');
      if (!btn) return;
      openLightbox(btn.getAttribute('data-full'), btn.getAttribute('data-caption'));
    });
  }

  closeBtn?.addEventListener('click', closeLightbox);
  dlg?.addEventListener('click', (e) => {
    // close when clicking backdrop
    const rect = dlg.getBoundingClientRect();
    const inDialog =
      rect.top <= e.clientY && e.clientY <= rect.bottom &&
      rect.left <= e.clientX && e.clientX <= rect.right;
    if (!inDialog) closeLightbox();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();
