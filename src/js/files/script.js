// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
window.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("click", documentActions);
	function documentActions(e) {
		const targetElement = e.target;
		console.log(targetElement);

		//работа с селектами
		if (targetElement.closest(".selects__item")) {
			const select = targetElement.closest(".selects__item");
			select.classList.toggle("_select-open");
		}
	}

	const conditions = document.querySelector(".footer__contraindications");
	const footerContainer = document.querySelector(".footer__container");
	footerContainer.style.paddingBottom = `${conditions.offsetHeight + 50}px`;

	// плавное открытие саб меню в мобилке
	function toggleSubmenu(submenu, item) {
		if (!submenu.style.maxHeight || submenu.style.maxHeight === "0px") {
			submenu.style.maxHeight = submenu.scrollHeight + "px";
			item.classList.add("_active");
		} else {
			submenu.style.maxHeight = "0px";
			item.classList.remove("_active");
		}
	}

	document.querySelectorAll(".menu__item").forEach((item) => {
		const link = item.querySelector(".menu__link");
		const submenu = item.querySelector(".menu__sub-list");

		if (submenu) {
			submenu.style.overflow = "hidden"; // Исключаем появление скролла
			submenu.style.maxHeight = "0px"; // Начальное состояние

			link.addEventListener("click", (e) => {
				if (window.innerWidth <= 768) {
					e.preventDefault();
					toggleSubmenu(submenu, item);
				}
			});
		}
	});

	const advantages = document.querySelectorAll(".advantage");
	 // Преобразуем NodeList в массив
	 const advantagesArray = Array.from(advantages);

	 if (advantagesArray.length >= 2) {
		advantagesArray.slice(-2).forEach(el => el.style.borderBottom = "none");
	 }
});
