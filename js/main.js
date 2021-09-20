(function () {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((el) => el.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navLinks = select(".nav-link", true);
  const navLinksActive = () => {
    let position = window.scrollY + 200;
    if (position < window.scrollY + 200) {
      const home = select(".nav-home");
      home.classList.add("nav-link-active");
    }
    navLinks.forEach((link) => {
      if (!link.hash) return;
      let section = select(link.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        link.classList.add("nav-link-active");
      } else {
        link.classList.remove("nav-link-active");
      }
    });
  };
  window.addEventListener("load", navLinksActive);
  onscroll(document, navLinksActive);

  /**
   * Toggle .nav-scrolled class to nav when page is scrolled
   */
  const nav = select(".nav");
  if (nav) {
    const navScrolled = () => {
      window.scrollY > 150
        ? nav.classList.add("nav-scrolled", "nav-shadow")
        : nav.classList.remove("nav-scrolled", "nav-shadow");
    };
    window.addEventListener("load", navScrolled);
    onscroll(document, navScrolled);
  }
  /**
   * Filter Projects
   */
  const portfolioItems = select(".portfolio-item", true);

  const applyFilter = (event) => {
    const filterParameter = event.currentTarget.classList.contains(
      "filter-project"
    )
      ? "filter-project"
      : event.currentTarget.classList.contains("filter-template")
      ? "filter-template"
      : "filter-all";

    const filterTabs = select(".filter-parameter", true);
    filterTabs.forEach((tab) => {
      tab.classList.contains(filterParameter)
        ? tab.classList.add("filter-parameter-highlight")
        : tab.classList.remove("filter-parameter-highlight");
    });

    portfolioItems.forEach((item) => {
      const cL = item.classList;
      if (filterParameter === "filter-all") {
        cL.remove("filter-display-none");
      } else if (!cL.contains(filterParameter)) {
        cL.add("filter-display-none");
      } else {
        cL.remove("filter-display-none");
      }
    });
  };

  on("click", ".filter-parameter", applyFilter, true);
})();
