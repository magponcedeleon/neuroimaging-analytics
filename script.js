document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================
  // 1. GOOGLE ANALYTICS (G-TJVLZ6GB0H)
  // ==========================================================
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


  // ==========================================================
  // 2. MOBILE MENU TOGGLE
  // ==========================================================
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }


  // ==========================================================
  // 3. CONTACT FORM (MAILTO LINK)
  // ==========================================================
  const sendBtn = document.getElementById('sendMessageBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !message) {
        alert("Please fill in both your name and message before sending.");
        return;
      }

      const subject = encodeURIComponent(`New message from Veralia Website: ${name}`);
      const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);

      window.location.href = `mailto:poncedeleon.magdalena.s@gmail.com?subject=${subject}&body=${body}`;
    });
  }


  // ==========================================================
  // 4. SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // ==========================================================
  // 5. BACK TO TOP BUTTON
  // ==========================================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ==========================================================
  // 6. LAZY LOADING IMAGES
  // ==========================================================
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        lazyObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => lazyObserver.observe(img));


  // ==========================================================
  // 7. DARK MODE TOGGLE
  // ==========================================================
  const darkModeToggle = document.getElementById('darkModeToggle');
  if(darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('darkMode', document.documentElement.classList.contains('dark') ? 'true' : 'false');
    });

    if(localStorage.getItem('darkMode') === 'true') document.documentElement.classList.add('dark');
  }

});
