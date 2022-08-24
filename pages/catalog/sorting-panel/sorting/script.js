export default function sortingEvents(myJson, page) {

    // V: 2.0

    let arrAll = [],
        arrSuperfluous = []; // Массив лишних индексов

    for (let i = 0; i < myJson.tires.length; i++) { // Генерация всех индексов товаров
        arrAll.push(i)
    };

    let selectAll = document.getElementById('selectGroup'), // Группа селектов
        maxPrice = +(document.getElementById('MaxPriceCard').attributes.value.value),
        inputRangeValue = document.getElementById('MaxPriceCard').textContent;

    for (let i = 0; i < selectAll.children.length; i++) { // Добавление в массив не подходящих по значению
        let selectDataName = selectAll.children[i].dataset.name, // Тип , дата-name (brand , w , h , r ...) 
            selectValue = selectAll.children[i].children[0].children[0].children[2].value; // Получение value текущего select'a 

        if (selectValue != 0) {
            for (let z = 0; z < myJson.tires.length; z++) {
                if (myJson.tires[z][`${selectDataName}`] != selectValue) {
                    arrSuperfluous.push(z)
                };
            };
        };
    };

    if (+(inputRangeValue) != +(maxPrice)) {
        for (let z = 0; z < myJson.tires.length; z++) {
            if (+(myJson.tires[z].price) >= +(inputRangeValue)) {
                arrSuperfluous.push(z);
            };
        };
    };

    arrAll = arrAll.filter(e => !~arrSuperfluous.indexOf(e)); // Удаление ненужного

    console.log('delete :', arrSuperfluous); // Номера карточек которые удалятся
    console.log(arrAll); // Остатки , номера которые будут выводится

    const step = 10; // Число карточек на странице
    let PlaceGeneration = document.getElementById('Right'); // Место вывода карточек

    PlaceGeneration.innerHTML = ``; // Очищение от старых карточек

    page = +(document.getElementById('pagenPage').children[0].textContent); // Узнаём номер страницы

    for (let i = (page - 1) * step; i < page * step; i++) { // От и до какой карточки выводим

        if ((PlaceGeneration.children.length == step) || (i > arrAll.length - 1)) { // Условия при которых больше не выводим карточки
            break;
        };

        console.log(i, ':', arrAll[i]); // Номер карточки : номер по массиву

        let image;

        if (myJson.tires[`${arrAll[i]}`].image500x500) { // Выдача картинки если её нет
            image = myJson.tires[`${arrAll[i]}`].image500x500;
        } else {
            image = "images/no-image.png";
        };

        PlaceGeneration.innerHTML += /*html*/`
            <div class="catalog__cards-card catalog-card" name="${myJson.tires[`${arrAll[i]}`].name}" price="${myJson.tires[`${arrAll[i]}`].price}" stok="${myJson.tires[`${arrAll[i]}`].stock}" data-brand='${myJson.tires[`${arrAll[i]}`].brand}' data-ship='${myJson.tires[`${arrAll[i]}`].ship}' data-date_up='${myJson.tires[`${arrAll[i]}`].date_up}' data-season='${myJson.tires[`${arrAll[i]}`].season}' data-w='${myJson.tires[`${arrAll[i]}`].w}' data-h='${myJson.tires[`${arrAll[i]}`].h}' data-r='${myJson.tires[`${arrAll[i]}`].r}'>
                <div class="catalog-card__media-title"></div>
                <div class="catalog-card__body">
                    <div class="catalog-card__image">
                        <img src="${image}">
                    </div>
                    <div class="catalog-card__info card-info">
                        <div class="card-info__title"><a href="#">${myJson.tires[`${arrAll[i]}`].name}</a></div>
                        <div class="card-info__price">
                            <span>${+(myJson.tires[`${arrAll[i]}`].price)}</span> руб./шт.
                        </div>
                        <div class='catalog-card__dop card-dop CardDopInfo'>
                            <div class="card-dop__item">
                                Сезон:
                                <span>${myJson.tires[i].season}</span>
                            </div>
                            <div class="card-dop__item">
                                В наличии:
                                <span>${+(myJson.tires[`${arrAll[i]}`].stock)}</span>
                                шт.
                            </div>
                            <div class="card-dop__item">
                                Производитель:
                                <span>${myJson.tires[`${arrAll[i]}`].brand}</span>
                            </div>
                        </div>
                        <div class="card-info__buttons CardButtonAll">
                            <button class="card-info__button buyIn1Click" 
                                data-name="${myJson.tires[`${arrAll[i]}`].name}" 
                                data-price="${myJson.tires[`${arrAll[i]}`].price}" 
                                data-stock="${myJson.tires[`${arrAll[i]}`].stock}"
                                data-date_up="${myJson.tires[`${arrAll[i]}`].date_up}" 
                                data-season="${myJson.tires[`${arrAll[i]}`].season}"
                                data-image="${myJson.tires[`${arrAll[i]}`].image500x500}"
                                data-card_id="${myJson.tires[`${arrAll[i]}`].code}">
                                Купить в 1 клик
                            </button>
                            <button class="card-info__button addToCart" 
                                data-name="${myJson.tires[`${arrAll[i]}`].name}" 
                                data-price="${myJson.tires[`${arrAll[i]}`].price}" 
                                data-stock="${myJson.tires[`${arrAll[i]}`].stock}"
                                data-date_up="${myJson.tires[`${arrAll[i]}`].date_up}" 
                                data-season="${myJson.tires[`${arrAll[i]}`].season}"
                                data-image="${myJson.tires[`${arrAll[i]}`].image500x500}"
                                data-card_id="${myJson.tires[`${arrAll[i]}`].code}">
                                В корзину
                            </button>
                        </div>
                    </div>
                </div>
                <div class="catalog-card__media-buttons"></div>
            </div>
        `;
    };

    console.log('Count cards:', PlaceGeneration.children.length); // Количество карточек
};