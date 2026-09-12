(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function (event) {
    event.stopPropagation();
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", function (event) {
    if (nav.classList.contains("is-open") && !nav.contains(event.target)) closeNav();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });
})();

(function () {
  var bar = document.querySelector(".mobile-cta");
  if (!bar) return;
  var hero = document.querySelector(".hero");
  var contact = document.querySelector(".contact");

  function update() {
    var hidden = false;
    if (hero) {
      hidden = window.scrollY < hero.offsetTop + hero.offsetHeight - 80;
    }
    if (contact && contact.getBoundingClientRect().top < window.innerHeight - 80) {
      hidden = true;
    }
    bar.classList.toggle("is-hidden", hidden);
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

(function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (!form || !status) return;

  var RECIPIENT = ["info", "ramonaterpstra.nl"].join("@");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var voornaam = form.voornaam.value.trim();
    var achternaam = form.achternaam.value.trim();
    var email = form.email.value.trim();
    var telefoon = form.telefoon.value.trim();
    var bericht = form.bericht.value.trim();

    var subject = "Contactformulier website – " + voornaam + " " + achternaam;
    var bodyLines = [
      "Naam: " + voornaam + " " + achternaam,
      "E-mailadres: " + email,
      "Telefoonnummer: " + (telefoon || "-"),
      "",
      "Bericht:",
      bericht,
    ];

    var mailtoUrl =
      "mailto:" +
      RECIPIENT +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(bodyLines.join("\n"));

    status.textContent = "Je e-mailprogramma wordt geopend met je bericht al ingevuld.";
    status.dataset.state = "info";
    status.hidden = false;
    window.location.href = mailtoUrl;
  });
})();

(function () {
  var sections = document.querySelectorAll("main > section:not(.hero)");
  if (!sections.length) return;

  sections.forEach(function (section) {
    section.classList.add("reveal");
  });

  if (!("IntersectionObserver" in window)) {
    sections.forEach(function (section) {
      section.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -60px 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);

    var rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add("is-visible");
    }
  });
})();
