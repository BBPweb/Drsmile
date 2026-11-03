const siteFooter = document.createElement('footer');
siteFooter.className = 'site-footer';
siteFooter.innerHTML = `
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="assets/logosmile.png" alt="Dr. Smile Orthodontics and Multispecialty Dentistry">
        <p class="brand-copy">Creating healthy, confident smiles with advanced orthodontic care, personalised treatment and a patient-first approach.</p>
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
            <a href="tel:+918296099118">08296099118</a>
          </div>
          <div class="contact-row">
            <span class="contact-icon" aria-hidden="true">&#9993;</span>
            <a href="mailto:info@drreshmadrsmile.com">info@drreshmadrsmile.com</a>
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
        <a class="footer-cta-primary" href="tel:+918296099118">Call the clinic <span aria-hidden="true">&#8599;</span></a>
        <a class="footer-cta-secondary" href="mailto:info@drreshmadrsmile.com?subject=Consultation%20enquiry">Email our team <span aria-hidden="true">&#8599;</span></a>
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

const whatsappButton = document.createElement('a');
whatsappButton.className = 'whatsapp-float';
whatsappButton.href = 'https://wa.me/918296099118';
whatsappButton.target = '_blank';
whatsappButton.rel = 'noopener noreferrer';
whatsappButton.setAttribute('aria-label', 'Chat with Dr. Smile on WhatsApp');
whatsappButton.title = 'Chat on WhatsApp';
whatsappButton.innerHTML = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.48 0 .11 5.37.1 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.97 11.97 0 0 0 5.87 1.49h.01c6.6 0 11.97-5.37 11.98-11.97a11.9 11.9 0 0 0-3.54-8.41ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.9 9.9 0 0 1-1.52-5.25c0-5.44 4.43-9.87 9.87-9.87 2.64 0 5.12 1.03 6.99 2.9a9.8 9.8 0 0 1 2.89 6.99c0 5.44-4.43 9.87-9.88 9.87Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"/>
  </svg>
`;
document.body.append(whatsappButton);