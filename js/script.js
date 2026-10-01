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
    },
    'pekoe-trail': {
      title: 'Pekoe Trail Sri Lanka',
      route: 'Airport → Kandy → Nuwara Eliya → Horton Plains → Ohiya → Haputale → Ella → Airport',
      meta: [
        { icon: 'fa-clock', text: '6 Days / 5 Nights' },
        { icon: 'fa-hiking', text: 'Trekking tour' }
      ],
      highlights: ['Cloud Forests', 'Pekoe Trail Trekking', 'Tea Plantations & Factories', 'Ramboda Falls', 'Horton Plains National Park', 'Nine Arch Bridge', 'Ella Gap & Little Adam\u2019s Peak'],
      days: [
        {
          title: 'Airport → Kandy',
          stay: 'Kandy',
          items: [
            'Airport pickup and meet your English-speaking trekking guide/driver, then drive to Kandy (approx. 3–3½ hours).',
            'Afternoon in Kandy: Kandy Lake, Kandy city, and the Temple of the Sacred Tooth Relic, with an optional cultural dance performance in the evening.'
          ]
        },
        {
          title: 'Kandy → Nuwara Eliya',
          stay: 'Nuwara Eliya',
          items: [
            'Drive from Kandy towards Nuwara Eliya, stopping en route at Ramboda Falls, a tea plantation, and a tea factory for tea tasting, with mountain viewpoints along the way.',
            'Afternoon at leisure in the colonial hill town, with time to visit Gregory Lake, Victoria Park, or Nuwara Eliya town.'
          ]
        },
        {
          title: 'Nuwara Eliya → Horton Plains → Ohiya — Pekoe Trail highlight',
          stay: 'Acacia Inn, Ohiya',
          items: [
            'Early transfer to Horton Plains National Park for the first major trekking day.',
            'Trek from Horton Plains to Ohiya through cloud forest and mountain landscapes, past scenic viewpoints and rural mountain settlements — an excellent introduction to the high-altitude Pekoe Trail.',
            'Arrive in Ohiya in the evening for dinner and overnight.',
            'Exact trail routing and access conditions are confirmed with the local Trail Host before departure, as weather can affect the Horton Plains trails.'
          ]
        },
        {
          title: 'Ohiya → Haputale',
          stay: 'Haputale',
          items: [
            'Trek from Ohiya to Haputale through tea plantations, panoramic mountain views, and traditional villages — one of the most scenic sections of the trail.',
            'An optional vehicle transfer can be arranged along the way for luggage or support.',
            'Evening at leisure in Haputale, with the option of a sunset viewpoint.'
          ]
        },
        {
          title: 'Haputale → Ella',
          stay: 'Ella',
          items: [
            'Morning trek along a selected Pekoe Trail section towards Ella, through tea estates, mountain ridges, forest, and rural villages (the exact section depends on group fitness and current trail conditions).',
            'Meet the support vehicle and continue into Ella for sightseeing depending on arrival time: Nine Arch Bridge, Ella Gap, Little Adam\u2019s Peak, or Ravana Falls.',
            'Evening at leisure in Ella town.'
          ]
        },
        {
          title: 'Ella → Airport',
          items: [
            'Breakfast at the hotel, with free time in Ella depending on flight time.',
            'Private transfer to Bandaranaike International Airport (approx. 5½–6½ hours from Ella, depending on traffic and route).'
          ]
        }
      ],
      hotels: [
        { stop: 'Kandy — 1 night', options: 'Oak Ray Heritage or Thilanka Hotel, up to Cinnamon Citadel or Earl\u2019s Regency, depending on your preferred category.' },
        { stop: 'Nuwara Eliya — 1 night', options: 'Heaven Seven or Oak Ray Summer Hill Breeze, up to Araliya Green Hills or Jetwing St. Andrew\u2019s, depending on your preferred category.' },
        { stop: 'Ohiya — 1 night', options: 'Acacia Inn, a rustic mountain inn, with a boutique tea-bungalow option available at a higher category.' },
        { stop: 'Haputale — 1 night', options: 'Melheim Resort, up to a premium tea-estate bungalow such as Thotalagala, depending on your preferred category.' },
        { stop: 'Ella — 1 night', options: 'Oak Ray Ella Gap or Morning Dew Ella, up to EKHO Ella or 98 Acres Resort, depending on your preferred category.' }
      ],
      hotelNote: 'Hotels are subject to availability and may be replaced with equivalent-category properties. An optional extension is available — an overnight in Colombo before an early final-day airport transfer — recommended when the international flight departs in the morning; this turns the package into 6 Nights / 7 Days.',
      includes: ['Selected Pekoe Trail stages', 'Experienced local trekking guide / Trail Host', 'Horton Plains National Park entrance', 'Refreshments during trekking', 'Drinking water', 'Basic trekking assistance', 'Private transportation between trail sections', '5 nights\u2019 accommodation', 'Daily breakfast', 'Trekking-day lunches', 'Dinners as specified', 'Airport pickup', 'Private air-conditioned vehicle', 'Nuwara Eliya → Horton Plains transfer', 'Trailhead transfers', 'Luggage transfers/support vehicle', 'Ella → Airport transfer']
    },
    'sl-highlights': {
      title: 'Sri Lanka Highlights Tour',
      route: 'Airport → Pinnawala → Kandy → Dambulla → Sigiriya → Nuwara Eliya → Ella → Yala → Bentota → Colombo/Negombo → Airport',
      meta: [
        { icon: 'fa-clock', text: '8 Days / 7 Nights' },
        { icon: 'fa-user-friends', text: 'Private chauffeur' }
      ],
      highlights: ['Pinnawala Elephants', 'Dambulla Cave Temple', 'Sigiriya Rock Fortress', 'Hill Country Scenic Train', 'Yala Safari', 'Bentota Beach'],
      days: [
        { title: 'Airport → Pinnawala → Kandy', stay: 'Kandy', items: [
          'Arrival at Bandaranaike International Airport and meet your private chauffeur.',
          'Visit the Pinnawala area and, timing permitting, observe the elephants around the river or feeding area.',
          'Continue to Kandy for sightseeing depending on arrival time: Kandy Lake, Kandy city, and the Temple of the Sacred Tooth Relic, with an optional cultural dance show.'
        ]},
        { title: 'Kandy → Dambulla → Sigiriya', stay: 'Sigiriya', items: [
          'After breakfast, check out and proceed to the Dambulla Cave Temple, with its ancient Buddhist statues and murals.',
          'Continue to Sigiriya for an afternoon visit to Sigiriya Rock Fortress — climbers who prefer not to scale the rock can instead visit Pidurangala or the Sigiriya gardens.'
        ]},
        { title: 'Sigiriya → Ramboda → Nuwara Eliya', stay: 'Nuwara Eliya', items: [
          'Breakfast and check out, then travel through the central highlands via Ramboda — recommended stops include Ramboda Falls, a tea plantation, a tea factory visit, and tea tasting.',
          'Continue to Nuwara Eliya, with time for Gregory Lake, Victoria Park, the colonial town centre, and the local market depending on arrival time.'
        ]},
        { title: 'Nuwara Eliya → Nanu Oya → Ella by train', stay: 'Ella', items: [
          'One of the highlight days of the tour: transfer to Nanu Oya Railway Station for the scenic hill-country train to Ella, passing tea plantations, mountains, waterfalls, forests, hill-country villages, and the Nine Arch Bridge area.',
          'Evening in Ella: Ella town, Little Adam\u2019s Peak (if time and energy permit), and the Nine Arch Bridge.'
        ]},
        { title: 'Ella → Yala', stay: 'Yala / Tissamaharama', items: [
          'Breakfast and check out, with a choice of morning Ella sightseeing: an easy option (Nine Arch Bridge, Ella Gap viewpoint, Ravana Falls) or a more active one (Little Adam\u2019s Peak, Nine Arch Bridge).',
          'Proceed to the Yala/Tissamaharama area. If arrival is early enough, an afternoon private jeep safari can be arranged; otherwise the safari is kept for the following morning.'
        ]},
        { title: 'Yala → Bentota', stay: 'Bentota', items: [
          'Morning Yala safari (strongly recommended) — a private jeep safari with opportunities to see elephants, crocodiles, wild buffalo, deer, birds, monkeys and leopards, conditions permitting.',
          'After the safari, return to the hotel for breakfast and check-out, then proceed towards Bentota via the Southern Expressway.',
          'Evening at leisure in Bentota: beach, sunset, and optional Bentota river safari, water sports, or a romantic beach dinner.'
        ]},
        { title: 'Bentota → Colombo/Negombo', stay: 'Colombo or Negombo', items: [
          'After breakfast, check out with a choice of route: via Colombo, with possible sightseeing at Galle Face Green, Colombo Fort, Independence Square, Gangaramaya Temple, One Galle Face Mall, and Pettah; or via Negombo, which reduces the final airport transfer and gives a more relaxed last evening — recommended for early morning flights the next day.'
        ]},
        { title: 'Colombo/Negombo → Airport', items: [
          'Breakfast at the hotel, with free time depending on flight schedule.',
          'Private transfer to Bandaranaike International Airport (CMB) for departure.'
        ]}
      ],
      hotels: [
        { stop: 'Kandy — 1 night', options: 'Oak Ray Heritage Hotel, Hotel Topaz, or Thilanka Hotel, up to Cinnamon Citadel Kandy, Radisson Hotel Kandy, or Earl\u2019s Regency, depending on your preferred category.' },
        { stop: 'Sigiriya — 1 night', options: 'Hotel Sigiriya, an Aliya-area boutique hotel, or Fresco Water Villa, up to Aliya Resort & Spa, Camellia Hills, or Sigiriya King\u2019s Resort, depending on your preferred category.' },
        { stop: 'Nuwara Eliya — 1 night', options: 'Heaven Seven, Oak Ray Summer Hill Breeze, or Galway Heights, up to Araliya Green Hills, Araliya Red, or Jetwing St. Andrew\u2019s, depending on your preferred category.' },
        { stop: 'Ella — 1 night', options: 'Oak Ray Ella Gap, Morning Dew Ella, or Ella Flower Garden, up to EKHO Ella, 98 Acres Resort, or Morning Dew Ella Resort, depending on your preferred category.' },
        { stop: 'Yala/Tissamaharama — 1 night', options: 'Ekho Safari, La Safari Inn, or Blue Turtle Hotel, up to Cinnamon Wild Yala, Jetwing Yala, or Chaarya Resort & Spa, depending on your preferred category.' },
        { stop: 'Bentota — 1 night', options: 'Amal Beach Hotel, Marina Bentota, or The Surf Hotel, up to EKHO Surf Bentota, Avani Bentota Resort, or Cinnamon Bentota Beach, depending on your preferred category.' },
        { stop: 'Colombo/Negombo — 1 night', options: 'Colombo: Fairway Colombo or Hotel Nippon, up to Cinnamon Red, Radisson, or NH Collection. Negombo: Hive 68, Hotel J, or Olinia Airport Hotel, up to Regal Réseau, Jetwing Sea, or Goldi Sands.' }
      ],
      hotelNote: 'Hotels are subject to availability and may be replaced with equivalent-category properties.'
    },
    'highland-explorer': {
      title: 'Sri Lanka Highland Explorer',
      route: 'Airport → Kandy → Knuckles → Nuwara Eliya → Horton Plains → Haputale → Ella → Airport',
      meta: [
        { icon: 'fa-clock', text: '7 Days / 6 Nights' },
        { icon: 'fa-hiking', text: 'Moderate difficulty' }
      ],
      highlights: ['Knuckles Mountain Range', 'Horton Plains & World\u2019s End', 'Lipton\u2019s Seat', 'Pekoe Trail', 'Ella Rock', 'Nine Arches Bridge'],
      days: [
        { title: 'Airport → Kandy', stay: 'Kandy', items: [
          'Airport arrival and meet & greet, then a private transfer to Kandy (approx. 115 km).',
          'Evening visit to the Temple of the Sacred Tooth Relic, Kandy Lake, and a Kandy viewpoint, with an optional cultural show.',
          'An easy city walk — no hiking today.'
        ]},
        { title: 'Knuckles Mountain Range Hiking', stay: 'Kandy', items: [
          'Early morning departure to the Knuckles Mountain Range, a UNESCO World Heritage component of Sri Lanka\u2019s Central Highlands, known for diverse forest and grassland ecosystems.',
          'Guided trek (recommended around the Deanston, Mini World\u2019s End, or Dothalugala area) through forest trails, mountain viewpoints, tea plantations, and village scenery, with a picnic lunch.',
          'Trekking time approximately 4–5 hours, moderate difficulty, then return to Kandy.'
        ]},
        { title: 'Kandy → Nuwara Eliya | Tea Country Hiking', stay: 'Nuwara Eliya', items: [
          'Travel towards Nuwara Eliya with stops at Ramboda Falls, a tea plantation, a tea factory, and scenic viewpoints, with an optional short tea-estate walk.',
          'For stronger hikers, a section of the Pekoe Trail around the Nuwara Eliya/tea-country area can be included.',
          'Evening in Nuwara Eliya town, Gregory Lake, and Victoria Park. Hiking time approximately 2–3 hours, easy to moderate.'
        ]},
        { title: 'Horton Plains → World\u2019s End → Ohiya → Haputale', stay: 'Haputale', items: [
          'An early start is important for visibility at World\u2019s End.',
          'Circular trek through Horton Plains National Park: Horton Plains → Mini World\u2019s End → World\u2019s End → Baker\u2019s Falls → Horton Plains — approximately 9 km and 3–4 hours, through cloud forest and grassland, with wildlife sightings possible along the way and the well-known 900-metre escarpment at World\u2019s End.',
          'After hiking, continue via Ohiya to Haputale, with an optional sunset stop at Lipton\u2019s Seat depending on weather and timing.'
        ]},
        { title: 'Haputale → Lipton\u2019s Seat → Pekoe Trail', stay: 'Haputale or Ella', items: [
          'Early morning visit to Lipton\u2019s Seat for panoramic views across the tea estates.',
          'A section of the Pekoe Trail follows, preferably around the Haputale/St. Catherine area depending on group fitness and weather — tea plantation hiking, tea-estate villages, mountain viewpoints, forest paths, and a local village experience, with a picnic lunch.',
          'Hiking time approximately 4–5 hours, moderate difficulty.'
        ]},
        { title: 'Haputale → Ella | Ella Rock + Nine Arches Bridge', stay: 'Ella', items: [
          'The main hiking experience of the day is the Ella Rock Trek — an early morning start through tea plantations and forest paths to the Ella Rock viewpoint, with panoramic views over the Ella Valley (approx. 3–5 hours, moderate difficulty).',
          'After lunch, a Nine Arches Bridge walk through tea plantations to the bridge and the Demodara railway area, with an optional train-watching experience.'
        ]},
        { title: 'Ella → Airport', items: [
          'Optional short Little Adam\u2019s Peak sunrise hike before breakfast.',
          'Transfer to Colombo/the airport for departure.',
          'The tour can be extended with a Yala safari, Udawalawe, or a Southern Coast beach stay.'
        ]}
      ],
      hotels: [
        { stop: 'Kandy — 2 nights', options: 'Oak Ray Regency or Thilanka, up to Radisson Hotel Kandy or Cinnamon Citadel, depending on your preferred category.' },
        { stop: 'Nuwara Eliya — 1 night', options: 'Oak Ray Summer Hill Breeze or Heaven Seven, up to Araliya Green City or Jetwing St. Andrew\u2019s, depending on your preferred category.' },
        { stop: 'Haputale — 1 night', options: 'Melheim Resort or Olympus Plaza, up to Melheim Resort or Akway Resort, depending on your preferred category.' },
        { stop: 'Ella — 2 nights', options: 'Oak Ray Ella Gap or City Grand, up to Morning Dew Hotel or Mountain Heavens, depending on your preferred category.' }
      ],
      hotelNote: 'Hotel availability and rates should be reconfirmed for the client\u2019s travel dates; hiking routes are adjusted according to weather, trail conditions and group fitness. Horton Plains in particular can become misty, so the early start for World\u2019s End matters.',
      includes: ['6 nights\u2019 hotel accommodation', 'Daily breakfast', 'Private air-conditioned vehicle', 'English-speaking chauffeur', 'Airport transfers', 'All sightseeing transfers', 'Knuckles hiking guide', 'Horton Plains trek', 'Pekoe Trail hiking experience', 'Ella Rock hike', 'Nine Arches Bridge visit', 'Lipton\u2019s Seat', 'Tea factory visit', 'Highway/parking charges', 'Bottled drinking water during hiking days', 'Basic first-aid support'],
      excludes: ['International airfare', 'Visa/ETA', 'Lunches and dinners except specified picnic lunches', 'Personal expenses', 'Tips', 'Travel insurance', 'Porter charges', 'Activities not specified', 'Additional hotel nights', 'Camera/video permits where applicable']
    },
    'ultimate-sri-lanka': {
      title: 'Ultimate Sri Lanka — Grand Island Tour',
      route: 'Airport → Negombo → Anuradhapura → Jaffna → Trincomalee → Polonnaruwa → Sigiriya/Dambulla → Kandy → Nuwara Eliya → Ella → Yala → Udawalawe → Galle → Bentota → Colombo → Airport',
      meta: [
        { icon: 'fa-clock', text: '16 Days / 15 Nights' },
        { icon: 'fa-user-friends', text: 'Private tour, BB basis' }
      ],
      highlights: ['Anuradhapura Ancient City', 'Jaffna Peninsula', 'Trincomalee East Coast', 'Polonnaruwa & Sigiriya', 'Kandy & Hill Country', 'Ella', 'Yala & Udawalawe Safari', 'Galle Fort', 'Bentota & Colombo'],
      days: [
        { title: 'Airport → Negombo', stay: 'Negombo', items: [
          'Arrival at Bandaranaike International Airport, meet & greet, and transfer to Negombo.',
          'Negombo city and beach, the Dutch Canal, the fish market area, and time to relax at the beach.'
        ]},
        { title: 'Negombo → Anuradhapura', stay: 'Anuradhapura', items: [
          'Transfer towards Anuradhapura to visit the Anuradhapura Ancient City — one of Sri Lanka\u2019s major ancient capitals and a UNESCO World Heritage Site — including Sri Maha Bodhi, Ruwanwelisaya, Abhayagiri, Jetavanaramaya, and Isurumuniya.'
        ]},
        { title: 'Anuradhapura → Jaffna', stay: 'Jaffna', items: [
          'Drive to Jaffna, visiting Jaffna Fort, Nallur Kandaswamy Kovil, the Jaffna Public Library, Jaffna market, and Casuarina Beach, time permitting.'
        ]},
        { title: 'Jaffna Exploration', stay: 'Jaffna', items: [
          'A full day in Jaffna: Nallur Temple, Jaffna Fort, Keerimalai, and Point Pedro, with a local Tamil food experience.',
          'Optional: Delft Island, or Nagadeepa/Nainativu.'
        ]},
        { title: 'Jaffna → Trincomalee', stay: 'Trincomalee/Nilaveli', items: [
          'Morning departure to Trincomalee — one of Sri Lanka\u2019s principal east-coast destinations and a historic maritime centre — visiting Trincomalee town, Fort Frederick, Koneswaram Temple, Swami Rock, Lover\u2019s Leap, and Nilaveli Beach.'
        ]},
        { title: 'Trincomalee → Polonnaruwa → Sigiriya', stay: 'Sigiriya/Dambulla', items: [
          'Transfer to Polonnaruwa for an ancient city tour — the Royal Palace, Gal Vihara, and Parakrama Samudra — then continue to Sigiriya/Dambulla.'
        ]},
        { title: 'Sigiriya + Dambulla + Minneriya', stay: 'Sigiriya/Dambulla', items: [
          'Morning visit to Sigiriya Rock Fortress — Lion\u2019s Paw, frescoes, water gardens, and the summit.',
          'Afternoon visit to the Dambulla Cave Temple and Golden Temple, with an optional village or cooking experience.',
          'Late afternoon Minneriya/Kaudulla jeep safari.'
        ]},
        { title: 'Sigiriya → Kandy', stay: 'Kandy', items: [
          'En route: a spice garden in Matale and the Aluvihare Temple.',
          'Kandy city tour: Kandy Lake, the Temple of the Sacred Tooth Relic, and an evening cultural dance show.'
        ]},
        { title: 'Kandy → Nuwara Eliya', stay: 'Nuwara Eliya', items: [
          'Scenic hill-country drive via Ramboda Falls, a tea plantation and tea factory, and the Pedro Tea Estate.',
          'Nuwara Eliya town, Gregory Lake, and Victoria Park.'
        ]},
        { title: 'Nuwara Eliya → Ella', stay: 'Ella', items: [
          'Recommended scenic route with an optional early-morning Horton Plains/World\u2019s End visit, followed by the train journey from Nanu Oya to Ella (subject to train availability), then Ella town.'
        ]},
        { title: 'Ella Exploration', stay: 'Ella', items: [
          'Nine Arch Bridge, Little Adam\u2019s Peak, Ravana Falls, Ella Gap, and a tea plantation visit.',
          'Optional: Ella Rock trek, zipline, or a cooking class.'
        ]},
        { title: 'Ella → Yala', stay: 'Yala/Tissamaharama', items: [
          'Scenic drive via Ravana Falls and Kataragama (with an optional stop at Buduruwagala).',
          'Afternoon Yala National Park safari — one of Sri Lanka\u2019s principal wildlife destinations, with elephants, leopards, and numerous bird species.'
        ]},
        { title: 'Yala → Udawalawe → South Coast', stay: 'Galle/Unawatuna', items: [
          'Optional second Yala safari, then transfer to Udawalawe for an optional safari and a visit to the Elephant Transit Home.',
          'Continue towards the South Coast.'
        ]},
        { title: 'Galle + South Coast', stay: 'Galle/Unawatuna', items: [
          'A full day on the southern coast: Galle Fort (UNESCO-listed), the Dutch Reformed Church, the Old Dutch Hospital, the lighthouse, the Maritime Museum, Unawatuna Beach, Jungle Beach, and Koggala Lake.',
          'Optional Mirissa whale watching, depending on season and departure schedule.'
        ]},
        { title: 'Galle → Bentota → Colombo', stay: 'Colombo', items: [
          'Morning turtle hatchery visit, a Madu River boat safari, and time at Bentota Beach, with optional water sports.',
          'Continue to Colombo for a city tour: Gangaramaya Temple, Independence Square, Galle Face Green, Colombo Port City, Pettah, and shopping.'
        ]},
        { title: 'Colombo → Airport', items: [
          'Breakfast and free time/shopping depending on flight timing, then transfer to Bandaranaike International Airport. Tour ends.'
        ]}
      ],
      hotels: [
        { stop: 'Negombo — 1 night', options: 'Goldi Sands, up to Jetwing Blue, depending on your preferred category.' },
        { stop: 'Anuradhapura — 1 night', options: 'Heritage Hotel, up to Rajarata Hotel or Ulagalla Resort, depending on your preferred category.' },
        { stop: 'Jaffna — 2 nights', options: 'Valampuri Hotel, up to Jetwing Jaffna or The Thinnai, depending on your preferred category.' },
        { stop: 'Trincomalee — 1 night', options: 'JKAB Beach Resort, up to Trinco Blu by Cinnamon, depending on your preferred category.' },
        { stop: 'Sigiriya/Dambulla — 2 nights', options: 'Fresco Water Villa, up to Aliya Resort & Spa, depending on your preferred category.' },
        { stop: 'Kandy — 1 night', options: 'Senani Hotel, up to Cinnamon Citadel, depending on your preferred category.' },
        { stop: 'Nuwara Eliya — 1 night', options: 'Summer Hill Breeze, up to Araliya Green City, depending on your preferred category.' },
        { stop: 'Ella — 2 nights', options: 'Oak Ray Ella Gap, up to EKHO Ella, depending on your preferred category.' },
        { stop: 'Yala — 1 night', options: 'Chaarya Resort & Spa, up to Cinnamon Wild Yala, depending on your preferred category.' },
        { stop: 'Galle — 2 nights', options: 'Thaproban Pavilion, up to Radisson Blu Galle, depending on your preferred category.' },
        { stop: 'Colombo — 1 night', options: 'Fairway Colombo, up to Cinnamon Lakeside, depending on your preferred category.' }
      ],
      hotelNote: 'Hotels are proposed subject to availability; equivalent properties can be substituted.',
      includes: ['15 nights\u2019 accommodation', 'Daily breakfast', 'Private air-conditioned vehicle', 'English-speaking chauffeur/driver', 'Airport transfers', 'All sightseeing as per itinerary', 'Yala safari', 'Minneriya/Kaudulla safari', 'Galle/Madu River experience', 'Tea factory visit', 'Highway/parking/tolls'],
      excludes: ['International airfare', 'Visa/ETA', 'Lunch and dinner', 'Personal expenses', 'Tips', 'Optional activities', 'Travel insurance', 'Entrance tickets unless specifically included', 'Whale watching', 'Horton Plains', 'Delft Island', 'Water sports']
    },
    'yoga-wellness': {
      title: 'Ceylon Yoga & Wellness Retreat',
      route: 'Airport → Negombo → Dambulla/Habarana → Kandy → Nuwara Eliya → Bentota → Airport',
      meta: [
        { icon: 'fa-clock', text: '7 Nights / 8 Days' },
        { icon: 'fa-spa', text: 'Yoga, Meditation & Ayurveda' }
      ],
      highlights: ['Sunrise & Beach Yoga', 'Daily Meditation & Breathwork', 'Ayurvedic Treatments', 'Tea Plantation Wellness', 'Kandy Cultural Experience', 'Healthy Sri Lankan Cuisine'],
      days: [
        { title: 'Airport → Negombo | Arrival & Relaxation', stay: 'Negombo', items: [
          'Airport meet & greet and private transfer, with a welcome herbal drink on arrival.',
          'A sunset beach walk, a 45-minute gentle yoga/stretching session, guided breathing and meditation, and a healthy Sri Lankan dinner.'
        ]},
        { title: 'Negombo → Dambulla/Habarana', stay: 'Dambulla/Habarana', items: [
          'Sunrise yoga, pranayama, and guided meditation (06:30–07:30), followed by a healthy breakfast.',
          'En route to Dambulla/Habarana: a spice/herbal garden, an introduction to Ayurveda, and a herbal tea experience.',
          'Afternoon Ayurvedic head/foot treatment and meditation in nature; optional evening Dambulla Cave Temple visit or sunset meditation.'
        ]},
        { title: 'Habarana Wellness Day', stay: 'Habarana/Dambulla', items: [
          'Sunrise Hatha yoga, pranayama and meditation, followed by a healthy Ayurvedic/Sri Lankan breakfast.',
          'Morning wellness programme: an introduction to Ayurveda, a dosha/wellness consultation, herbal drinks, and a nutrition discussion.',
          'Afternoon choice of relaxation (Ayurveda massage, herbal steam, pool time) or nature (village walk, lake excursion, forest meditation).',
          'Evening sunset meditation and Yoga Nidra before a healthy dinner.'
        ]},
        { title: 'Habarana → Kandy', stay: 'Kandy', items: [
          'Sunrise yoga and meditation, then breakfast before transferring to Kandy via the Matale Spice Garden for a herbal demonstration and Ayurvedic introduction.',
          'In Kandy: a Kandy Lake walk and the Temple of the Sacred Tooth Relic, followed by a 60-minute evening yoga and meditation session, with an optional cultural dance performance.'
        ]},
        { title: 'Kandy → Nuwara Eliya | Tea & Wellness', stay: 'Nuwara Eliya', items: [
          'The signature wellness-and-tea day: sunrise yoga and pranayama, then breakfast before transferring via Ramboda to Nuwara Eliya, stopping at Ramboda Falls, a tea plantation, and a tea factory.',
          'A tea wellness experience — a plantation walk, Ceylon tea tasting, a herbal tea session, and a mindful tea meditation.',
          'Evening gentle restorative yoga, meditation, and an early dinner.'
        ]},
        { title: 'Nuwara Eliya → Bentota', stay: 'Bentota', items: [
          'Mountain yoga, breathing exercises, and meditation (06:30–07:30), then breakfast and check-out before travelling to the southwest coast, with optional waterfall and viewpoint stops en route.',
          'Afternoon Ayurvedic consultation, a full-body Ayurvedic massage, and a herbal bath/steam.',
          'Evening sunset beach yoga — gentle stretching, meditation, and breathwork.'
        ]},
        { title: 'Full Wellness Retreat Day — Bentota', stay: 'Bentota', items: [
          'The main wellness day of the programme: 75-minute sunrise Hatha yoga, pranayama, and meditation (06:00), followed by a wellness breakfast.',
          'Morning Ayurveda consultation and body treatment with herbal steam/bath; a healthy lunch; an afternoon mindfulness session of guided meditation and breathwork.',
          'Evening beach yoga with sunset stretching and Yoga Nidra, followed by a farewell wellness dinner.'
        ]},
        { title: 'Bentota → Airport', items: [
          'Final sunrise yoga and meditation (06:30–07:15), then breakfast.',
          'Optional beach walk, cinnamon experience, or river safari before transferring to the airport according to flight time.'
        ]}
      ],
      hotels: [
        { stop: 'Negombo — 1 night', options: 'Goldi Sands or Jetwing Sea, up to Jetwing Beach or Heritance Negombo, depending on your preferred category.' },
        { stop: 'Habarana — 2 nights', options: 'Habarana Village or similar, up to Cinnamon Lodge or similar, depending on your preferred category.' },
        { stop: 'Kandy — 1 night', options: 'Thilanka or Oak Ray Regency, up to Amaya Hills or Radisson, depending on your preferred category.' },
        { stop: 'Nuwara Eliya — 1 night', options: 'Oak Ray Summer Hill or Heaven Seven, up to Araliya Green Hills or Galway Heights, depending on your preferred category.' },
        { stop: 'Bentota — 2 nights', options: 'Hibiscus Beach or similar, up to Avani Bentota or similar, depending on your preferred category.' }
      ],
      hotelNote: 'The wellness component is structured around qualified yoga instructors, meditation facilitators and properly supervised Ayurvedic treatments, rather than a standard hotel tour with a yoga class added.',
      includes: ['7 nights\u2019 accommodation', 'Daily breakfast', 'Selected wellness/healthy meals', 'Private air-conditioned transportation', 'English-speaking chauffeur', 'Daily yoga sessions', 'Daily meditation/breathwork', '3–4 Ayurvedic treatments', 'Ayurveda consultation', 'Tea plantation experience', 'Herbal/spice garden experience', 'Kandy cultural experience', 'Airport transfers', 'Sightseeing as per itinerary'],
      excludes: ['International airfare', 'Visa fees', 'Travel insurance', 'Alcoholic beverages', 'Personal expenses', 'Additional spa treatments', 'Optional excursions', 'Tips and gratuities']
    },
    'wild-safari': {
      title: 'Sri Lanka Wild Safari Tour',
      route: 'Airport/Colombo → Udawalawe → Yala/Tissamaharama → Yala Safari → Colombo/Airport',
      meta: [
        { icon: 'fa-clock', text: '3 Nights / 4 Days' },
        { icon: 'fa-binoculars', text: '2–6 pax private tours' }
      ],
      highlights: ['Udawalawe Elephants', 'Yala Leopards & Wildlife', 'Two Private Jeep Safaris', 'Elephant Transit Home', 'Tissamaharama Lake'],
      days: [
        { title: 'Airport/Colombo → Udawalawe', stay: 'Udawalawe', items: [
          'Arrival at Bandaranaike International Airport and meet & greet by your chauffeur, then a private transfer to Udawalawe (approx. 4–5 hours).',
          'Afternoon at leisure, with an optional visit to the Udawalawe Elephant Transit Home if opening hours allow.'
        ]},
        { title: 'Udawalawe Safari → Yala', stay: 'Tissamaharama/Yala', items: [
          'Early morning private jeep safari in Udawalawe National Park, well known for wild elephants and a good first safari for a short wildlife itinerary — sightings may include elephants, crocodiles, spotted deer, wild buffalo, eagles and other birds, monkeys, and wild boar.',
          'Return to the hotel for breakfast, then check out and transfer to the Tissamaharama/Yala area for an afternoon at leisure, with options for swimming or a village experience.'
        ]},
        { title: 'Full Yala Wildlife Experience', stay: 'Tissamaharama/Yala', items: [
          'Early morning private 4×4 safari in Yala National Park, offering a different wildlife experience from Udawalawe, with the chance to see leopards, elephants, sloth bears, crocodiles, deer, wild buffalo, and many bird species.',
          'Afternoon choice: relaxed leisure time and a visit to Tissamaharama Lake, a second Yala safari for a more serious wildlife focus, or cultural sightseeing at Kataragama Temple and Tissamaharama Raja Maha Vihara.'
        ]},
        { title: 'Yala → Colombo/Airport', items: [
          'Breakfast and check-out, then departure from Yala.',
          'Depending on flight timing: a direct transfer to the airport, or a Southern Coast extension via Tangalle, Mirissa, and Galle before continuing to Colombo/the airport, with optional stops at Galle Fort, Coconut Tree Hill (Mirissa), the stilt fishermen, and Bentota.'
        ]}
      ],
      hotels: [
        { stop: 'Udawalawe', options: 'Elephant Trail, Grand Udawalawe Safari Resort, or Athgira River Camping, up to Kalu\u2019s Hideaway or a comparable 4★ property, depending on your preferred category.' },
        { stop: 'Yala/Tissamaharama', options: 'Peacock Reach, Blue Turtle Hotel, or similar, up to Kithala Resort or Rain Tree by Oak Ray, depending on your preferred category.' }
      ],
      hotelNote: 'Hotels are subject to availability and may be replaced with equivalent-category properties. For a more wildlife-focused version of this tour, the itinerary can be rearranged to include a morning Udawalawe safari, then a morning and afternoon Yala safari on the full day — three safari drives across the four days.'
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


/*--- 1-10-2026 --*/
