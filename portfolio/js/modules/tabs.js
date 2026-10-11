export const initTabs = () => {
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
				End: tabs.length - 1,
			};
			if (!(event.key in keys)) return;
			event.preventDefault();
			activate((keys[event.key] + tabs.length) % tabs.length, true);
		});
	});
};
