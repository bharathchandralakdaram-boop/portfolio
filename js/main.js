/* =============================================
   PORTFOLIO - MAIN JAVASCRIPT
============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Scroll Reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        // Stagger delay based on position in group
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 0.08) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ---- Skill Bar Animation ---- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length > 0) {
    const barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const target = bar.getAttribute('data-width');
          setTimeout(() => { bar.style.width = target + '%'; }, 300);
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });
    skillBars.forEach(bar => barObserver.observe(bar));
  }

  /* ---- Active Nav Link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Contact Form ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="bi bi-send me-2"></i>Sending...';
      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-check2 me-2"></i>Message Sent!';
        btn.style.background = '#2d6a4f';
        contactForm.reset();
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
          btn.style.background = '';
        }, 3000);
      }, 1200);
    });
  }

  /* ---- Certificate Modal ---- */
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach(card => {
    card.addEventListener('click', function () {
      const title = card.querySelector('.cert-name')?.textContent || '';
      const issuer = card.querySelector('.cert-issuer')?.textContent || '';
      const icon = card.querySelector('.cert-thumb i')?.className || 'bi bi-award-fill';
      const type = card.querySelector('.cert-type')?.textContent || '';

      document.getElementById('certModalTitle').textContent = title;
      document.getElementById('certModalIssuer').textContent = issuer;
      document.getElementById('certModalType').textContent = type;
      document.getElementById('certModalIcon').className = icon;

      const modal = new bootstrap.Modal(document.getElementById('certModal'));
      modal.show();
    });
  });

  /* ---- Navbar scroll effect ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
      } else {
        navbar.style.boxShadow = '';
      }
    });
  }

});
