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

			// Закрываем все открытые пункты меню, кроме текущего
			document.querySelectorAll('.menu__item._active').forEach((item) => {
				if (item !== menuItem) {
					item.classList.remove('_active');
				}
			});

			// Переключаем активность текущего пункта
			menuItem.classList.toggle('_active');
		} else {
			// Закрываем все пункты меню при клике вне меню
			document.querySelectorAll('.menu__item._active').forEach((item) => {
				item.classList.remove('_active');
			});
		}
	}
});
