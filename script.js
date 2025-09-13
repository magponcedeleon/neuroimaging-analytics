document.addEventListener("DOMContentLoaded", () => {

  // Load GA script dynamically
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-TJVLZ6GB0H";
  document.head.appendChild(gaScript);

  gaScript.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-TJVLZ6GB0H');
  };

  // Carousel
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
    carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

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

  // ✅ Mobile menu toggle (works reliably with Tailwind)
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Contact form (mailto)
  const sendBtn = document.getElementById('sendMessageBtn');
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

});
