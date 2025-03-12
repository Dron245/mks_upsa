import axios from "axios";

document.addEventListener("DOMContentLoaded", createListenerFilterProduct);

const filterState = {
	"non-sugar": false,
	"sugar": false,
	"lemon": false,
	"raspberry": false,
	"for-childrens": false,
	"for-adult": false
};

const valueMap = {
	"3_2": "non-sugar",
	"3_1": "sugar",
	"2_1": "lemon",
	"2_2": "raspberry",
	"1_2": "for-childrens",
	"1_1": "for-adult"
};

const pairs = [
	["non-sugar", "sugar"],
	["lemon", "raspberry"],
	["for-childrens", "for-adult"]
];

function createListenerFilterProduct() {
	document.querySelectorAll('.js-filtered-product').forEach(container => {
		container.addEventListener('change', event => {
			const input = event.target;
			if (input.matches(".checkbox__input") && valueMap[input.value]) {
				filterState[valueMap[input.value]] = input.checked;
				sendFilterData();
			}
		});
	});
}

function sendFilterData() {
	const activeFilters = new Set();

	pairs.forEach(([key1, key2]) => {
		if (!(filterState[key1] && filterState[key2])) {
			if (filterState[key1]) activeFilters.add(key1);
			if (filterState[key2]) activeFilters.add(key2);
		}
	});

	const queryString = activeFilters.size ? `?tags=${Array.from(activeFilters).join(",")}` : '';
	const url = `/ajax/products.php${queryString}`;
	axios.get(url)
		.then(response => {
			const htmlString = response.data;
			updateFilteredCard(htmlString);
		})
		.catch(error => {});
}

function updateFilteredCard(htmlString) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, 'text/html');

	const newCardsBlock = doc.querySelector('.selects__results');
	const currentCardsBlock = document.querySelector('.selects__results');

	if (newCardsBlock && currentCardsBlock) {
		currentCardsBlock.style.opacity = '1';
		currentCardsBlock.style.transition = 'opacity 0.3s ease-out';
		currentCardsBlock.style.opacity = '0';

		setTimeout(() => {
			currentCardsBlock.innerHTML = newCardsBlock.innerHTML;

			currentCardsBlock.style.opacity = '0';
			setTimeout(() => {
				currentCardsBlock.style.transition = 'opacity 0.3s ease-in';
				currentCardsBlock.style.opacity = '1';
			}, 50);
		}, 300);
	}
}