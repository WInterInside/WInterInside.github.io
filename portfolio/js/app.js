(() => {
  // src/js/modules/navigation.js
  var initNavigation = () => {
    var _a, _b;
    const header = document.querySelector("[data-header]");
    const headerNav = header == null ? void 0 : header.querySelector("[data-navigation]");
    const menuToggle = header == null ? void 0 : header.querySelector("[data-menu-toggle]");
    const headerLinks = [...(_a = headerNav == null ? void 0 : headerNav.querySelectorAll('a[href^="#"]')) != null ? _a : []];
    const dock = document.querySelector("[data-dock-navigation]");
    const viewport = dock == null ? void 0 : dock.querySelector("[data-dock-viewport]");
    const sections = [...document.querySelectorAll("main > section[id], #student-reviews")];
    const links = [...(_b = viewport == null ? void 0 : viewport.querySelectorAll('a[href^="#"]')) != null ? _b : []];
    const mobile = window.matchMedia("(max-width: 850px)");
    const navGroups = {
      bird: "projects",
      perimeter: "projects",
      yoga: "projects",
      luma: "projects",
      emails: "projects",
      toolkit: "experience",
      libraries: "experience",
      about: "experience"
    };
    if (!header || !headerNav || !menuToggle || !dock || !viewport || !sections.length) return;
    let currentSection = "";
    let frame = 0;
    const setMenuOpen = (open) => {
      const isOpen = open && mobile.matches;
      header.classList.toggle("is-menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E" : "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E");
      headerNav.inert = mobile.matches && !isOpen;
    };
    const setCurrentSection = (id) => {
      if (id === currentSection) return;
      currentSection = id;
      for (const link of links) {
        if (link.hash === `#${id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      }
      for (const link of headerLinks) {
        if (link.hash === `#${id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };
    const update = () => {
      var _a2;
      frame = 0;
      const isMobile = mobile.matches;
      header.classList.toggle("is-compact", isMobile && window.scrollY > 48);
      const isDockVisible = !isMobile && header.getBoundingClientRect().bottom <= 0;
      dock.classList.toggle("is-visible", isDockVisible);
      dock.inert = !isDockVisible;
      dock.setAttribute("aria-hidden", String(!isDockVisible));
      const position = window.innerHeight * 0.4;
      let activeSection = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > position) break;
        activeSection = section.id;
      }
      setCurrentSection((_a2 = navGroups[activeSection]) != null ? _a2 : activeSection);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const updateAfterResize = () => {
      currentSection = "";
      setMenuOpen(false);
      scheduleUpdate();
    };
    menuToggle.addEventListener("click", () => {
      setMenuOpen(!header.classList.contains("is-menu-open"));
    });
    headerNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenuOpen(false);
    });
    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) setMenuOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("is-menu-open")) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", updateAfterResize);
    mobile.addEventListener("change", updateAfterResize);
    setMenuOpen(false);
    update();
  };

  // src/js/modules/clock.js
  var initClock = () => {
    const clock = document.querySelector("[data-clock]");
    if (!clock) return;
    const time = clock.querySelector("[data-clock-time]");
    const seconds = clock.querySelector("[data-clock-seconds]");
    const weekday = clock.querySelector("[data-clock-weekday]");
    const date = clock.querySelector("[data-clock-date]");
    if (!time || !seconds || !weekday || !date) return;
    const weekdayFormatter = new Intl.DateTimeFormat("ru-RU", { weekday: "long" });
    const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    let timeoutId;
    const render = () => {
      const now = /* @__PURE__ */ new Date();
      time.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      seconds.textContent = String(now.getSeconds()).padStart(2, "0");
      weekday.textContent = weekdayFormatter.format(now);
      date.textContent = dateFormatter.format(now);
      clock.setAttribute("datetime", now.toISOString());
    };
    const schedule = () => {
      if (document.hidden) return;
      timeoutId = window.setTimeout(() => {
        render();
        schedule();
      }, 1e3 - Date.now() % 1e3);
    };
    document.addEventListener("visibilitychange", () => {
      window.clearTimeout(timeoutId);
      if (!document.hidden) {
        render();
        schedule();
      }
    });
    render();
    schedule();
  };

  // src/js/modules/carousel.js
  var initCarousel = () => {
    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;
    const viewport = carousel.querySelector("[data-carousel-viewport]");
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const previousButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const currentNumber = carousel.querySelector("[data-carousel-current]");
    const progress = carousel.querySelector("[data-carousel-progress]");
    if (!viewport || !previousButton || !nextButton || !currentNumber || !progress || slides.length < 2) return;
    let currentIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("project-slide--fishart")));
    let pointerStart = null;
    const render = (announce = false) => {
      const previousIndex = (currentIndex - 1 + slides.length) % slides.length;
      const nextIndex = (currentIndex + 1) % slides.length;
      slides.forEach((slide, index) => {
        const state = index === currentIndex ? "active" : index === previousIndex ? "prev" : index === nextIndex ? "next" : "hidden";
        slide.dataset.state = state;
        slide.inert = state !== "active";
        slide.setAttribute("aria-hidden", String(state !== "active"));
      });
      currentNumber.textContent = String(currentIndex + 1).padStart(2, "0");
      currentNumber.parentElement.setAttribute("aria-live", announce ? "polite" : "off");
      progress.style.width = `${(currentIndex + 1) / slides.length * 100}%`;
      carousel.dispatchEvent(new CustomEvent("carousel:change", { detail: { currentIndex } }));
    };
    const goTo = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      render(true);
    };
    previousButton.addEventListener("click", () => goTo(currentIndex - 1));
    nextButton.addEventListener("click", () => goTo(currentIndex + 1));
    viewport.addEventListener("keydown", (event) => {
      if (event.target !== viewport) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(currentIndex + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(currentIndex - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }
    });
    viewport.addEventListener("pointerdown", (event) => {
      if (event.target.closest("a, button")) return;
      pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
    });
    viewport.addEventListener("pointerup", (event) => {
      if (!pointerStart || event.pointerId !== pointerStart.id) return;
      const differenceX = event.clientX - pointerStart.x;
      const differenceY = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(differenceX) > 55 && Math.abs(differenceX) > Math.abs(differenceY) * 1.3) {
        goTo(currentIndex + (differenceX < 0 ? 1 : -1));
      }
    });
    viewport.addEventListener("pointercancel", () => {
      pointerStart = null;
    });
    render();
  };

  // src/js/modules/project-preview.js
  var initProjectPreview = () => {
    const dialog = document.querySelector("[data-project-preview]");
    if (!dialog) return;
    const image = dialog.querySelector("[data-preview-image]");
    const heading = dialog.querySelector("[data-preview-heading]");
    const eyebrow = dialog.querySelector("[data-preview-eyebrow]");
    const scrollArea = dialog.querySelector("[data-preview-scroll]");
    const closeButton = dialog.querySelector("[data-preview-close]");
    const zoomButton = dialog.querySelector("[data-preview-zoom]");
    let openingButton = null;
    const setZoom = (zoomed) => {
      dialog.classList.toggle("project-preview--zoomed", zoomed);
      zoomButton.setAttribute("aria-pressed", String(zoomed));
      zoomButton.textContent = zoomed ? "\u041F\u043E \u0448\u0438\u0440\u0438\u043D\u0435" : "\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C";
    };
    image.addEventListener("load", () => {
      image.style.setProperty("--preview-zoom-width", `${Math.round(image.naturalWidth * 1.5)}px`);
    });
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-preview-open]");
      if (!button) return;
      openingButton = button;
      const isMail = button.dataset.previewKind === "\u043F\u0438\u0441\u044C\u043C\u0430";
      const isReview = button.dataset.previewKind === "\u043E\u0442\u0437\u044B\u0432";
      dialog.classList.toggle("project-preview--mail", isMail);
      dialog.classList.toggle("project-preview--review", isReview);
      heading.textContent = button.dataset.previewTitle;
      eyebrow.textContent = isReview ? "\u041E\u0420\u0418\u0413\u0418\u041D\u0410\u041B \u041E\u0422\u0417\u042B\u0412\u0410" : isMail ? "\u041F\u0420\u041E\u0421\u041C\u041E\u0422\u0420 \u041F\u0418\u0421\u042C\u041C\u0410" : "\u041F\u0420\u041E\u0421\u041C\u041E\u0422\u0420 \u041F\u0420\u041E\u0415\u041A\u0422\u0410";
      image.alt = `${isReview ? "\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442" : "\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043D\u0438\u043C\u043E\u043A"}: ${button.dataset.previewTitle}`;
      scrollArea.setAttribute("aria-label", isReview ? "\u041F\u0440\u043E\u043A\u0440\u0443\u0447\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043E\u0442\u0437\u044B\u0432\u0430" : "\u041F\u0440\u043E\u043A\u0440\u0443\u0447\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u0441\u043D\u0438\u043C\u043E\u043A \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0438\u043B\u0438 \u043F\u0438\u0441\u044C\u043C\u0430");
      image.src = button.dataset.previewSrc;
      scrollArea.scrollTop = 0;
      scrollArea.scrollLeft = 0;
      setZoom(false);
      dialog.showModal();
      document.body.classList.add("is-preview-open");
      closeButton.focus();
    });
    closeButton.addEventListener("click", () => dialog.close());
    zoomButton.addEventListener(
      "click",
      () => setZoom(!dialog.classList.contains("project-preview--zoomed"))
    );
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("is-preview-open");
      image.removeAttribute("src");
      image.alt = "";
      dialog.classList.remove("project-preview--mail");
      dialog.classList.remove("project-preview--review");
      openingButton == null ? void 0 : openingButton.focus();
      openingButton = null;
    });
  };

  // src/js/modules/bird-animation.js
  var initBirdAnimation = () => {
    const bird = document.querySelector("[data-bird-frame]");
    if (!bird || !window.IntersectionObserver) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sources = Array.from(
      { length: 30 },
      (_, index) => `./assets/bird-frames/frame-${String(index).padStart(2, "0")}.png`
    );
    let frames = null;
    let frameIndex = 0;
    let direction = 1;
    let lastFrameTime = 0;
    let visible = false;
    let animationId = 0;
    const tick = (time) => {
      if (!visible || document.hidden || reducedMotion.matches) {
        animationId = 0;
        return;
      }
      if (time - lastFrameTime >= 1e3 / 30) {
        frameIndex += direction;
        if (frameIndex === sources.length - 1 || frameIndex === 0) direction *= -1;
        if (frames[frameIndex].complete && frames[frameIndex].naturalWidth) {
          bird.src = sources[frameIndex];
        }
        lastFrameTime = time;
      }
      animationId = requestAnimationFrame(tick);
    };
    const update = () => {
      if (visible && !document.hidden && !reducedMotion.matches) {
        if (!frames) {
          frames = sources.map((source) => {
            const frame = new Image();
            frame.src = source;
            return frame;
          });
        }
        if (!animationId) animationId = requestAnimationFrame(tick);
      } else if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
      if (reducedMotion.matches) bird.src = sources[0];
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        update();
      },
      { rootMargin: "150px 0px" }
    );
    observer.observe(bird);
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", update);
  };

  // src/js/modules/tabs.js
  var initTabs = () => {
    const tabsRoot = document.querySelector("[data-tabs]");
    if (!tabsRoot) return;
    const tabs = [...tabsRoot.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
    const activate = (index, moveFocus = false) => {
      tabs.forEach((tab, tabIndex) => {
        const selected = tabIndex === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[tabIndex].hidden = !selected;
      });
      if (moveFocus) tabs[index].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(index));
      tab.addEventListener("keydown", (event) => {
        const keys = {
          ArrowRight: index + 1,
          ArrowLeft: index - 1,
          Home: 0,
          End: tabs.length - 1
        };
        if (!(event.key in keys)) return;
        event.preventDefault();
        activate((keys[event.key] + tabs.length) % tabs.length, true);
      });
    });
  };

  // src/js/modules/reveal.js
  var initReveal = () => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px 40px 0px" }
    );
    elements.forEach((element) => observer.observe(element));
  };

  // src/js/modules/student-process.js
  var initStudentProcess = () => {
    const process = document.querySelector("[data-student-process]");
    if (!process) return;
    const tabs = [...process.querySelectorAll("[data-student-step]")];
    const panels = [...process.querySelectorAll("[data-student-panel]")];
    const steps = process.querySelector(".students__steps");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentIndex = 0;
    let visible = false;
    let userSelected = false;
    const activate = (index, moveFocus = false) => {
      currentIndex = (index + tabs.length) % tabs.length;
      tabs.forEach((tab, tabIndex) => {
        const active = tabIndex === currentIndex;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[tabIndex].hidden = !active;
      });
      steps.style.setProperty("--student-progress", `${12.5 + currentIndex * 25}%`);
      steps.style.setProperty("--student-progress-mobile", currentIndex);
      if (moveFocus) tabs[currentIndex].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        userSelected = true;
        activate(index);
      });
      tab.addEventListener("keydown", (event) => {
        const next = {
          ArrowRight: index + 1,
          ArrowDown: index + 1,
          ArrowLeft: index - 1,
          ArrowUp: index - 1,
          Home: 0,
          End: tabs.length - 1
        };
        if (!(event.key in next)) return;
        event.preventDefault();
        userSelected = true;
        activate(next[event.key], true);
      });
    });
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      }, { threshold: 0.25 });
      observer.observe(process);
    } else {
      visible = true;
    }
    window.setInterval(() => {
      if (!visible || userSelected || document.hidden || reducedMotion.matches || process.matches(":hover") || process.contains(document.activeElement)) return;
      activate(currentIndex + 1);
    }, 5500);
  };

  // src/js/modules/review-slider.js
  var initReviewSlider = () => {
    const slider = document.querySelector("[data-review-slider]");
    if (!slider) return;
    const viewport = slider.querySelector("[data-review-viewport]");
    const cards = [...slider.querySelectorAll(".student-reviews__card")];
    const previous = slider.querySelector("[data-review-prev]");
    const next = slider.querySelector("[data-review-next]");
    const current = slider.querySelector("[data-review-current]");
    const total = slider.querySelector("[data-review-total]");
    const progress = slider.querySelector("[data-review-progress]");
    const singleCard = window.matchMedia("(max-width: 900px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let page = 0;
    let programmatic = false;
    let settleTimer;
    let scrollFrame;
    const visibleCount = () => singleCard.matches ? 1 : 2;
    const pageCount = () => Math.ceil(cards.length / visibleCount());
    const format = (value) => String(value).padStart(2, "0");
    const pageLeft = (index) => cards[index * visibleCount()].offsetLeft - cards[0].offsetLeft;
    const update = () => {
      const pages = pageCount();
      current.textContent = format(page + 1);
      total.textContent = format(pages);
      progress.style.width = `${(page + 1) / pages * 100}%`;
      previous.disabled = page === 0;
      next.disabled = page === pages - 1;
    };
    const goTo = (index, animate = true) => {
      page = Math.max(0, Math.min(index, pageCount() - 1));
      update();
      programmatic = true;
      viewport.scrollTo({
        left: pageLeft(page),
        behavior: animate && !reducedMotion.matches ? "smooth" : "auto"
      });
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        programmatic = false;
      }, animate && !reducedMotion.matches ? 500 : 0);
    };
    const syncFromScroll = () => {
      if (programmatic) return;
      let closest = 0;
      let distance = Infinity;
      for (let index = 0; index < pageCount(); index += 1) {
        const difference = Math.abs(viewport.scrollLeft - pageLeft(index));
        if (difference < distance) {
          closest = index;
          distance = difference;
        }
      }
      if (closest !== page) {
        page = closest;
        update();
      }
    };
    previous.addEventListener("click", () => goTo(page - 1));
    next.addEventListener("click", () => goTo(page + 1));
    viewport.addEventListener("keydown", (event) => {
      if (event.target !== viewport || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      goTo(page + (event.key === "ArrowRight" ? 1 : -1));
    });
    viewport.addEventListener("scroll", () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(syncFromScroll);
    }, { passive: true });
    singleCard.addEventListener("change", () => goTo(Math.min(page, pageCount() - 1), false));
    window.addEventListener("resize", () => goTo(page, false));
    update();
  };

  // src/js/modules/sinaps-preview.js
  var initSinapsPreview = () => {
    const video = document.querySelector("[data-sinaps-preview-video]");
    if (!video || !window.IntersectionObserver) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible && !document.hidden && !reducedMotion.matches) {
        video.play().catch(() => {
        });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        update();
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", update);
  };

  // src/js/app.js
  var initApp = () => {
    initNavigation();
    initClock();
    initCarousel();
    initProjectPreview();
    initBirdAnimation();
    initTabs();
    initReveal();
    initStudentProcess();
    initReviewSlider();
    initSinapsPreview();
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, { once: true });
  } else {
    initApp();
  }
})();
