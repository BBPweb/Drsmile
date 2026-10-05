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
          <a class="active" href="services.html">Services</a>
          <a href="index.html#about">About Us</a>
          <a href="faq.html">Faq's</a>
          <a href="index.html#services">Treatments</a>
          <a class="contact-btn" href="contact.html">Contact Us</a>
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
            <p class="brand-copy">Creating healthy, confident smiles with advanced orthodontic care, personalised treatment and a patient-first approach.</p>
            <div class="socials">
              <a href="https://wa.me/914842985200" aria-label="Chat with Dr. Smile on WhatsApp"><span aria-hidden="true">&#9673;</span><span>Chat on WhatsApp</span></a>
            </div>
          </div>
          <div class="footer-col fade-up">
            <h4>Quick Links</h4>
            <div class="footer-links">
              <a href="index.html#top">Home</a>
              <a href="index.html#about">About Us</a>
              <a href="services.html#specialties">Our Services</a>
              <a href="index.html#services">Invisalign</a>
              <a href="index.html#testimonials">Testimonials</a>
              <a href="contact.html">Contact Us</a>
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
          <div class="footer-col fade-up">
            <h4>Treatments</h4>
            <div class="footer-links">
              <a href="orthodontics.html">Orthodontics</a>
              <a href="orthodontics.html">Invisalign Treatment</a>
              <a href="cosmetic-dentistry.html">Teeth Whitening</a>
              <a href="implant-dentistry.html">Dental Implants</a>
              <a href="prosthodontics.html">Crowns &amp; Bridges</a>
              <a href="prosthodontics.html">Full Mouth Rehabilitation</a>
            </div>
          </div>
          <div class="footer-col footer-contact fade-up" id="contact">
            <h4>Contact &amp; Support</h4>
            <div class="contact-list">
              <div class="contact-row"><span class="contact-icon">&#8982;</span><a href="https://www.google.com/maps/search/?api=1&amp;query=Dr.+Smile+Kalamassery+Kochi+Kerala" target="_blank" rel="noopener noreferrer">Kalamassery, Pannampilly Nagar,<br>Kochi, Kerala, India - 682033</a></div>
              <div class="contact-row"><span class="contact-icon">&#9742;</span><a href="tel:+914842985200">+91 484 298 5200</a></div>
              <div class="contact-row"><span class="contact-icon">&#9993;</span><a href="mailto:info@drsmile.co.in">info@drsmile.co.in</a></div>
              <div class="contact-row"><span class="contact-icon">&#9719;</span><span>Mon - Sat: 9:30 AM - 7:00 PM<br>Sunday: By Appointment</span></div>
            </div>
          </div>
        </div>
        <div class="newsletter fade-up">
          <div class="newsletter-copy">
            <div class="newsletter-icon" aria-hidden="true">&#10022;</div>
            <div><h3>Let's plan your smile</h3><p>Speak with our team to find the right next step for your dental care.</p></div>
          </div>
          <div class="footer-cta-actions">
            <a class="footer-cta-primary" href="tel:+914842985200">Call the clinic <span aria-hidden="true">&#8599;</span></a>
            <a class="footer-cta-secondary" href="mailto:info@drsmile.co.in?subject=Consultation%20enquiry">Email our team <span aria-hidden="true">&#8599;</span></a>
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
