import { initNavigation } from "./modules/navigation.js";
import { initCarousel } from "./modules/carousel.js";
import { initProjectPreview } from "./modules/project-preview.js";
import { initTabs } from "./modules/tabs.js";
import { initReveal } from "./modules/reveal.js";

const initApp = () => {
	initNavigation();
	initCarousel();
	initProjectPreview();
	initTabs();
	initReveal();
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
	initApp();
}
