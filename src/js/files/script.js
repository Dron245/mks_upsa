// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
window.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("click", documentActions);
	function documentActions(e) {
		const targetElement = e.target;
		console.log(targetElement);

		// Проверяем, был ли клик по пункту меню
		// if (targetElement.closest(".menu__link") && isMobile.any()) {
		// 	const menuItem = targetElement.closest(".menu__item");
		// 	// Переключаем активность текущего пункта, но не закрываем другие
		// 	console.log(1);
			
		// 	// menuItem.classList.toggle("_active");
		// } else {
		// 	// Закрываем все открытые пункты меню, если клик был вне меню
		// 	document.querySelectorAll(".menu__item._active").forEach((item) => {
		// 		console.log(2);
				
		// 		item.classList.remove("_active");
		// 	});
		// }

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
  
  document.querySelectorAll(".menu__item").forEach(item => {
	const link = item.querySelector(".menu__link");
	const submenu = item.querySelector(".menu__sub-list");

	if (submenu ) {
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
});
