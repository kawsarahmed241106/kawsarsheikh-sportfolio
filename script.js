const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 12);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navLinks.forEach(item => item.classList.toggle('active', item === link));
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.focus();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".project-filter");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach(item => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      projectCards.forEach(card => {
        const shouldShow = selectedCategory === "all" || card.dataset.category === selectedCategory;
        card.classList.toggle("hidden", !shouldShow);

        if (shouldShow) {
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "";
        }
      });
    });
  });
});

// Contact form: open a prefilled email in the visitor's email application.
const contactForm = document.getElementById("contactForm");
const contactFormStatus = document.getElementById("contactFormStatus");
const receiverEmail = "hello@kawsarahmed.dev";

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const emailSubject = encodeURIComponent(subject || "New Portfolio Contact Message");
    const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    contactFormStatus.textContent = "Opening your email application...";
    window.location.href = `mailto:${receiverEmail}?subject=${emailSubject}&body=${emailBody}`;
  });
}
