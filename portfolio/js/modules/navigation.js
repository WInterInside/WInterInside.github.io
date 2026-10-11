export const initNavigation = () => {
	const toggle = document.querySelector("[data-menu-toggle]");
	const navigation = document.querySelector("[data-navigation]");

	if (!toggle || !navigation) return;

	const setOpen = (isOpen) => {
		toggle.setAttribute("aria-expanded", String(isOpen));
		toggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
		navigation.classList.toggle("is-open", isOpen);
		document.body.classList.toggle("is-menu-open", isOpen);
	};

	toggle.addEventListener("click", () => {
		setOpen(toggle.getAttribute("aria-expanded") !== "true");
	});

	navigation.addEventListener("click", (event) => {
		if (event.target.closest("a")) setOpen(false);
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
			setOpen(false);
			toggle.focus();
		}
	});

	window.matchMedia("(min-width: 701px)").addEventListener("change", (event) => {
		if (event.matches) setOpen(false);
	});
};
