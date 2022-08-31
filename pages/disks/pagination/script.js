function pagenInit(myJson, sortedArray) {

    // Объявления констант
    const step = 10,
        pagenPrev = document.querySelector('#pagenPrev'),
        pagenNext = document.querySelector('#pagenNext'),
        pagenInput = document.querySelector('#pagenInput'),
        pagenPage = document.querySelector('#pagenPage');

    let start = 0,
        end = step,
        activePage = end / step,
        fileLength = sortedArray.length,
        pages = Math.ceil(fileLength / step);

    // Проверка на цифру pagenPage
    changePagenPage(activePage, pages);

    newCardGenerate(myJson, start, end);

    // Вешаем события на кнопки
    pagenPrev.addEventListener('click', pagenPrevCards);
    pagenNext.addEventListener('click', pagenNextCards);

    // Проверка на активность кнопки пагинации
    cheakPagenPrev();
    cheakPagenNext();

    //<Functions>==============================================================================

    function newCardGenerate(myJson, start, end) {
        let PlaceGeneration = document.getElementById('Right');

        PlaceGeneration.innerHTML = '';

        for (let i = start; i < end; i++) {

            let image;

            if (sortedArray.length != 0) {
                if (i == fileLength - 1) {
                    if (myJson.disks[sortedArray[i]].imgProd) {
                        image = myJson.disks[sortedArray[i]].imgProd;
                    } else {
                        image = "images/no-image.png";
                    };
    
                    PlaceGeneration.innerHTML += /*html*/ `
                        <div class="catalog__cards-card catalog-card" name="${myJson.disks[sortedArray[i]].name}" price="${myJson.disks[sortedArray[i]].price}" stok="${myJson.disks[sortedArray[i]].stock}" data-brand='${myJson.disks[sortedArray[i]].brand}' data-date_up='${myJson.disks[sortedArray[i]].date_up}' data-w='${myJson.disks[sortedArray[i]].w}' data-r='${myJson.disks[sortedArray[i]].r}' data-b='${myJson.disks[sortedArray[i]].b}' data-color='${myJson.disks[sortedArray[i]].color}' data-type='${myJson.disks[sortedArray[i]].type}' data-supplier='${myJson.disks[sortedArray[i]].supplier}' data-city='${myJson.disks[sortedArray[i]].city}' data-pсd='${myJson.disks[sortedArray[i]].pсd}'>
                            <div class="catalog-card__media-title"></div>
                            <div class="catalog-card__body">
                                <div class="catalog-card__image">
                                    <img src="${image}">
                                </div>
                                <div class="catalog-card__info card-info">
                                    <div class="card-info__title"><a href="#">${myJson.disks[sortedArray[i]].name}</a></div>
                                    <div class="card-info__price">
                                        <span>${Number(myJson.disks[sortedArray[i]].price)}</span> руб./шт.
                                    </div>
                                    <div class='catalog-card__dop card-dop CardDopInfo'>
                                        <div class="card-dop__item">
                                            Цвет:
                                            <span>${myJson.disks[sortedArray[i]].color}</span>
                                        </div>
                                        <div class="card-dop__item">
                                            Тип:
                                            <span>${myJson.disks[sortedArray[i]].type}</span>
                                        </div>
                                        <div class="card-dop__item">
                                            В наличии:
                                            <span>${Number(myJson.disks[sortedArray[i]].stock)}</span>
                                            шт.
                                        </div>
                                    </div>
                                    <div class="card-info__buttons CardButtonAll">
                                        <button class="card-info__button buyIn1Click popup-opener" data-popup_open="#popup-offer"
                                            data-name="${myJson.disks[sortedArray[i]].name}" 
                                            data-price="${myJson.disks[sortedArray[i]].price}" 
                                            data-stock="${myJson.disks[sortedArray[i]].stock}"
                                            data-date_up="${myJson.disks[sortedArray[i]].date_up}" 
                                            data-color="${myJson.disks[sortedArray[i]].color}"
                                            data-type="${myJson.disks[sortedArray[i]].type}"
                                            data-image="${myJson.disks[sortedArray[i]].imgProd}"
                                            data-card_id="${myJson.disks[sortedArray[i]].code}">
                                            Купить в 1 клик
                                        </button>
                                        <button class="card-info__button addToCart" 
                                            data-name="${myJson.disks[sortedArray[i]].name}" 
                                            data-price="${myJson.disks[sortedArray[i]].price}" 
                                            data-stock="${myJson.disks[sortedArray[i]].stock}"
                                            data-date_up="${myJson.disks[sortedArray[i]].date_up}" 
                                            data-color="${myJson.disks[sortedArray[i]].color}"
                                            data-type="${myJson.disks[sortedArray[i]].type}"
                                            data-image="${myJson.disks[sortedArray[i]].imgProd}"
                                            data-card_id="${myJson.disks[sortedArray[i]].code}">
                                            В корзину
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="catalog-card__media-buttons"></div>
                        </div>
                    `;
                    break;
    
                } else {
                    if (myJson.disks[sortedArray[i]].imgProd) {
                        image = myJson.disks[sortedArray[i]].imgProd;
                    } else {
                        image = "images/no-image.png";
                    };
    
                    PlaceGeneration.innerHTML += /*html*/ `
                        <div class="catalog__cards-card catalog-card" name="${myJson.disks[sortedArray[i]].name}" price="${myJson.disks[sortedArray[i]].price}" stok="${myJson.disks[sortedArray[i]].stock}" data-brand='${myJson.disks[sortedArray[i]].brand}' data-date_up='${myJson.disks[sortedArray[i]].date_up}' data-w='${myJson.disks[sortedArray[i]].w}' data-r='${myJson.disks[sortedArray[i]].r}' data-b='${myJson.disks[sortedArray[i]].b}' data-color='${myJson.disks[sortedArray[i]].color}' data-type='${myJson.disks[sortedArray[i]].type}' data-supplier='${myJson.disks[sortedArray[i]].supplier}' data-city='${myJson.disks[sortedArray[i]].city}' data-pсd='${myJson.disks[sortedArray[i]].pсd}'>
                            <div class="catalog-card__media-title"></div>
                            <div class="catalog-card__body">
                                <div class="catalog-card__image">
                                    <img src="${image}">
                                </div>
                                <div class="catalog-card__info card-info">
                                    <div class="card-info__title"><a href="#">${myJson.disks[sortedArray[i]].name}</a></div>
                                    <div class="card-info__price">
                                        <span>${Number(myJson.disks[sortedArray[i]].price)}</span> руб./шт.
                                    </div>
                                    <div class='catalog-card__dop card-dop CardDopInfo'>
                                        <div class="card-dop__item">
                                            Цвет:
                                            <span>${myJson.disks[sortedArray[i]].color}</span>
                                        </div>
                                        <div class="card-dop__item">
                                            Тип:
                                            <span>${myJson.disks[sortedArray[i]].type}</span>
                                        </div>
                                        <div class="card-dop__item">
                                            В наличии:
                                            <span>${Number(myJson.disks[sortedArray[i]].stock)}</span>
                                            шт.
                                        </div>
                                    </div>
                                    <div class="card-info__buttons CardButtonAll">
                                        <button class="card-info__button buyIn1Click popup-opener" data-popup_open="#popup-offer"
                                            data-name="${myJson.disks[sortedArray[i]].name}" 
                                            data-price="${myJson.disks[sortedArray[i]].price}" 
                                            data-stock="${myJson.disks[sortedArray[i]].stock}"
                                            data-date_up="${myJson.disks[sortedArray[i]].date_up}" 
                                            data-color="${myJson.disks[sortedArray[i]].color}"
                                            data-type="${myJson.disks[sortedArray[i]].type}"
                                            data-image="${myJson.disks[sortedArray[i]].imgProd}"
                                            data-card_id="${myJson.disks[sortedArray[i]].code}">
                                            Купить в 1 клик
                                        </button>
                                        <button class="card-info__button addToCart" 
                                            data-name="${myJson.disks[sortedArray[i]].name}" 
                                            data-price="${myJson.disks[sortedArray[i]].price}" 
                                            data-stock="${myJson.disks[sortedArray[i]].stock}"
                                            data-date_up="${myJson.disks[sortedArray[i]].date_up}" 
                                            data-color="${myJson.disks[sortedArray[i]].color}"
                                            data-type="${myJson.disks[sortedArray[i]].type}"
                                            data-image="${myJson.disks[sortedArray[i]].imgProd}"
                                            data-card_id="${myJson.disks[sortedArray[i]].code}">
                                            В корзину
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="catalog-card__media-buttons"></div>
                        </div>
                    `;
                };
            } else {
                PlaceGeneration.innerHTML = /*html*/ `
                <div style="width: 100%; height: 100px; display: flex; align-items: center; justify-content: center;">
                    <div style="font-size: 1.1em; color: #333;">Ничего не найдено</div>
                </div>
                `;
            }
            
        };
    };

    function pagenPrevCards() {
        let startPosition;
        let endPosition;

        if (activePage == 1) {
            pagenPrev.classList.add('_pagen-disable');
        } else {
            if (pagenPrev.classList.contains('_pagen-disable')) {
                pagenPrev.classList.remove('_pagen-disable');
            }

            end = start;
            start -= step;
            startPosition = start;
            endPosition = end;
            activePage = end / step;

            newCardGenerate(myJson, startPosition, endPosition);
            settingCards();
            scrollToPosition(0);
        };

        // Проверка на активность кнопки пагинации 
        cheakPagenNext();
        cheakPagenPrev();

        // Проверка на цифру pagenPage
        changePagenPage(activePage, pages);
    };

    function pagenNextCards() {
        let startPosition;
        let endPosition;

        if (activePage == pages) {
            pagenNext.classList.add('_pagen-disable');
        } else {
            if (pagenNext.classList.contains('_pagen-disable')) {
                pagenNext.classList.remove('_pagen-disable');
            }

            start = end;
            end += step;
            startPosition = start;
            endPosition = end;
            activePage = end / step;

            newCardGenerate(myJson, startPosition, endPosition);
            settingCards();
            scrollToPosition(0);
        }

        // Проверка на активность кнопки пагинации 
        cheakPagenNext();
        cheakPagenPrev();

        // Проверка на цифру pagenPage
        changePagenPage(activePage, pages);
    };

    function changePagenPage(activePage, pages) {
        pagenPage.innerHTML = `<span>${activePage}</span>/<span>${pages}</span>`;
    };

    function cheakPagenPrev() {
        if (activePage == 1) {
            pagenPrev.classList.add('_pagen-disable');
        } else {
            if (pagenPrev.classList.contains('_pagen-disable')) {
                pagenPrev.classList.remove('_pagen-disable');
            }
        };
    }

    function cheakPagenNext() {
        if (activePage == pages) {
            pagenNext.classList.add('_pagen-disable');
        } else {
            if (pagenNext.classList.contains('_pagen-disable')) {
                pagenNext.classList.remove('_pagen-disable');
            }
        };
    }

    //</Functions>==============================================================================
};