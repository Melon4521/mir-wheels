function pagenInit(myJson, sortedArray) {
    // Объявления констант
    const step = 10,
        pagenParent = document.querySelector('.catalog-pagen'),
        pagenInput = document.querySelector('#pagenInput'),
        pagenPage = document.querySelector('#pagenPage'),
        pagenPrev = document.querySelector('#pagenPrev'),
        pagenNext = document.querySelector('#pagenNext');

    let fileLength,
        pages,
        activePage = 1;

    // Проверка длины массива
    if (sortedArray.length != 0) {
        fileLength = sortedArray.length;
    } else {
        fileLength = 1;
    }

    pages = Math.ceil(fileLength / step),

    // Проверка на цифру pagenPage
    changePagenPage(activePage, pages);

    newCardGenerate(myJson, activePage);

    pagenParent.addEventListener('click', (e) => {
        let targetElement = e.target;

        if (targetElement.classList.contains('pagen-buttons__input-btn')) {
            pagenInputFunc();
        }
    });

    // Вешаем события на кнопки
    pagenPrev.addEventListener('click', pagenPrevCards);
    pagenNext.addEventListener('click', pagenNextCards);
    pagenInput.onkeyup = function () {
        this.value = this.value.replace(/[^\d]/g,'');

        if (+(this.max) < this.value) {
            this.value = this.max;
        };
    };

    // Проверка на активность кнопки пагинации
    cheakPagenPrev();
    cheakPagenNext();

    //<Functions>==============================================================================

    function newCardGenerate(myJson, activePage) {
        let PlaceGeneration = document.getElementById('Right');

        PlaceGeneration.innerHTML = '';

        for (let i = ((activePage - 1) * step); i < (activePage * step); i++) {

            let image;

            if (sortedArray.length != 0) {
                if (i == fileLength-1) {
                    if (myJson.tires[sortedArray[i]].image500x500) {
                        image = myJson.tires[sortedArray[i]].image500x500;
                    } else {
                        image = "images/no-image.png";
                    };
        
                    PlaceGeneration.innerHTML += /*html*/ `
                        <div class="catalog__cards-card catalog-card" name="${myJson.tires[sortedArray[i]].name}" price="${myJson.tires[sortedArray[i]].price}" stok="${myJson.tires[sortedArray[i]].stock}" data-brand='${myJson.tires[sortedArray[i]].brand}' data-ship='${myJson.tires[sortedArray[i]].ship}' data-date_up='${myJson.tires[sortedArray[i]].date_up}' data-season='${myJson.tires[sortedArray[i]].season}' data-w='${myJson.tires[sortedArray[i]].w}' data-h='${myJson.tires[sortedArray[i]].h}' data-r='${myJson.tires[sortedArray[i]].r}'>
                            <div class="catalog-card__media-title"></div>
                            <div class="catalog-card__body">
                                <div class="catalog-card__image">
                                    <img src="${image}">
                                </div>
                                <div class="catalog-card__info card-info">
                                    <div class="card-info__title"><a href="#">${myJson.tires[sortedArray[i]].name}</a></div>
                                    <div class="card-info__price">
                                        <span>${Number(myJson.tires[sortedArray[i]].price)}</span> руб./шт.
                                    </div>
                                    <div class='catalog-card__dop card-dop CardDopInfo'>
                                        <div class="card-dop__item">
                                            Сезон:
                                            <span>${myJson.tires[sortedArray[i]].season}</span>
                                        </div>
                                        <div class="card-dop__item">
                                            В наличии:
                                            <span>${Number(myJson.tires[sortedArray[i]].stock)}</span>
                                            шт.
                                        </div>
                                        <div class="card-dop__item">
                                            Производитель:
                                            <span>${myJson.tires[sortedArray[i]].brand}</span>
                                        </div>
                                    </div>
                                    <div class="card-info__buttons CardButtonAll">
                                        <button class="card-info__button buyIn1Click popup-opener" data-popup_open="#popup-offer"
                                            data-name="${myJson.tires[sortedArray[i]].name}" 
                                            data-price="${myJson.tires[sortedArray[i]].price}" 
                                            data-stock="${myJson.tires[sortedArray[i]].stock}"
                                            data-date_up="${myJson.tires[sortedArray[i]].date_up}" 
                                            data-season="${myJson.tires[sortedArray[i]].season}"
                                            data-image="${myJson.tires[sortedArray[i]].image500x500}"
                                            data-card_id="${myJson.tires[sortedArray[i]].code}">
                                            Купить в 1 клик
                                        </button>
                                        <button class="card-info__button addToCart" 
                                            data-name="${myJson.tires[sortedArray[i]].name}" 
                                            data-price="${myJson.tires[sortedArray[i]].price}" 
                                            data-stock="${myJson.tires[sortedArray[i]].stock}"
                                            data-date_up="${myJson.tires[sortedArray[i]].date_up}" 
                                            data-season="${myJson.tires[sortedArray[i]].season}"
                                            data-image="${myJson.tires[sortedArray[i]].image500x500}"
                                            data-card_id="${myJson.tires[sortedArray[i]].code}">
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
                    if (myJson.tires[sortedArray[i]].image500x500) {
                        image = myJson.tires[sortedArray[i]].image500x500;
                    } else {
                        image = "images/no-image.png";
                    };
        
                    PlaceGeneration.innerHTML += /*html*/ `
                        <div class="catalog__cards-card catalog-card" name="${myJson.tires[sortedArray[i]].name}" price="${myJson.tires[sortedArray[i]].price}" stok="${myJson.tires[sortedArray[i]].stock}" data-brand='${myJson.tires[sortedArray[i]].brand}' data-ship='${myJson.tires[sortedArray[i]].ship}' data-date_up='${myJson.tires[sortedArray[i]].date_up}' data-season='${myJson.tires[sortedArray[i]].season}' data-w='${myJson.tires[sortedArray[i]].w}' data-h='${myJson.tires[sortedArray[i]].h}' data-r='${myJson.tires[sortedArray[i]].r}'>
                            <div class="catalog-card__media-title"></div>
                            <div class="catalog-card__body">
                                <div class="catalog-card__image">
                                    <img loading="lazy" src="${image}">
                                </div>
                                <div class="catalog-card__info card-info">
                                    <div class="card-info__title"><a href="#">${myJson.tires[sortedArray[i]].name}</a></div>
                                    <div class="card-info__price">
                                        <span>${Number(myJson.tires[sortedArray[i]].price)}</span> руб./шт.
                                    </div>
                                    <div class='catalog-card__dop card-dop CardDopInfo'>
                                        <div class="card-dop__item">
                                            Сезон:
                                            <span>${myJson.tires[sortedArray[i]].season}</span>
                                        </div>
                                        <div class="card-dop__item">
                                            В наличии:
                                            <span>${Number(myJson.tires[sortedArray[i]].stock)}</span>
                                            шт.
                                        </div>
                                        <div class="card-dop__item">
                                            Производитель:
                                            <span>${myJson.tires[sortedArray[i]].brand}</span>
                                        </div>
                                    </div>
                                    <div class="card-info__buttons CardButtonAll">
                                        <button class="card-info__button buyIn1Click popup-opener" data-popup_open="#popup-offer"
                                            data-name="${myJson.tires[sortedArray[i]].name}" 
                                            data-price="${myJson.tires[sortedArray[i]].price}" 
                                            data-stock="${myJson.tires[sortedArray[i]].stock}"
                                            data-date_up="${myJson.tires[sortedArray[i]].date_up}" 
                                            data-season="${myJson.tires[sortedArray[i]].season}"
                                            data-image="${myJson.tires[sortedArray[i]].image500x500}"
                                            data-card_id="${myJson.tires[sortedArray[i]].code}">
                                            Купить в 1 клик
                                        </button>
                                        <button class="card-info__button addToCart" 
                                            data-name="${myJson.tires[sortedArray[i]].name}" 
                                            data-price="${myJson.tires[sortedArray[i]].price}" 
                                            data-stock="${myJson.tires[sortedArray[i]].stock}"
                                            data-date_up="${myJson.tires[sortedArray[i]].date_up}" 
                                            data-season="${myJson.tires[sortedArray[i]].season}"
                                            data-image="${myJson.tires[sortedArray[i]].image500x500}"
                                            data-card_id="${myJson.tires[sortedArray[i]].code}">
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
        if (activePage == 1) {
            pagenPrev.classList.add('_pagen-disable');
        } else {
            if (pagenPrev.classList.contains('_pagen-disable')) {
                pagenPrev.classList.remove('_pagen-disable');
            }

            activePage--;
            newCardGenerate(myJson, activePage);
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
        if (activePage == pages) {
            pagenNext.classList.add('_pagen-disable');
        } else {
            if (pagenNext.classList.contains('_pagen-disable')) {
                pagenNext.classList.remove('_pagen-disable');
            }

            activePage++;
            newCardGenerate(myJson, activePage);
            settingCards();
            scrollToPosition(0);
        };

        // Проверка на активность кнопки пагинации 
        cheakPagenNext();
        cheakPagenPrev();

        // Проверка на цифру pagenPage
        changePagenPage(activePage, pages);
    };

    function pagenInputFunc() {
        // if (pagenInput.value < 1 || pagenInput.value > pages) {
        //     if (!pagenInput.classList.contains('_input-error')) {
        //             pagenInput.classList.add('_input-error')
        //     };
        // } else {
        //     if (pagenInput.classList.contains('_input-error')) {
        //         pagenInput.classList.remove('_input-error')
        //     };

        //     activePage = pagenInput.value;
        //     pagenInput.value = '';
        //     newCardGenerate(myJson, activePage);
        //     changePagenPage(activePage, pages);
        //     cheakPagenNext();
        //     cheakPagenPrev();
        //     scrollToPosition(0);
        // };

        if (pagenInput.value < 1) {
            pagenInput.value = 1;
        } else if (pagenInput.value > pages) {
            pagenInput.value = pagenInput.max;
        };
        
        activePage = pagenInput.value;
        pagenInput.value = '';
        newCardGenerate(myJson, activePage);
        changePagenPage(activePage, pages);
        cheakPagenNext();
        cheakPagenPrev();
        scrollToPosition(0);
    };

    function changePagenPage(activePage, pages) {
        let newStr = '';
        let newArray = [];

        for (let i = 0; i < activePage.length; i++) {
            const elem = activePage[i];
            newArray.push(elem);
        };

        for (let i = 0; i < newArray.length; i++) {
            let elem = newArray[i];

            if (elem == '0') {
                delete newArray[i];
            } else {
                break;
            }
        };

        newArray.forEach(elem => {
            newStr += elem;
        });

        if (newStr == '') {
            newStr = activePage;
        };

        pagenPage.innerHTML = `<span>${newStr}</span>/<span>${pages}</span>`;
        pagenInput.max = pages;
    };

    function cheakPagenPrev() {
        if (activePage == 1) {
            pagenPrev.classList.add('_pagen-disable');
        } else {
            if (pagenPrev.classList.contains('_pagen-disable')) {
                pagenPrev.classList.remove('_pagen-disable');
            }
        };
    };

    function cheakPagenNext() {
        if (activePage == pages) {
            pagenNext.classList.add('_pagen-disable');
        } else {
            if (pagenNext.classList.contains('_pagen-disable')) {
                pagenNext.classList.remove('_pagen-disable');
            }
        };
    };

    //</Functions>==============================================================================
};