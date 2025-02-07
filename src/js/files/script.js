// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';
window.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('click', documentActions);
	function documentActions(e) {
		const targetElement = e.target;
		console.log(targetElement);

		 // Проверяем, был ли клик по пункту меню
		 if (targetElement.closest('.menu__link')) {
			const menuItem = targetElement.closest('.menu__item');
 
			// Переключаем активность текущего пункта, но не закрываем другие
			menuItem.classList.toggle('_active');
	  }


		//работа с селектами
		if (targetElement.closest('.selects__item')) {
			const select = targetElement.closest('.selects__item');
			select.classList.toggle('_select-open');
		}

		
	}
});
