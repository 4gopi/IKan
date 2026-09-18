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

  /* ---------- Services accordion ---------- */
  const serviceBlocks = document.querySelectorAll('.service-block');

  serviceBlocks.forEach(block => {
    const header = block.querySelector('.service-block-header');
    header.addEventListener('click', () => {
      const isActive = block.classList.contains('active');

      serviceBlocks.forEach(b => {
        b.classList.remove('active');
        b.querySelector('.service-block-header').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        block.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

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

  /* ---------- Tour package detail modal ---------- */
  const TOUR_DATA = {
    'cultural-triangle': {
      title: 'Cultural Triangle Tour',
      route: 'Airport → Pinnawala → Kandy → Dambulla → Sigiriya → Polonnaruwa → Anuradhapura → Colombo/Negombo → Airport',
      meta: [
        { icon: 'fa-clock', text: '5 Days / 4 Nights' },
        { icon: 'fa-user-friends', text: 'Private tour' }
      ],
      highlights: ['Pinnawala Elephant Orphanage', 'Temple of the Sacred Tooth Relic', 'Dambulla Cave Temple', 'Sigiriya Rock Fortress', 'Polonnaruwa Ancient City', 'Minneriya/Kaudulla Jeep Safari', 'Anuradhapura Ancient City'],
      days: [
        {
          title: 'Airport → Pinnawala → Kandy',
          stay: 'Kandy',
          items: [
            'Arrival at Bandaranaike International Airport, met and greeted by our representative.',
            'Visit the Pinnawala Elephant Orphanage.',
            'Kandy city tour including Kandy Lake and the Temple of the Sacred Tooth Relic.',
            'Optional Kandyan cultural dance show in the evening.'
          ]
        },
        {
          title: 'Kandy → Dambulla → Sigiriya',
          stay: 'Sigiriya / Dambulla',
          items: [
            'Dambulla Cave Temple, known for its ancient Buddhist paintings, murals and Buddha statues.',
            'Sigiriya Rock Fortress — Water Gardens, Boulder Gardens, ancient palace grounds, Lion\u2019s Paw, frescoes and Mirror Wall, with the option to climb to the summit.'
          ]
        },
        {
          title: 'Sigiriya → Polonnaruwa → Minneriya/Kaudulla → Sigiriya',
          stay: 'Sigiriya / Dambulla',
          items: [
            'Polonnaruwa Ancient City, a UNESCO World Heritage Site — Royal Palace complex, Audience Hall, Sacred Quadrangle, Vatadage, Gal Vihara and ancient stupas.',
            'Jeep safari at Minneriya or Kaudulla National Park (the park is chosen closer to your travel date based on elephant movements), with possible sightings of wild elephants, deer, wild boar, crocodiles and birdlife.'
          ]
        },
        {
          title: 'Sigiriya → Anuradhapura → Colombo/Negombo',
          stay: 'Colombo / Negombo',
          items: [
            'Anuradhapura Ancient City — Sri Maha Bodhi, Ruwanwelisaya, Thuparamaya, Jetavanaramaya, the Abhayagiri complex, Twin Ponds and the Samadhi Statue.',
            'Continue to Colombo/Negombo.'
          ]
        },
        {
          title: 'Colombo/Negombo → Airport',
          items: [
            'Short Colombo city tour, time permitting — Galle Face Green, the Old Parliament area, Colombo Fort, Independence Square, Gangaramaya Temple and shopping.',
            'Transfer to the airport for your departure flight.'
          ]
        }
      ],
      hotels: [
        { stop: 'Kandy — 1 night', options: 'Oak Ray Regency, Amaya Hills Kandy, or Earl\u2019s Regency, depending on your preferred category.' },
        { stop: 'Sigiriya — 2 nights', options: 'Sigiriya Hotel (or similar), Aliya Resort & Spa, or Water Garden Sigiriya, depending on your preferred category.' },
        { stop: 'Colombo/Negombo — 1 night', options: 'Goldi Sands (or similar), Jetwing Blue, or Heritance Negombo (or similar), depending on your preferred category.' }
      ],
      hotelNote: 'Hotels are subject to availability and may be replaced with equivalent-category properties.',
      includes: ['Airport pickup and drop-off', 'Private vehicle throughout the tour', 'English-speaking chauffeur/guide', '4 nights\u2019 hotel accommodation', 'Daily breakfast', 'Pinnawala visit', 'Kandy sightseeing', 'Temple of the Sacred Tooth Relic', 'Dambulla Cave Temple', 'Sigiriya Rock Fortress', 'Polonnaruwa Ancient City', 'Minneriya/Kaudulla jeep safari', 'Anuradhapura Ancient City', 'Colombo city tour, time permitting', 'All transportation-related expenses'],
      excludes: ['International airfare', 'Sri Lanka visa/ETA fees', 'Lunches and dinners unless specified', 'Entrance fees unless specifically included', 'Safari jeep charges unless included in the quotation', 'Tips and porterage', 'Personal expenses', 'Travel insurance', 'Camera/video charges where applicable']
    },
    'south-coast': {
      title: 'South Coast Tour',
      route: 'Colombo Airport → Bentota → Galle → Mirissa → Colombo Airport',
      meta: [
        { icon: 'fa-clock', text: '7 Days / 6 Nights' },
        { icon: 'fa-user-friends', text: 'Private tour' }
      ],
      highlights: ['Bentota Beach', 'Madu River Safari', 'Turtle Conservation Centre', 'Galle Fort', 'Weligama', 'Mirissa Beach', 'Optional Whale Watching', 'Colombo City Tour'],
      days: [
        {
          title: 'Airport → Bentota',
          stay: 'Bentota',
          items: [
            'Arrival at Bandaranaike International Airport, met by our representative.',
            'Transfer to Bentota (approx. 2\u00bd–3 hours).',
            'Check in and relax, with an evening at leisure on Bentota Beach.'
          ]
        },
        {
          title: 'Bentota, full day',
          stay: 'Bentota',
          items: [
            'Madu River boat safari.',
            'Visit to a turtle conservation centre.',
            'Time at Bentota Beach, with optional water sports such as jet ski, banana boat, tube ride and water skiing.'
          ]
        },
        {
          title: 'Bentota → Galle',
          stay: 'Galle',
          items: [
            'Optional stop in Hikkaduwa en route for beachside sightseeing.',
            'Galle sightseeing: the UNESCO-listed Galle Fort, Dutch Reformed Church, Old Lighthouse, Galle Fort ramparts, colonial streets, and shopping and cafés.'
          ]
        },
        {
          title: 'Galle → Mirissa',
          stay: 'Mirissa',
          items: [
            'En-route sightseeing around Weligama, with the option to visit Coconut Tree Hill and Weligama Bay.',
            'Check in at Mirissa, with an evening on Mirissa Beach in time for sunset.'
          ]
        },
        {
          title: 'Mirissa, full day',
          stay: 'Mirissa',
          items: [
            'Choice of a morning whale-watching excursion (dolphin and whale spotting, offered as an optional add-on as sea conditions and sightings vary by season) or a leisure day at Mirissa Beach and Coconut Tree Hill, with time for swimming or surfing.'
          ]
        },
        {
          title: 'Mirissa → Colombo',
          stay: 'Colombo',
          items: [
            'Optional stop around Weligama/Ahangama en route.',
            'Colombo city sightseeing: Galle Face Green, Independence Square, Colombo Fort, a Lotus Tower photo stop, and shopping.'
          ]
        },
        {
          title: 'Colombo → Airport',
          items: [
            'Morning at leisure depending on flight time.',
            'Transfer to Bandaranaike International Airport for departure.'
          ]
        }
      ],
      hotels: [
        { stop: 'Bentota', options: 'Amal Beach Hotel, Rockside Beach Resort or Oasey Beach Hotel, up to EKHO Surf Bentota, Thaala Bentota or Pandanus Beach Resort & Spa, depending on your preferred category.' },
        { stop: 'Galle', options: 'Hotel Sea Line, The Dutch Bungalow, The Fort House or Arken Lanka, up to Le Grand Galle, Amari Galle or Radisson Blu Resort Galle, depending on your preferred category.' },
        { stop: 'Mirissa', options: 'Handagedara Resort & Spa, Hotel Vacanza or Paradise Beach Club, up to Mandara Resort Mirissa, Sri Sharavi Beach Villas & Spa or Somerset Mirissa, depending on your preferred category.' },
        { stop: 'Colombo', options: 'Fairway Colombo, City Hotel Colombo or C1 Colombo Fort, up to Cinnamon Red Colombo or Radisson Hotel Colombo, depending on your preferred category.' }
      ],
      hotelNote: 'Hotels are subject to availability and may be replaced with equivalent-category properties.'
    },
    'luxury-honeymoon': {
      title: 'Luxury Sri Lanka Honeymoon',
      route: 'Colombo → Yapahuwa → Anuradhapura → Polonnaruwa → Trincomalee → Sigiriya → Dambulla → Colombo',
      meta: [
        { icon: 'fa-clock', text: '6 Days / 5 Nights' },
        { icon: 'fa-heart', text: 'Private honeymoon package' }
      ],
      highlights: ['Galle Face Green Sunset', 'Yapahuwa Rock Fortress', 'Anuradhapura Sacred City', 'Polonnaruwa Ancient City', 'Uppuveli Beach & Sunrise', 'Sigiriya Rock Fortress', 'Dambulla Cave Temple'],
      days: [
        {
          title: 'Arrival in Colombo | Galle Face Green',
          stay: 'Galle Face Hotel, Colombo',
          items: [
            'Arrival at Bandaranaike International Airport, met by your private chauffeur and transferred to Colombo.',
            'After check-in, an evening visit to Galle Face Green, Colombo\u2019s famous oceanfront promenade, with a romantic sunset walk, optional sunset drinks and a romantic dinner overlooking the sea.',
            'The hotel sits directly on Colombo\u2019s seafront opposite Galle Face Green and is one of the city\u2019s historic landmark hotels.'
          ]
        },
        {
          title: 'Colombo → Yapahuwa → Anuradhapura',
          stay: 'Ulagalla by Uga Escapes, Anuradhapura',
          items: [
            'Early morning departure towards the Cultural Triangle.',
            'Visit Yapahuwa Rock Fortress, known for its ornamental staircase leading to the ancient palace area.',
            'Continue to Anuradhapura to explore its sacred sites, including Sri Maha Bodhi, Ruwanwelisaya Stupa, Thuparamaya, and the ancient monastery areas.',
            'An excellent honeymoon choice: the property is set across a large natural landscape, with villas offering a far more private experience than a conventional city hotel.'
          ]
        },
        {
          title: 'Anuradhapura → Polonnaruwa → Trincomalee',
          stay: 'Trinco Blu by Cinnamon, Trincomalee',
          items: [
            'Visit the medieval capital of Polonnaruwa, including Gal Vihara, the Royal Palace area, ancient temples, Vatadage, and the sacred quadrangle.',
            'Continue to the East Coast for a relaxed afternoon and evening at Uppuveli Beach.',
            'Beach Chalet or Ocean View room recommended for the honeymoon experience — the hotel has beachfront accommodation with direct access to the beach.'
          ]
        },
        {
          title: 'Trincomalee Sunrise → Sigiriya',
          stay: 'Jetwing Vil Uyana, Sigiriya',
          items: [
            'Early sunrise beach experience at Uppuveli before breakfast and check-out.',
            'Visit the UNESCO-listed Sigiriya Rock Fortress, popularly known as Lion Rock — allow around 2\u00bd–3\u00bd hours to enjoy the climb at a relaxed, unhurried pace.',
            'The most distinctive honeymoon hotel on this itinerary: the property is surrounded by wetlands and natural landscapes, with an individual-villa concept that offers privacy and a strong romantic atmosphere. Sigiriya Rock is approximately 6.9 km from the property.'
          ]
        },
        {
          title: 'Dambulla → Colombo',
          stay: 'Shangri-La Colombo',
          items: [
            'Visit the Dambulla Cave Temple, a five-cave complex of ancient Buddhist statues and murals — allow around 1–1\u00bd hours.',
            'Continue to Colombo for an evening of sightseeing depending on arrival time — Independence Square, Colombo Fort, shopping at One Galle Face Mall — and a romantic dinner.'
          ]
        },
        {
          title: 'Colombo → Airport | Departure',
          items: [
            'Breakfast at the hotel, with free time for shopping, relaxation or sightseeing depending on flight timing.',
            'Private transfer to Bandaranaike International Airport for departure.'
          ]
        }
      ],
      includes: ['5 nights\u2019 luxury accommodation', 'Daily breakfast', 'Private air-conditioned luxury car', 'English-speaking chauffeur', 'Airport arrival transfer', 'Airport departure transfer', 'All sightseeing as mentioned', 'Highway/parking charges', 'Honeymoon room decoration/amenity', 'Complimentary honeymoon cake', 'Bottled drinking water during transfers', 'All applicable government taxes/service charges where included by suppliers'],
      excludes: ['International airfare', 'Visa/ETA charges', 'Lunches and dinners unless specifically mentioned', 'Alcoholic beverages', 'Personal expenses', 'Spa treatments', 'Travel insurance', 'Optional whale-watching/boat excursions', 'Tips and gratuities']
    }
  };

  const tourModal = document.getElementById('tour-modal');
  const tourModalClose = document.getElementById('tour-modal-close');
  const tourModalRoute = document.getElementById('tour-modal-route');
  const tourModalTitle = document.getElementById('tour-modal-title');
  const tourModalMeta = document.getElementById('tour-modal-meta');
  const tourModalHighlights = document.getElementById('tour-modal-highlights');
  const tourModalDays = document.getElementById('tour-modal-days');
  const tourModalHotels = document.getElementById('tour-modal-hotels');
  const tourModalInclusions = document.getElementById('tour-modal-inclusions');
  const tourModalNote = document.getElementById('tour-modal-note');

  const escapeHtml = (str) => String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const renderTourModal = (data) => {
    tourModalRoute.textContent = data.route || '';
    tourModalTitle.textContent = data.title || '';

    tourModalMeta.innerHTML = (data.meta || [])
      .map(m => `<span><i class="fas ${m.icon}"></i> ${escapeHtml(m.text)}</span>`)
      .join('');

    tourModalHighlights.innerHTML = (data.highlights || [])
      .map(h => `<span>${escapeHtml(h)}</span>`)
      .join('');

    tourModalDays.innerHTML = (data.days || [])
      .map((d, i) => `
        <div class="tour-day">
          <div class="tour-day-number">${i + 1}</div>
          <h4>${escapeHtml(d.title)}</h4>
          <ul>${d.items.map(it => `<li>${escapeHtml(it)}</li>`).join('')}</ul>
          ${d.stay ? `<div class="tour-day-stay"><i class="fas fa-bed"></i>Overnight: ${escapeHtml(d.stay)}</div>` : ''}
        </div>
      `).join('');

    if (data.hotels && data.hotels.length) {
      tourModalHotels.style.display = '';
      tourModalHotels.innerHTML = `
        <h4>Hotel options</h4>
        <div class="tour-hotel-grid">
          ${data.hotels.map(h => `
            <div class="tour-hotel-stop">
              <strong>${escapeHtml(h.stop)}</strong>
              <span>${escapeHtml(h.options)}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      tourModalHotels.style.display = 'none';
      tourModalHotels.innerHTML = '';
    }

    if ((data.includes && data.includes.length) || (data.excludes && data.excludes.length)) {
      tourModalInclusions.style.display = '';
      tourModalInclusions.innerHTML = `
        ${data.includes && data.includes.length ? `
          <div class="tour-col tour-col-include">
            <h4>What's included</h4>
            <ul>${data.includes.map(i => `<li><i class="fas fa-check-circle"></i>${escapeHtml(i)}</li>`).join('')}</ul>
          </div>
        ` : '<div></div>'}
        ${data.excludes && data.excludes.length ? `
          <div class="tour-col tour-col-exclude">
            <h4>Not included</h4>
            <ul>${data.excludes.map(i => `<li><i class="fas fa-times-circle"></i>${escapeHtml(i)}</li>`).join('')}</ul>
          </div>
        ` : '<div></div>'}
      `;
    } else {
      tourModalInclusions.style.display = 'none';
      tourModalInclusions.innerHTML = '';
    }

    tourModalNote.textContent = data.hotelNote || '';
    tourModalNote.style.display = data.hotelNote ? '' : 'none';
  };

  const openTourModal = (key) => {
    const data = TOUR_DATA[key];
    if (!data || !tourModal) return;
    renderTourModal(data);
    tourModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    tourModalClose.focus();
  };

  const closeTourModal = () => {
    if (!tourModal) return;
    tourModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-tour]').forEach(trigger => {
    trigger.addEventListener('click', () => openTourModal(trigger.dataset.tour));
  });

  if (tourModalClose) {
    tourModalClose.addEventListener('click', closeTourModal);
    tourModal.addEventListener('click', (e) => {
      if (e.target === tourModal) closeTourModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && tourModal.classList.contains('open')) closeTourModal();
    });
  }

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
