import settingCards from '../cards/script.js';

export default function pagenInit(myJson, sortedArray) {
    // Объявления констант
    const step = 10,
        pagenPrev = document.querySelector('#pagenPrev'),
        pagenNext = document.querySelector('#pagenNext'),
        pagenInput = document.querySelector('#pagenInput'),
        pagenPage = document.querySelector('#pagenPage');

    let start = 0,
        end = step,
        activePage = end / step,
        fileLength,
        pages;

    if (sortedArray !== undefined) {
        fileLength = sortedArray.length,
        pages = Math.ceil(fileLength / step);

    } else {
        console.log(sortedArray);
        fileLength = myJson.tires.length,
        pages = Math.ceil(fileLength / step);
    }

    // Вешаем события на кнопки
    pagenPrev.addEventListener('click', pagenPrevCards);
    pagenNext.addEventListener('click', pagenNextCards);

    // Проверка на цифру pagenPage
    pagenPage.innerHTML = `<span>${activePage}</span>/<span>${pages}</span>`;

    newCardGenerate(myJson, start, end);

    // Проверка на активность кнопки пагинации
    if (start == 0) {
        pagenPrev.classList.add('_pagen-disable');
        pagenPrev.removeEventListener('click', pagenPrevCards);
    } else {
        if (pagenPrev.classList.contains('_pagen-disable')) {
            pagenPrev.classList.remove('_pagen-disable');
            pagenPrev.addEventListener('click', pagenPrevCards);
        }
    };

    if (end >= fileLength) {
        pagenNext.classList.add('_pagen-disable');
        pagenNext.removeEventListener('click', pagenNextCards);
    } else {
        if (pagenNext.classList.contains('_pagen-disable')) {
            pagenNext.classList.remove('_pagen-disable');
            pagenNext.addEventListener('click', pagenNextCards);
        }
    };

    //<Functions>==============================================================================
    
    function newCardGenerate(myJson, start, end) {
        let PlaceGeneration = document.getElementById('Right');
    
        PlaceGeneration.innerHTML = '';
    
        for (let i = start; i < end; i++) {
    
            let image;
    
            if (i > myJson.tires.length-1) {
                break;
            };

            if (myJson.tires[i].image500x500) {
                image = myJson.tires[i].image500x500;
            } else {
                image = "images/no-image.png";
            };
    
            PlaceGeneration.innerHTML += /*html*/ `
                <div class="catalog__cards-card catalog-card" name="${myJson.tires[i].name}" price="${myJson.tires[i].price}" stok="${myJson.tires[i].stock}" data-brand='${myJson.tires[i].brand}' data-ship='${myJson.tires[i].ship}' data-date_up='${myJson.tires[i].date_up}' data-season='${myJson.tires[i].season}' data-w='${myJson.tires[i].w}' data-h='${myJson.tires[i].h}' data-r='${myJson.tires[i].r}'>
                    <div class="catalog-card__media-title"></div>
                    <div class="catalog-card__body">
                        <div class="catalog-card__image">
                            <img src="${image}">
                        </div>
                        <div class="catalog-card__info card-info">
                            <div class="card-info__title"><a href="#">${myJson.tires[i].name}</a></div>
                            <div class="card-info__price">
                                <span>${Number(myJson.tires[i].price)}</span> руб./шт.
                            </div>
                            <div class='catalog-card__dop card-dop CardDopInfo'>
                                <div class="card-dop__item">
                                    Сезон:
                                    <span>${myJson.tires[i].season}</span>
                                </div>
                                <div class="card-dop__item">
                                    В наличии:
                                    <span>${Number(myJson.tires[i].stock)}</span>
                                    шт.
                                </div>
                                <div class="card-dop__item">
                                    Производитель:
                                    <span>${myJson.tires[i].brand}</span>
                                </div>
                            </div>
                            <div class="card-info__buttons CardButtonAll">
                                <button class="card-info__button buyIn1Click" 
                                    data-name="${myJson.tires[i].name}" 
                                    data-price="${myJson.tires[i].price}" 
                                    data-stock="${myJson.tires[i].stock}"
                                    data-date_up="${myJson.tires[i].date_up}" 
                                    data-season="${myJson.tires[i].season}"
                                    data-image="${myJson.tires[i].image500x500}"
                                    data-card_id="${myJson.tires[i].code}">
                                    Купить в 1 клик
                                </button>
                                <button class="card-info__button addToCart" 
                                    data-name="${myJson.tires[i].name}" 
                                    data-price="${myJson.tires[i].price}" 
                                    data-stock="${myJson.tires[i].stock}"
                                    data-date_up="${myJson.tires[i].date_up}" 
                                    data-season="${myJson.tires[i].season}"
                                    data-image="${myJson.tires[i].image500x500}"
                                    data-card_id="${myJson.tires[i].code}">
                                    В корзину
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="catalog-card__media-buttons"></div>
                </div>
            `;
        };
    };

    function newSortedCardGenerate(myJson, sortedArray, start, end) {
        let PlaceGeneration = document.getElementById('Right');
    
        PlaceGeneration.innerHTML = '';
    
        for (let i = start; i < end; i++) {
            const sortedElem = sortedArray[i];
            let image;
    
            if (sortedElem > sortedArray.length-1) {
                break;
            };

            console.log(sortedArray);

            if (myJson.tires[sortedElem].image500x500) {
                image = myJson.tires[sortedElem].image500x500;
            } else {
                image = "images/no-image.png";
            };
    
            PlaceGeneration.innerHTML += /*html*/ `
                <div class="catalog__cards-card catalog-card" name="${myJson.tires[sortedElem].name}" price="${myJson.tires[sortedElem].price}" stok="${myJson.tires[sortedElem].stock}" data-brand='${myJson.tires[sortedElem].brand}' data-ship='${myJson.tires[sortedElem].ship}' data-date_up='${myJson.tires[sortedElem].date_up}' data-season='${myJson.tires[sortedElem].season}' data-w='${myJson.tires[sortedElem].w}' data-h='${myJson.tires[sortedElem].h}' data-r='${myJson.tires[sortedElem].r}'>
                    <div class="catalog-card__media-title"></div>
                    <div class="catalog-card__body">
                        <div class="catalog-card__image">
                            <img src="${image}">
                        </div>
                        <div class="catalog-card__info card-info">
                            <div class="card-info__title"><a href="#">${myJson.tires[sortedElem].name}</a></div>
                            <div class="card-info__price">
                                <span>${Number(myJson.tires[sortedElem].price)}</span> руб./шт.
                            </div>
                            <div class='catalog-card__dop card-dop CardDopInfo'>
                                <div class="card-dop__item">
                                    Сезон:
                                    <span>${myJson.tires[sortedElem].season}</span>
                                </div>
                                <div class="card-dop__item">
                                    В наличии:
                                    <span>${Number(myJson.tires[sortedElem].stock)}</span>
                                    шт.
                                </div>
                                <div class="card-dop__item">
                                    Производитель:
                                    <span>${myJson.tires[sortedElem].brand}</span>
                                </div>
                            </div>
                            <div class="card-info__buttons CardButtonAll">
                                <button class="card-info__button buyIn1Click" 
                                    data-name="${myJson.tires[sortedElem].name}" 
                                    data-price="${myJson.tires[sortedElem].price}" 
                                    data-stock="${myJson.tires[sortedElem].stock}"
                                    data-date_up="${myJson.tires[sortedElem].date_up}" 
                                    data-season="${myJson.tires[sortedElem].season}"
                                    data-image="${myJson.tires[sortedElem].image500x500}"
                                    data-card_id="${myJson.tires[sortedElem].code}">
                                    Купить в 1 клик
                                </button>
                                <button class="card-info__button addToCart" 
                                    data-name="${myJson.tires[sortedElem].name}" 
                                    data-price="${myJson.tires[sortedElem].price}" 
                                    data-stock="${myJson.tires[sortedElem].stock}"
                                    data-date_up="${myJson.tires[sortedElem].date_up}" 
                                    data-season="${myJson.tires[sortedElem].season}"
                                    data-image="${myJson.tires[sortedElem].image500x500}"
                                    data-card_id="${myJson.tires[sortedElem].code}">
                                    В корзину
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="catalog-card__media-buttons"></div>
                </div>
            `;
        };
    };

    function pagenPrevCards() {
        let startPosition;
        let endPosition;

        if (sortedArray !== undefined) {
            console.log('1');
            if (start == 0) {
                pagenPrev.classList.add('_pagen-disable');
                pagenPrev.removeEventListener('click', pagenPrevCards);
            } else {
                if (pagenPrev.classList.contains('_pagen-disable')) {
                    pagenPrev.classList.remove('_pagen-disable');
                    pagenPrev.addEventListener('click', pagenPrevCards);
                }
    
                end = start;
                start -= step;
                startPosition = start;
                endPosition = end;
                activePage = end / step;
    
                newSortedCardGenerate(myJson, sortedArray, startPosition, endPosition);
                settingCards();
                scrollToPosition(0);
            };
        } else {
            if (start == 0) {
                pagenPrev.classList.add('_pagen-disable');
                pagenPrev.removeEventListener('click', pagenPrevCards);
            } else {
                if (pagenPrev.classList.contains('_pagen-disable')) {
                    pagenPrev.classList.remove('_pagen-disable');
                    pagenPrev.addEventListener('click', pagenPrevCards);
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
        }

        // Проверка на активность кнопки пагинации
        if (start == 0) {
            pagenPrev.classList.add('_pagen-disable');
            pagenPrev.removeEventListener('click', pagenPrevCards);
        } else {
            if (pagenPrev.classList.contains('_pagen-disable')) {
                pagenPrev.classList.remove('_pagen-disable');
                pagenPrev.addEventListener('click', pagenPrevCards);
            }
        };

        if (end >= myJson.tires.length) {
            pagenNext.classList.add('_pagen-disable');
            pagenNext.removeEventListener('click', pagenNextCards);
        } else {
            if (pagenNext.classList.contains('_pagen-disable')) {
                pagenNext.classList.remove('_pagen-disable');
                pagenNext.addEventListener('click', pagenNextCards);
            }
        };

        // Проверка на цифру pagenPage
        pagenPage.innerHTML = `${activePage}/${pages}`;
    };

    function pagenNextCards() {
        let startPosition;
        let endPosition;

        if (sortedArray !== undefined) {
            console.log('1');
            if (end >= myJson.tires.length) {
                pagenNext.classList.add('_pagen-disable');
                pagenNext.removeEventListener('click', pagenNextCards);
            } else {
                if (pagenNext.classList.contains('_pagen-disable')) {
                    pagenNext.classList.remove('_pagen-disable');
                    pagenNext.addEventListener('click', pagenNextCards);
                }
    
                start = end;
                end += step;
                startPosition = start;
                endPosition = end;
                activePage = end / step;
    
                newSortedCardGenerate(myJson, sortedArray, startPosition, endPosition);
                settingCards();
                scrollToPosition(0);
            };
        } else {
            if (end >= myJson.tires.length) {
                pagenNext.classList.add('_pagen-disable');
                pagenNext.removeEventListener('click', pagenNextCards);
            } else {
                if (pagenNext.classList.contains('_pagen-disable')) {
                    pagenNext.classList.remove('_pagen-disable');
                    pagenNext.addEventListener('click', pagenNextCards);
                }
    
                start = end;
                end += step;
                startPosition = start;
                endPosition = end;
                activePage = end / step;
    
                newCardGenerate(myJson, startPosition, endPosition);
                settingCards();
                scrollToPosition(0);
            };
        }
        

        // Проверка на активность кнопки пагинации 
        if (start == 0) {
            pagenPrev.classList.add('_pagen-disable');
            pagenPrev.removeEventListener('click', pagenPrevCards);
        } else {
            if (pagenPrev.classList.contains('_pagen-disable')) {
                pagenPrev.classList.remove('_pagen-disable');
                pagenPrev.addEventListener('click', pagenPrevCards);
            }
        };

        if (end >= myJson.tires.length) {
            pagenNext.classList.add('_pagen-disable');
            pagenNext.removeEventListener('click', pagenNextCards);
        } else {
            if (pagenNext.classList.contains('_pagen-disable')) {
                pagenNext.classList.remove('_pagen-disable');
                pagenNext.addEventListener('click', pagenNextCards);
            }
        };

        // Проверка на цифру pagenPage
        pagenPage.innerHTML = `${activePage}/${pages}`;
    };

    for (let i = 0; i<elements.length; i++) {
        const elem = elements[i];
    }

    obj.addEventListener('click', function (e) {
        
    });

    //</Functions>==============================================================================
};