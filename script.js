document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header shrink on scroll ---------- */
  const header = document.querySelector('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mainNav.classList.toggle('open');
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mainNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Scrollspy: highlight active nav link ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => spyObserver.observe(section));

  /* ---------- Reveal-on-scroll ---------- */
  const revealTargets = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Package search/filter ---------- */
  const searchInput = document.getElementById('package-search');
  const packageCards = document.querySelectorAll('.package-card');
  const countEl = document.getElementById('package-count');

  const filterPackages = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;
    packageCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const match = name.includes(query);
      card.classList.toggle('hidden', !match);
      if (match) visible++;
    });
    countEl.textContent = `${visible} / ${packageCards.length} journeys`;
  };

  if (searchInput) {
    searchInput.addEventListener('input', filterPackages);
    filterPackages();
  }

  /* ---------- Founder's note modal ---------- */
  const founderCard = document.getElementById('founder-card');
  const founderModal = document.getElementById('founder-modal');
  const founderModalClose = document.getElementById('founder-modal-close');

  const openFounderModal = () => {
    founderModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    founderModalClose.focus();
  };

  const closeFounderModal = () => {
    founderModal.classList.remove('open');
    document.body.style.overflow = '';
    founderCard.focus();
  };

  if (founderCard) {
    founderCard.addEventListener('click', openFounderModal);
    founderCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFounderModal();
      }
    });
  }

  founderModalClose.addEventListener('click', closeFounderModal);
  founderModal.addEventListener('click', (e) => {
    if (e.target === founderModal) closeFounderModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && founderModal.classList.contains('open')) closeFounderModal();
  });

  /* ---------- Gallery: category filter ---------- */
  const categoryBtns = document.querySelectorAll('.category-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryEmpty = document.getElementById('gallery-empty');

  const applyGalleryFilter = (category) => {
    let visible = 0;
    galleryItems.forEach(item => {
      const match = category === 'all' || item.dataset.category === category;
      item.classList.toggle('hidden', !match);
      if (match) visible++;
    });
    galleryEmpty.classList.toggle('show', visible === 0);
  };

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyGalleryFilter(btn.dataset.category);
    });
  });

  /* ---------- Gallery: lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxPanel = document.getElementById('lightbox-panel');
  const lightboxClose = document.getElementById('lightbox-close');

  const openLightbox = (item) => {
    const img = item.querySelector('img');
    const fallback = item.querySelector('.gallery-item-fallback');
    const caption = item.dataset.caption || '';
    const imgLoaded = img && img.style.display !== 'none';

    lightboxPanel.innerHTML = '';

    if (imgLoaded) {
      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      fullImg.alt = img.alt;
      lightboxPanel.appendChild(fullImg);
    } else if (fallback) {
      lightboxPanel.style.background = fallback.style.background;
    }

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-caption-overlay';
    overlay.textContent = caption;
    lightboxPanel.appendChild(overlay);

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  /* ---------- Contact form (no backend — friendly confirmation) ---------- */
  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = 'Thanks — your message has been noted. Our team will reply within 24 hours.';
      formNote.classList.add('show');
      contactForm.reset();
    });
  }

  /* ---------- Smooth-scroll offset handled by CSS scroll-padding-top ---------- */
});
