import { BD } from './togle.js';

let bd = BD(namePage);

const dom = document.querySelector('#Right');
let page = 1;
const cntCardsOnPage = 10;

let maxPage = Math.ceil(bd.length / cntCardsOnPage);
document.querySelector('#pagenInput').max = maxPage;
document.querySelector('.lastPage').innerHTML = maxPage;

// min max

// const sliders = document.querySelectorAll('input[type="range"]');

// sliders[0].addEventListener('input', (e) => {
//  if(+sliders[0].value > +sliders[1].value){
//     sliders[1].value = +sliders[0].value;
//   }
// });

// sliders[1].addEventListener('input', (e) => {
//  if(+sliders[1].value < +sliders[0].value){
//     sliders[0].value = +sliders[1].value;
//   }
// });

function selectGenerate(tires) {
	const masSort = Array.from(
		document.querySelectorAll('#sel'),
		(el) => el.dataset.type
	);
	const masElement = document.querySelectorAll('#sel');
	const masValue = masSort.map(() => []);

	tires.forEach((item) => {
		masSort.forEach((type, i) => {
			if (!masValue[i].includes(item[type])) {
				if (item[type] != '') {
					masValue[i].push(item[type]);
				}
			}
		});
	});
		masSort.forEach((_, i) => {
			masValue[i].sort(function(a, b) {return a - b});
			
			if ((masElement[i].dataset.value && masElement[i].dataset.value == 'max')){
				masValue[i].reverse()
			}
			
			masElement[i].innerHTML += masValue[i]
			.map((value) => `<option value="${value}">${value}</option>`)
			.join('');
			
	});
}

function cardGenerate(tires) {
	const start = (page - 1) * cntCardsOnPage;
	const end = page * cntCardsOnPage;
	dom.innerHTML = '';

	let cardHtml = '';

	for (let i = start; i < end; i++) {
		if (!tires[i]) break;
		const item = tires[i];
		const imgSrc = item.image500x500 ? item.image500x500 : './img/nonPNG.png';

		const card = `
		<div class="cart-cards__item cart-card" data-id="${i}">
            <div class="cart-card__body">
                <div class="cart-card__image">
                    <img loading="lazy" src="${imgSrc}" alt="Изображение">
                </div>
                <div class="cart-card__info">
                    <div class="cart-card__info-header info-header">
                        <div class="info-header__title">${item.name}</div>
                        <div class="info-header__price">${item.price}руб/шт.</div>
                        <div class="info-header__details"><span>Цвет: </span>${item.color}</div>
                        <div class="info-header__details"><span>Тип: </span>${item.type}</div>
                        <div class="info-header__details"><span>Дата производства: </span>${item.date_up}</div>
                        <div class="info-header__details _details-stock"><span>В наличии: </span>${item.stock}</div>
                    </div>
                    <div class="cart-card__info-footer info-footer">
                        <div class="info-footer__cart-left"><span>В корзине: </span>${item.total}</div>
                        <div class="info-footer__func-btns">
                            <button class="info-footer__func-btn addCartItem" data-id="${i}">Добавить</button>
                            <button class="info-footer__func-btn delCartItem" data-id="${i}">Убрать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
		cardHtml += card;
	}
	dom.innerHTML = cardHtml;
}

function sortCard(sortMas, tires, selectMas) {
	if (sortMas == []) {
		bd = tires;
		return;
	}

	let NewMas = tires;
	let MasSort = [];

	NewMas.forEach((el) => {
		let value = 0;
	  
		sortMas.forEach((type) => {
			if (selectMas[sortMas.indexOf(type)].dataset.type !== 'price') {
				if (Object.values(el).indexOf(type) !== -1) {
				value++;
				}
			} else {
				const select = selectMas[sortMas.indexOf(type)];
				const valueType = select.dataset.value;
				const selectValue = +select.value;
				const elPrice = +el[select.dataset.type];
		
				if ((valueType === 'max' && elPrice < selectValue) || (valueType === 'min' && elPrice >= selectValue)) {
					value++;
				}
				document.querySelector(`#${select.dataset.value}`).innerHTML = select.value;
			}
		});
		if (value === sortMas.length) {
		  MasSort.push(el);
		}
	  });

	bd = MasSort;
	maxPage = Math.ceil(bd.length / cntCardsOnPage);
	document.querySelector('#page input').max = maxPage;
	document.querySelector('.lastPage').innerHTML = maxPage;
	document.querySelector('#page input').value = 1;
	page = 1;
	cardGenerate(bd);
}

selectGenerate(bd);

cardGenerate(bd);

document.querySelectorAll('#button').forEach((el) => {
	el.addEventListener('click', (e) => {
		const value = +(e.target.dataset.value)
		if (page + value < 1) {
			page = maxPage
		} else if (page + value > maxPage) {
			page = 1
		} else {
			page += value
		};
		document.querySelector('.thisPage').innerHTML = page;
		window.scroll({ top: 0, behavior: 'smooth' })
		cardGenerate(bd);
	});
});

document.querySelector('#pagenInput').addEventListener('change', (e) => {
	page = e.target.value;
	window.scroll({ top: 0, behavior: 'smooth' })
	cardGenerate(bd);
});

document.querySelectorAll('#sel').forEach((el) => {
	el.addEventListener('change', (e) => {
		let sortMas = [];
		let selectMas = []
		document.querySelectorAll('#sel').forEach((select) => {
			select.value != 0 ? sortMas.push(select.value) && selectMas.push(select) : '';
		});
		sortCard(sortMas, BD(), selectMas);
	});
});


