/* =========================================
   Aesthetic Glow Decor Shop — script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. HAMBURGER MENU ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  /* ── 2. ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 3. SCROLL: NAVBAR + BACK-TO-TOP ── */
  const navbar     = document.querySelector('.navbar');
  const backToTop  = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 20);
    if (backToTop) backToTop.classList.toggle('visible', y > 400);
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── 4. PRODUCT ACCORDION ── */
  document.querySelectorAll('.product-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card    = btn.closest('.product-full-card');
      const details = card.querySelector('.product-details');
      const isOpen  = details.classList.contains('open');

      // Close all
      document.querySelectorAll('.product-details.open').forEach(d => {
        d.classList.remove('open');
        const b = d.closest('.product-full-card').querySelector('.product-expand-btn');
        b.classList.remove('active');
        b.querySelector('.btn-text').textContent = 'More Details';
      });

      if (!isOpen) {
        details.classList.add('open');
        btn.classList.add('active');
        btn.querySelector('.btn-text').textContent = 'Less Details';
      }
    });
  });

  /* ── 5. FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer  = q.nextElementSibling;
      const isOpen  = answer.classList.contains('open');

      document.querySelectorAll('.faq-answer.open').forEach(a => {
        a.classList.remove('open');
        a.previousElementSibling.classList.remove('active');
      });

      if (!isOpen) {
        answer.classList.add('open');
        q.classList.add('active');
      }
    });
  });

  /* ── 6. GALLERY LIGHTBOX ── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.src || (item.querySelector('img') ? item.querySelector('img').src : '');
        lightboxImg.src = src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 300);
    };
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ── 7. CONTACT FORMS ── */
  const inquiryForm  = document.getElementById('inquiry-form');
  const interestForm = document.getElementById('interest-form');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = {
        type:      'General Inquiry',
        name:      inquiryForm.querySelector('#inq-name').value,
        email:     inquiryForm.querySelector('#inq-email').value,
        whatsapp:  inquiryForm.querySelector('#inq-phone').value,
        subject:   inquiryForm.querySelector('#inq-subject').value,
        message:   inquiryForm.querySelector('#inq-message').value,
        timestamp: new Date().toISOString(),
      };
      console.log('[Inquiry Form]', data);
      showFormSuccess(inquiryForm);
    });
  }

  if (interestForm) {
    interestForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = {
        type:     'Product Interest',
        name:     interestForm.querySelector('#int-name').value,
        contact:  interestForm.querySelector('#int-contact').value,
        product:  interestForm.querySelector('#int-product').value,
        budget:   interestForm.querySelector('#int-budget').value,
        message:  interestForm.querySelector('#int-message').value,
        timestamp: new Date().toISOString(),
      };
      console.log('[Interest Form]', data);
      showFormSuccess(interestForm);
    });
  }

  // Newsletter
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      console.log('[Newsletter signup]', { email });
      alert('You\'re subscribed! Welcome to the Glow community. 🌟');
      form.reset();
    });
  });

  function showFormSuccess(form) {
    alert('Thank you! Your message has been received. We\'ll get back to you soon. ✨');
    form.reset();
  }

  /* ── 8. SMOOTH SCROLL for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 9. GALLERY KEYBOARD ACCESSIBILITY ── */
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  /* ── 10. ANIMATE ELEMENTS ON SCROLL (IntersectionObserver) ── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
      '.why-card, .product-card, .product-full-card, .team-card, .testimonial-card, .step-card, .gallery-item'
    ).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.1}s, transform 0.5s ease ${(i % 4) * 0.1}s`;
      observer.observe(el);
    });
  }

});
