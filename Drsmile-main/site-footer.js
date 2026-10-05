const siteFooter = document.createElement('footer');
siteFooter.className = 'site-footer';
siteFooter.innerHTML = `
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="assets/logosmile.png" alt="Dr. Smile Orthodontics and Multispecialty Dentistry">
        <p class="brand-copy">Creating healthy, confident smiles with advanced orthodontic care, personalised treatment and a patient-first approach.</p>
        <div class="socials">
          <a href="https://wa.me/914842985200" aria-label="Chat with Dr. Smile on WhatsApp">
            <span aria-hidden="true">&#9673;</span>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Quick Links</h4>
        <div class="footer-links">
          <a href="index.html#top">Home</a>
          <a href="about.html">About Us</a>
          <a href="services.html#specialties">Our Services</a>
          <a href="orthodontics.html">Invisalign</a>
          <a href="index.html#testimonials">Testimonials</a>
          <a href="contact.html">Contact Us</a>
        </div>
      </div>

      <div class="footer-col">
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

      <div class="footer-col">
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

      <div class="footer-col footer-contact" id="contact">
        <h4>Contact &amp; Support</h4>
        <div class="contact-list">
          <div class="contact-row">
            <span class="contact-icon" aria-hidden="true">&#8982;</span>
            <a href="https://www.google.com/maps/search/?api=1&amp;query=Dr.+Smile+Kalamassery+Kochi+Kerala" target="_blank" rel="noopener noreferrer">Kalamassery, Pannampilly Nagar,<br>Kochi, Kerala, India – 682033</a>
          </div>
          <div class="contact-row">
            <span class="contact-icon" aria-hidden="true">&#9742;</span>
            <a href="tel:+914842985200">+91 484 298 5200</a>
          </div>
          <div class="contact-row">
            <span class="contact-icon" aria-hidden="true">&#9993;</span>
            <a href="mailto:info@drsmile.co.in">info@drsmile.co.in</a>
          </div>
          <div class="contact-row">
            <span class="contact-icon" aria-hidden="true">&#9719;</span>
            <span>Mon – Sat: 9:30 AM – 7:00 PM<br>Sunday: By Appointment</span>
          </div>
        </div>
      </div>
    </div>

    <div class="newsletter">
      <div class="newsletter-copy">
        <div class="newsletter-icon" aria-hidden="true">&#10022;</div>
        <div>
          <h3>Let&#8217;s plan your smile</h3>
          <p>Speak with our team to find the right next step for your dental care.</p>
        </div>
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
`;

const currentFooter = document.querySelector('footer.site-footer');
if (currentFooter) {
  currentFooter.replaceWith(siteFooter);
} else {
  document.body.append(siteFooter);
}