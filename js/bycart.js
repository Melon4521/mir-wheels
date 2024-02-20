import { BD } from './togle.js';

let bd = BD(namePage);

const dom = document.querySelector('#Right');
let page = 1; // Номер 1-ой страницы
const cntCardsOnPage = 10; // количество карточек на странице
let maxPage = Math.ceil(bd.length / cntCardsOnPage); // Максимум карточек на странице, считаем от общего кол-ва всех карт
document.querySelector('#pagenInput').max = maxPage; 
document.querySelector('.lastPage').innerHTML = maxPage;
const sliders = document.querySelectorAll('#sel[data-value]'); // Массив всех Inpute
let base = localStorage.getItem('shopping-cart') ? JSON.parse(localStorage.getItem('shopping-cart')) : []; // Корзина

// Заполнение SELECT фильтром поиска
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
			masElement[i].dataset.start = masValue[i][0];
			
			masElement[i].innerHTML += masValue[i]
			.map((value) => `<option value="${value}">${value}</option>`)
			.join('');
			
	});
}

// Генерация карточки
function cardGenerate(tires) {
	const start = (page - 1) * cntCardsOnPage;
	const end = page * cntCardsOnPage;
	dom.innerHTML = '';

	let cardHtml = '';

	for (let i = start; i < end; i++) {
		if (!tires[i]) break;
		let item = tires[i];
		item['cnt'] = (base.find(el => el.name === item.name) ? base.find(el => el.name === item.name).cnt : 0);
		item['typeItem'] = namePage;
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
                        <div class="info-header__details"><span>${(namePage == "disks" ? `Цвет: </span>${item.color}` : `Производител: </span>${item.supplier}`)}</div>
                        <div class="info-header__details"><span>${(namePage == "disks" ? `Тип: </span>${item.type}` : `Сезон: </span>${item.season}`)}</div>
                        <div class="info-header__details"><span>Дата производства: </span>${item.date_up}</div>
                        <div class="info-header__details _details-stock"><span>В наличии: </span>${item.stock}</div>
                    </div>
                    <div class="cart-card__info-footer info-footer">
                        <div class="info-footer__cart-left"><span>В корзине: </span>${item.cnt}</div>
                        <div class="info-footer__func-btns">
                            <button class="info-footer__func-btn addCartItem" data-id='${JSON.stringify(item)}'>Добавить</button>
                            <button class="info-footer__func-btn delCartItem" data-id='${JSON.stringify(item)}'>Убрать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
		cardHtml += card;
	}
	dom.innerHTML = cardHtml;
	addClick();
}

// Обновляет значение количества товаров в корзине
function updateCart(item, action) {
    let index = base.findIndex(el => el.name === item.name);
	
    if (index === -1 && action === 'add') {
		item.cnt = 1;
        base.push(item);
    } else if (index !== -1 && action === 'add') {
        if (base[index].cnt + 1 > +item.stock) {
            alert('Невозможно заказать больше чем есть в наличии');
        } else {
            base[index].cnt += 1;
        }
    } else if (index !== -1 && action === 'delete') {
        if (base[index].cnt > 1) {
            base[index].cnt -= 1;
        } else {
            base.splice(index, 1);
        }
    }

	index = base.findIndex(el => el.name === item.name);

	for (const e of document.querySelectorAll(`.cart-card`)) {
		if (e.querySelector('.info-header__title').textContent == item.name){
			if (!!base[index]){
				e.querySelector('.info-footer__cart-left').innerHTML = /*html*/`
					<span>В корзине: </span> ${base[index].cnt}
				`;
			} else {
				e.querySelector('.info-footer__cart-left').innerHTML = /*html*/`
					<span>В корзине: </span>  0
				`;
			}
			break;
		}
	}

    localStorage.setItem('shopping-cart', JSON.stringify(base));
}

// Для новых карточек подключаем добавление в корзину
function addClick () {
	document.querySelectorAll('.addCartItem').forEach((el) => {
		el.addEventListener('click', (e) => {
			let item = JSON.parse(e.target.dataset.id);
			updateCart(item, 'add');
		});
	});

	document.querySelectorAll('.delCartItem').forEach((el) => {
		el.addEventListener('click', (e) => {
			let item = JSON.parse(e.target.dataset.id);
			updateCart(item, 'delete');
		});
	});
}

// Сортирует по базе данных
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
			if (selectMas[sortMas.indexOf(type)].dataset.type !== 'et') {
				if (Object.values(el).indexOf(type) !== -1) {
					value++;
				}
			} else {
				if (selectMas[sortMas.indexOf(type)].dataset.start != selectMas[sortMas.indexOf(type)].value ){
					
					const select = selectMas[sortMas.indexOf(type)];
					const valueType = select.dataset.value;
					const selectValue = +select.value;
					const elPrice = +el[select.dataset.type];
					
					if ((valueType === 'max' && elPrice < selectValue) || (valueType === 'min' && elPrice >= selectValue)) {
						value++;
					}
				} else {
					value ++;
				}
			}
		});
		if (value === sortMas.length) {
		  MasSort.push(el);
		}
	  });

	bd = MasSort;
	maxPage = Math.ceil(bd.length / cntCardsOnPage);
	document.querySelector('#pagenInput').max = maxPage;
	document.querySelector('.lastPage').innerHTML = maxPage;
	page = (maxPage != 0 ? 1 : 0);
	cardGenerate(bd);
}

selectGenerate(bd);

cardGenerate(bd);

// Изменение номера страницы
document.querySelectorAll('#button').forEach((el) => {
	el.addEventListener('click', (e) => {
		const value = +(e.target.dataset.value)
		if (page + value < 1) {
			page = maxPage
		} else if (page + value > maxPage) {
			page = (maxPage != 0 ? 1 : 0)
		} else {
			page += value
		};
		document.querySelector('.thisPage').innerHTML = page;
		window.scroll({ top: 0, behavior: 'smooth' })
		cardGenerate(bd);
	});
});

// Поле ввода намера страницы 
document.querySelector('#pagenInput').addEventListener('change', (e) => {
	page = e.target.value;
	window.scroll({ top: 0, behavior: 'smooth' })
	cardGenerate(bd);
});

// Собираем данные для сортировки по значениям select
document.querySelectorAll('#sel').forEach((el) => {
	el.addEventListener('change', (e) => {
		let sortMas = [];
		let selectMas = []
		document.querySelectorAll('#sel').forEach((select) => {
			select.value != 0 ? sortMas.push(select.value) && selectMas.push(select) : '';
		});
		sortCard(sortMas, BD(namePage), selectMas);
	});
});

// min max
if (!!sliders.length) {
	sliders[0].addEventListener('input', (e) => {
	if(+sliders[0].value > +sliders[1].value){
		sliders[1].value = +sliders[0].value;
	}
	});

	sliders[1].addEventListener('input', (e) => {
	if(+sliders[1].value < +sliders[0].value){
		sliders[0].value = +sliders[1].value;
	}
	});
}