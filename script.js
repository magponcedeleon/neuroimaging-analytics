document.addEventListener("DOMContentLoaded", () => {


  // -----------------------------
  // Carousel
  // -----------------------------
  const carouselTrack = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const cardWidth = 320 + 24; // w-80 + gap-6
  let currentIndex = 0;
  let totalCards = 0;
  let visibleCards = 3;
  let maxIndex = 0;

  function updateDimensions() {
    visibleCards = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    maxIndex = Math.max(0, totalCards - visibleCards);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (carouselTrack) carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  if (carouselTrack) {
    fetch("posts.json")
      .then(res => res.json())
      .then(posts => {
        totalCards = posts.length;
        posts.forEach(post => {
          const card = document.createElement("div");
          card.className = "bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex-shrink-0 w-80";
          card.innerHTML = `
            <a href="${post.url}" target="_blank">
              <h3 class="text-xl font-semibold mb-2 text-blue-800">${post.title}</h3>
              <p class="text-gray-600">${post.summary}</p>
              <a href="${post.url}" target="_blank" class="mt-4 inline-block text-blue-700 hover:underline font-medium">Read more →</a>
            </a>
          `;
          carouselTrack.appendChild(card);
        });

        updateDimensions();

        nextBtn.addEventListener("click", () => {
          currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
          carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        });

        prevBtn.addEventListener("click", () => {
          currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
          carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        });

        window.addEventListener("resize", updateDimensions);
      })
      .catch(err => console.error("Failed to load posts:", err));
  }

  // -----------------------------
  // Mobile menu toggle
  // -----------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // -----------------------------
  // Contact form (mailto)
  // -----------------------------
  const sendBtn = document.getElementById('sendMessageBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !message) {
        alert("Please fill in both your name and message before sending.");
        return;
      }

      const subject = encodeURIComponent(`New message from: ${name}`);
      const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);

      window.location.href = `mailto:poncedeleon.magdalena.s@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // -----------------------------
  // Services dropdown
  // -----------------------------
  const servicesButton = document.getElementById("services-menu-button");
  const servicesMenu = document.getElementById("services-menu");

  if (servicesButton && servicesMenu) {
    servicesButton.addEventListener("click", (e) => {
      e.preventDefault();
      servicesMenu.classList.toggle("hidden");
    });
  }

  document.addEventListener("click", e => {
    if (servicesMenu && !document.getElementById("services-dropdown").contains(e.target)) {
      servicesMenu.classList.add("hidden");
    }
  });

  // -----------------------------
  // Language dropdown & translations (mobile + desktop fixed)
  // -----------------------------
  let translations = {};
  const currentLangEl = document.getElementById('current-lang');
  const savedLang = localStorage.getItem('lang') || 'en';
  if (currentLangEl) currentLangEl.textContent = savedLang.toUpperCase();

  function flattenTranslations(obj, prefix = '') {
    const flat = {};
    for (const key in obj) {
      const value = obj[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          if (typeof v === 'object' && v !== null) {
            Object.assign(flat, flattenTranslations(v, `${fullKey}.${i}`));
          } else {
            flat[`${fullKey}.${i}`] = v;
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(flat, flattenTranslations(value, fullKey));
      } else {
        flat[fullKey] = value;
      }
    }
    return flat;
  }

  function applyTranslations(lang) {
    if (!translations[lang]) return;
    const flat = flattenTranslations(translations[lang]);
    Object.keys(flat).forEach(key => {
      document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
        el.innerHTML = flat[key];
      });
    });
  }

  function setLang(lang) {
    if (!translations[lang]) return;
    localStorage.setItem('lang', lang);
    if (currentLangEl) currentLangEl.textContent = lang.toUpperCase();
    applyTranslations(lang);
    // Close dropdowns after selection
    const langMenu = document.querySelector('#lang-dropdown div');
    if (langMenu) langMenu.classList.add('hidden');
    if (mobileMenu) mobileMenu.classList.add('hidden');
  }

  // Load translations
  fetch('translations.json')
    .then(res => res.json())
    .then(data => {
      translations = data;
      applyTranslations(savedLang);
    })
    .catch(err => console.error('Failed to load translations:', err));

  // Desktop dropdown
  const langDropdown = document.getElementById('lang-dropdown');
  const langButton = langDropdown ? langDropdown.querySelector('button') : null;
  const langMenu = langDropdown ? langDropdown.querySelector('div') : null;

  if (langButton && langMenu) {
    langButton.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      langMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', e => {
      if (!langDropdown.contains(e.target)) {
        langMenu.classList.add('hidden');
      }
    });
  }

  // Mobile buttons
  document.querySelectorAll('#mobile-menu button[onclick^="setLang"]').forEach(btn => {
    btn.addEventListener('click', e => {
      const lang = btn.textContent.trim().toLowerCase();
      setLang(lang);
    });
  });

  // Make setLang globally accessible
  window.setLang = setLang;
});
