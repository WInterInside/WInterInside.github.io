export const initProjectPreview = () => {
	const dialog = document.querySelector("[data-project-preview]");
	if (!dialog) return;

	const image = dialog.querySelector("[data-preview-image]");
	const heading = dialog.querySelector("[data-preview-heading]");
	const scrollArea = dialog.querySelector("[data-preview-scroll]");
	const closeButton = dialog.querySelector("[data-preview-close]");
	const zoomButton = dialog.querySelector("[data-preview-zoom]");
	let openingButton = null;

	const setZoom = (zoomed) => {
		dialog.classList.toggle("project-preview--zoomed", zoomed);
		zoomButton.setAttribute("aria-pressed", String(zoomed));
		zoomButton.textContent = zoomed ? "По ширине" : "Увеличить";
	};

	document.addEventListener("click", (event) => {
		const button = event.target.closest("[data-preview-open]");
		if (!button) return;

		openingButton = button;
		heading.textContent = button.dataset.previewTitle;
		image.alt = `Полная страница проекта ${button.dataset.previewTitle}`;
		image.src = button.dataset.previewSrc;
		scrollArea.scrollTop = 0;
		scrollArea.scrollLeft = 0;
		setZoom(false);
		dialog.showModal();
		document.body.classList.add("is-preview-open");
		document.dispatchEvent(new Event("project-preview:change"));
		closeButton.focus();
	});

	closeButton.addEventListener("click", () => dialog.close());
	zoomButton.addEventListener("click", () =>
		setZoom(!dialog.classList.contains("project-preview--zoomed")),
	);
	dialog.addEventListener("click", (event) => {
		if (event.target === dialog) dialog.close();
	});
	dialog.addEventListener("close", () => {
		document.body.classList.remove("is-preview-open");
		image.removeAttribute("src");
		image.alt = "";
		openingButton?.focus();
		openingButton = null;
		document.dispatchEvent(new Event("project-preview:change"));
	});
};
