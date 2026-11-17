const shellRoot = document.getElementById('service-page-shell');

if (shellRoot) {
  shellRoot.innerHTML = `
    <div class="page-shell">
      <header class="nav">
        <a class="brand" href="index.html" aria-label="Dr. Smile home">
          <span class="brand-text">
            <img class="brand-logo" src="assets/logosmile.png" alt="Dr. Smile Orthodontics and Multispecialty Dentistry">
          </span>
        </a>
        <nav class="nav-links" aria-label="Primary navigation">
          <a href="index.html">Home</a>
        
          <a href="about.html">About us</a>
          <a class="active" href="services.html">Departments</a>
          <a href="faq.html">FAQs</a>
          
          <a class="contact-btn" href="contact.html">Contact us</a>
        </nav>
        <button class="mobile-menu" aria-label="Open menu" aria-expanded="false">&#9776;</button>
      </header>
      <main class="page-wrap service-detail" id="service-detail-root"></main>
    </div>
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand fade-up">
            <img class="footer-logo" src="assets/logosmile.png" alt="Dr. Smile Orthodontics and Multispecialty Dentistry">
            
          </div>
          <div class="footer-col fade-up">
            <h4>Quick Links</h4>
            <div class="footer-links">
              <a href="index.html#top">Home</a>
              <a href="about.html">About us</a>
              <a href="services.html#specialties">Our Departments</a>
              <a href="index.html#testimonials">Testimonials</a>
              <a href="contact.html">Contact us</a>
            </div>
          </div>
          <div class="footer-col fade-up">
            <h4>Our Services</h4>
            <div class="footer-links">
              <a href="orthodontics.html">Orthodontics</a>
              <a href="endodontics.html">Endodontics (Root Canal)</a>
              <a href="pediatric-dentistry.html">Pediatric Dentistry</a>
              <a href="digital-dentistry.html">Digital Dentistry</a>
              <a href="oral-surgery.html">Oral Surgery</a>
              <a href="cosmetic-dentistry.html">Cosmetic Dentistry</a>
              <a href="prosthodontics.html">Prosthodontics</a>
              <a href="implant-dentistry.html">Implant Dentistry</a>
              <a href="periodontics.html">Periodontics</a>
            </div>
          </div>
<div class="footer-col footer-contact fade-up" id="contact">
            <h4>Contact &amp; Support</h4>
            <div class="contact-list">
              <div class="contact-row"><span class="contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></span><a href="https://www.google.com/maps/search/?api=1&amp;query=Dr.+Smile+Kalamassery+Kochi+Kerala" target="_blank" rel="noopener noreferrer">Kalamassery, Panampilly Nagar,<br>Kochi, Keralam, India - 682033</a></div>
              <div class="contact-row"><span class="contact-icon">&#9742;</span><a href="tel:+918296099118">08296099118</a></div>
              <div class="contact-row"><span class="contact-icon">&#9993;</span><a href="mailto:info@drreshmadrsmile.com">info@drreshmadrsmile.com</a></div>
              <div class="contact-row"><span class="contact-icon">&#9719;</span><span>Mon - Sat: 9:30 AM - 7:00 PM<br>Sunday: By appointment</span></div>
            </div>
          </div>
        </div>
        <div class="newsletter fade-up">
          <div class="newsletter-copy">
            <div class="newsletter-icon" aria-hidden="true">&#10022;</div>
            <div><h3>Let's plan your smile</h3><p>Speak with our team to find the right next step for your dental care.</p></div>
          </div>
          <div class="footer-cta-actions">
            <a class="footer-cta-primary" href="tel:+918296099118">Call the clinic <span aria-hidden="true">&#8599;</span></a>
            <a class="footer-cta-secondary" href="mailto:info@drreshmadrsmile.com?subject=Consultation%20enquiry">Email our team <span aria-hidden="true">&#8599;</span></a>
          </div>
        </div>
        <div class="footer-bottom">
          <div>&copy; 2026 Dr. Smile Orthodontics and Multispecialty Dentistry.</div>
          <div class="footer-location">Specialist dental care in Kochi, Kerala</div>
        </div>
      </div>
    </footer>
  `;

  const mobileMenu = shellRoot.querySelector('.mobile-menu');
  const navLinks = shellRoot.querySelector('.nav-links');

  mobileMenu.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    mobileMenu.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.textContent = open ? '\u00d7' : '\u2630';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      mobileMenu.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-label', 'Open menu');
      mobileMenu.textContent = '\u2630';
    });
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    shellRoot.querySelectorAll('.fade-up').forEach((element) => revealObserver.observe(element));
  } else {
    shellRoot.querySelectorAll('.fade-up').forEach((element) => element.classList.add('visible', 'is-visible'));
  }
}
