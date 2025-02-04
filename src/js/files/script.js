// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
window.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("click", documentActions);
	function documentActions(e) {
		const targetElement = e.target;
		
	}
})