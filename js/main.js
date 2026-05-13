/* =========================================================
   The Jacket Studio - Landing page interactions
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initMobileNav();
    initNewsletter();
    initCarousel();
    initReveal();
    initAnnouncement();
  });

  /* ---------------------------------------------------------
     Sticky header shadow on scroll
     --------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    var update = function () {
      if (window.scrollY > 8) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------------------------------------------------------
     Mobile nav drawer toggle
     --------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var drawer = document.getElementById("mobileNav");
    if (!toggle || !drawer) return;

    var close = function () {
      toggle.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      drawer.classList.remove("open");
    };
    var open = function () {
      toggle.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
      drawer.classList.add("open");
    };

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) close(); else open();
    });

    // Close when any link inside the drawer is tapped
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });

    // Close on escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    // Close when resizing up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) close();
    });
  }

  /* ---------------------------------------------------------
     Newsletter submit
     --------------------------------------------------------- */
  function initNewsletter() {
    var form = document.getElementById("newsForm");
    var status = document.getElementById("newsStatus");
    if (!form || !status) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var value = input ? input.value.trim() : "";
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!valid) {
        status.textContent = "Please enter a valid email address.";
        status.style.color = "#e2b98c";
        return;
      }

      status.textContent = "Thanks for subscribing! Check your inbox for a welcome note.";
      status.style.color = "";
      form.reset();
    });
  }

  /* ---------------------------------------------------------
     New Arrivals carousel - prev / next
     --------------------------------------------------------- */
  function initCarousel() {
    var carousel = document.getElementById("carousel");
    var prev = document.getElementById("prevBtn");
    var next = document.getElementById("nextBtn");
    if (!carousel || !prev || !next) return;

    var step = function () {
      var first = carousel.querySelector(".carousel-item");
      if (!first) return carousel.clientWidth * 0.8;
      var styles = window.getComputedStyle(carousel);
      var gap = parseFloat(styles.columnGap || styles.gap || "24") || 24;
      return first.getBoundingClientRect().width + gap;
    };

    prev.addEventListener("click", function () {
      carousel.scrollBy({ left: -step(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      carousel.scrollBy({ left: step(), behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------
     Scroll-triggered reveal
     --------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     Announcement bar rotation
     --------------------------------------------------------- */
  function initAnnouncement() {
    var wrap = document.getElementById("announcementMsg");
    if (!wrap) return;
    var slides = wrap.querySelectorAll(".announcement-slide");
    if (!slides.length) return;

    // Normalize state: first slide active, all slides unhidden
    // (CSS .announcement-slide { display: none } + .is-active drives visibility once JS is running).
    slides.forEach(function (el, i) {
      el.removeAttribute("hidden");
      if (i === 0) {
        el.classList.add("is-active");
      } else {
        el.classList.remove("is-active");
      }
    });

    if (slides.length < 2) return;

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    var region = document.getElementById("announcement") || wrap;
    var index = 0;
    var timer = null;

    var advance = function () {
      slides[index].classList.remove("is-active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-active");
    };
    var start = function () {
      if (timer) return;
      timer = setInterval(advance, 4000);
    };
    var stop = function () {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    region.addEventListener("mouseenter", stop);
    region.addEventListener("mouseleave", start);
    region.addEventListener("focusin", stop);
    region.addEventListener("focusout", start);

    start();
  }
})();
