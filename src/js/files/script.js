// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';
window.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('click', documentActions);
	function documentActions(e) {
		const targetElement = e.target;
		// console.log(targetElement);

		//работа с селектами
		if (targetElement.closest('.selects__item')) {
			const select = targetElement.closest('.selects__item');
			select.classList.toggle('_select-open');
		}

		// при возврате на предыдущую страницу меню закрывается
		if (
			targetElement.closest('.menu__sub-link') &&
			document.documentElement.classList.contains('menu-open')
		) {
			document.documentElement.classList.remove('lock', 'menu-open');
			document.querySelector('.menu__body').style.transition = '0s';
			document.querySelectorAll('.menu__item').forEach((item) => {
				item.classList.remove('_active');
			})
			document.querySelectorAll('.menu__sub-list').forEach((item) => {
				item.style.maxHeight = '0px';
			})

			const burger = document.querySelector('.icon-menu');

			// Отключаем transition
			burger.style.setProperty('--transition-duration', '0s');
			
			//Включаем обратно через 100ms
			setTimeout(() => {
			    burger.style.setProperty('--transition-duration', '0.3s');
			}, 100);
		}
		
	}
	//учёт высоты предупреждения для отступа у самого нижнего блока на странице
	const conditions = document.querySelector('.footer__contraindications');
	const footerContainer = document.querySelector('.footer__container');
	footerContainer.style.paddingBottom = `${conditions.offsetHeight + 50}px`;



	// плавное открытие саб меню в мобилке
	function toggleSubmenu(submenu, item) {
		if (!submenu.style.maxHeight || submenu.style.maxHeight === '0px') {
			submenu.style.maxHeight = submenu.scrollHeight + 'px';
			item.classList.add('_active');
		} else {
			submenu.style.maxHeight = '0px';
			item.classList.remove('_active');
		}
	}
	// Показываем/скрываем саб меню
	document.querySelectorAll('.menu__item').forEach((item) => {
		const link = item.querySelector('.menu__link');
		const submenu = item.querySelector('.menu__sub-list');

		if (submenu) {
			submenu.style.overflow = 'hidden'; // Исключаем появление скролла
			submenu.style.maxHeight = '0px'; // Начальное состояние

			link.addEventListener('click', (e) => {
				if (window.innerWidth <= 768.02) {
					e.preventDefault();
					toggleSubmenu(submenu, item);
				}
			});
		}
	});

	// Убираем границу у двух последних блоков
	const advantages = document.querySelectorAll('.advantage');
	// Преобразуем NodeList в массив
	const advantagesArray = Array.from(advantages);

	if (advantagesArray.length >= 2) {
		advantagesArray.slice(-2).forEach((el) => (el.style.borderBottom = 'none'));
	}

	document.addEventListener('touchend', function () {}, false);

	//даю класс в зависимости от наличия скролла.
	window.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			document.body.classList.add('_scrolled');
		} else {
			document.body.classList.remove('_scrolled');
		}
	});
});

window.addEventListener("pageshow", () => {
	document.documentElement.classList.remove('lock', 'menu-open');
})


// учёт высоты админ панели WP
// const referenceElement = document.getElementById("wpadminbar");
// const headerContainer = document.querySelector(".header__container");

// if (referenceElement && headerContainer) {
// 	const height = referenceElement.getBoundingClientRect().height;
// 	console.log(referenceElement);
// 	headerContainer.style.setProperty("--height", `${60 + height}px`);
// }

const observer = new MutationObserver(() => {
	const referenceElement = document.getElementById("wpadminbar");
	const headerContainer = document.querySelector(".header__container");
	if (referenceElement && headerContainer) {
		 const height = referenceElement.getBoundingClientRect().height;
		 console.log(height);
		 headerContainer.style.setProperty("--height", `${64+height}px`);
	}
});

observer.observe(document.body, { childList: true, subtree: true });