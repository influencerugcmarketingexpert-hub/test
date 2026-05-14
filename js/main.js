/* =========================================================
   THEJACKERMAKER - Homepage interactions
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
    initWishlist();
    initCart();
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

    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

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

    var defaultMsg = status.textContent;
    var defaultColor = status.style.color || "";

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

      status.textContent = "Welcome to the Insider list! Your 10% off code is on its way.";
      status.style.color = "#c69a6b";
      form.reset();

      // Reset to default after 6s
      setTimeout(function () {
        status.textContent = defaultMsg;
        status.style.color = defaultColor;
      }, 6000);
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

    // Disable buttons at edges
    var updateButtons = function () {
      var atStart = carousel.scrollLeft <= 4;
      var atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
      prev.style.opacity = atStart ? "0.4" : "1";
      next.style.opacity = atEnd ? "0.4" : "1";
      prev.style.pointerEvents = atStart ? "none" : "auto";
      next.style.pointerEvents = atEnd ? "none" : "auto";
    };
    updateButtons();
    carousel.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
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

    start();
  }

  /* ---------------------------------------------------------
     Wishlist heart toggle (visual only)
     --------------------------------------------------------- */
  function initWishlist() {
    var buttons = document.querySelectorAll(".wish-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var active = btn.getAttribute("data-active") === "true";
        if (active) {
          btn.setAttribute("data-active", "false");
          btn.innerHTML = "&#9825;"; // empty heart
          btn.style.background = "rgba(255,255,255,0.92)";
          btn.style.color = "";
        } else {
          btn.setAttribute("data-active", "true");
          btn.innerHTML = "&#9829;"; // filled heart
          btn.style.background = "#8b5a2b";
          btn.style.color = "#fff";
        }
      });
    });
  }

  /* ---------------------------------------------------------
     Cart count demo (Add to Cart / Quick View)
     --------------------------------------------------------- */
  function initCart() {
    var counter = document.querySelector(".cart-count");
    var addBtns = document.querySelectorAll(".add-btn");
    if (!counter || !addBtns.length) return;

    var count = parseInt(counter.textContent, 10) || 0;

    addBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        // Only increment for "Add to Cart" buttons (Best Sellers grid)
        if (btn.textContent.trim().toLowerCase().indexOf("add") !== 0) return;
        count += 1;
        counter.textContent = String(count);
        // Pulse animation
        counter.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.5)" },
            { transform: "scale(1)" }
          ],
          { duration: 350, easing: "ease-out" }
        );
      });
    });
  }
})();
