/* ==========================================================
   TechWorld IT Services - Main JavaScript File
   Simple, clean, and beginner-friendly Vanilla JS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // 2. Set Dynamic Year in Footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Load Services from services.json Using Fetch API
  const servicesContainer = document.getElementById("services-container");

  if (servicesContainer) {
    // Show a temporary loading message
    servicesContainer.innerHTML = '<p class="status-message">Loading services...</p>';

    fetch("data/services.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load services data");
        }
        return response.json();
      })
      .then((services) => {
        // Clear loading message
        servicesContainer.innerHTML = "";

        // Loop through each service and create a card
        services.forEach((service) => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <div class="card-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
          `;

          servicesContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error loading services:", error);
        // Fallback display if fetch fails (e.g., opened locally via direct file:// without local server)
        servicesContainer.innerHTML = `
          <div class="card">
            <div class="card-icon">🌐</div>
            <h3>Web Development</h3>
            <p>Modern, fast, and responsive websites and web applications built using clean and standard web technologies.</p>
          </div>
          <div class="card">
            <div class="card-icon">☁️</div>
            <h3>Cloud Computing</h3>
            <p>Secure and scalable cloud setup, migration, and management on leading cloud providers to empower your business.</p>
          </div>
          <div class="card">
            <div class="card-icon">⚡</div>
            <h3>DevOps</h3>
            <p>Streamline software delivery with automated CI/CD pipelines, automated testing, and faster deployment cycles.</p>
          </div>
          <div class="card">
            <div class="card-icon">🐳</div>
            <h3>Docker</h3>
            <p>Package applications into lightweight, portable containers to ensure consistent performance across all environments.</p>
          </div>
          <div class="card">
            <div class="card-icon">☸️</div>
            <h3>Kubernetes</h3>
            <p>Automated container orchestration, scaling, self-healing, and seamless management for high-availability production workloads.</p>
          </div>
        `;
      });
  }

  // 4. Contact Form Submission (Client-Side Demo)
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Stop page reload

      // Read form input values
      const name = document.getElementById("name").value.trim();
      const service = document.getElementById("service").value;

      // Display success confirmation
      formMessage.textContent = `Thank you, ${name}! Your request regarding "${service}" has been received. Our team will contact you shortly.`;
      formMessage.className = "form-message success";

      // Reset form fields
      contactForm.reset();
    });
  }
});
