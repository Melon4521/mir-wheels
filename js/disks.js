let sortedArray = [];

// <Получение JSON>==============================================================================

async function fetchAsync() {
    const response = await fetch("../api/disks-stage.json");
    return await response.json();
}

// </Получение JSON>==============================================================================

// <Document Actions>==============================================================================

document.addEventListener("click", function (e) {
    let targetElement = e.target;

    if (targetElement.classList.contains("sort-menu__find")) { // Кнопка "Подобрать"
        fetchAsync().then(function (myJson) {
            sortedArray = sortingEvents(myJson);
            pagenInit(myJson, sortedArray);
            settingCards();
        });
    }

    if (targetElement.classList.contains("sort-menu__reset")) { // Кнопка "Сбросить"
        fetchAsync().then(function (myJson) {
            sortedArray = reset(myJson);
            pagenInit(myJson, sortedArray);
            settingCards();
        });
    }

    if (targetElement.classList.contains("addToCart")) { // Кнопка "В корзину"
//        alert(
//            "Внимание! Сайт находится на стадии тестирования,\
//        пока что вы не сможете ничего купить!"
//        );
        add2Cart(targetElement);
    }

    if (targetElement.classList.contains("buyIn1Click")) { // Кнопка "Купить в 1 клик"
//        alert(
//            "Внимание! Сайт находится на стадии тестирования,\
//        пока что вы не сможете ничего купить!"
//        );
        buyIn1Click(targetElement);
    }

    if (targetElement.classList.contains("top-menu__cart")) { // Иконка корзины
        openCart();
    }

    if (targetElement.classList.contains("cartClearAll")) { // Кнопка "Очистить все" в корзине.
        clearAllItems();
    }

    if (targetElement.classList.contains("addCartItem")) { // Кнопка "Добавить" в корзине.
        addItem(targetElement);
    }

    if (targetElement.classList.contains("delCartItem")) { // Кнопка "Убрать" в корзине.
        deleteItem(targetElement);
    }

    if (targetElement.classList.contains("popup-opener")) { // Открытие popup-а.
        const dataAtribute = targetElement.dataset.popup_open;
        let popup = document.querySelector(dataAtribute);
        popupOpen(popup, e);
        e.preventDefault();
    }
});

// </Document Actions>==============================================================================

// Функция с JSON
fetchAsync().then(function (myJson) {
    // <Select Generation>==============================================================================

    selectGenerate(myJson);
    easydropdown.all();

    // </Select Generation>==============================================================================

    // <Sorting>==============================================================================

    sortedArray = sortingEvents(myJson);
    pagenInit(myJson, sortedArray);
    settingCards();

    // </Sorting>==============================================================================

    //<Pre-loader>==============================================================================

    setTimeout(() => {
        let pageLoading = document.querySelector(".page-loading");
        if (!pageLoading.classList.contains("_loaded")) {
            pageLoading.classList.add("_loaded");
            document.body.classList.remove("_lock");
        }
    }, 500);

    //</Pre-loader>==============================================================================
});

// <Shopping cart>==============================================================================

// Запрет на открытие "Оформления заказа", если корзина пуста.
if (cartData !== null) {
    if (cartMakeOffer.classList.contains("_none-cart-data")) {
        cartMakeOffer.classList.remove("_none-cart-data");
    }

    cartMakeOffer.classList.add("_has-cart-data");
} else {
    if (cartMakeOffer.classList.contains("_has-cart-data")) {
        cartMakeOffer.classList.remove("_has-cart-data");
    }

    cartMakeOffer.classList.add("_none-cart-data");
}

// Меняем показатель кол-ва товаров в корзине.
changeCartIconNumber();

// </Shopping cart>==============================================================================

//<FUNCTIONS>==============================================================================

function selectGenerate(myJson) {
    let selectAll = document.querySelectorAll('[data-sort="sel"]');
    for (let z = 0; z < selectAll.length; z++) {
        let arr = [];
        for (let i = 0; i < myJson.disks.length; i++) {
            arr.push(String(myJson.disks[i][selectAll[z].dataset.name]).trim());
        }
        arr = Array.from(new Set(arr)); // Удаление лишнего (повторов)
        if (selectAll[z].dataset.value != "max") {
            arr.sort((a, b) => a - b); // Сортировка по возрастанию
        } else {
            arr.sort((a, b) => b - a); // Сортировка по возрастанию
        }
        for (let i in arr) {
            if (arr[i]) {
                selectAll[z].innerHTML +=
                    /*html*/
                    `<option value='${arr[i]}'>${arr[i]}</option>`;
            }
        }
    }
}

function reset(myJson) {
    let arrAll = [];
    let selectAll = document.querySelectorAll('[data-sort="sel"]');
    for (let i = 0; i < myJson.disks.length; i++) {
        arrAll.push(i);
    }
    for (let i = 0; i < selectAll.length; i++) {
        arrLocal = [];
        for (let z = 0; z < selectAll[i].children.length; z++) {
            arrLocal.push(String(selectAll[i].children[z].value));
        }
        if (selectAll[i].dataset.value != "max") {
            arrLocal.sort((a, b) => a - b); // Сортировка по возрастанию
        } else {
            arrLocal.sort((a, b) => b - a); // Сортировка по возрастанию
        }
        selectAll[i].value = arrLocal[0];
    }
    return arrAll;
}

function sortingEvents(myJson) {
    let select = document.querySelectorAll('[data-sort="sel"]'),
        arrAll = [],
        arrSuperfluous = [];
    for (let i = 0; i < myJson.disks.length; i++) {
        // Генерация всех индексов товаров
        arrAll.push(i);
    }
    for (let i = 0; i < select.length; i++) {
        arrLocal = [];
        for (let z = 0; z < select[i].children.length; z++) {
            arrLocal.push(String(select[i].children[z].value));
        }
        if (select[i].dataset.value != "max") {
            arrLocal.sort((a, b) => a - b); // Сортировка по возрастанию
        } else {
            arrLocal.sort((a, b) => b - a); // Сортировка по возрастанию
        }
        let selectValueBefor = arrLocal[0],
            selectValueThis = select[i].value;
        if (selectValueBefor != selectValueThis) {
            for (let z = 0; z < myJson.disks.length; z++) {
                if (select[i].dataset.value != "min" && "max") {
                    if (myJson.disks[z][`${select[i].dataset.name}`] != selectValueThis) {
                        arrSuperfluous.push(z);
                    }
                } else {
                    if (select[i].dataset.value == "min") {
                        if (
                            +myJson.disks[z][`${select[i].dataset.name}`] <= +selectValueThis
                        ) {
                            arrSuperfluous.push(z);
                        }
                    } else {
                        if (
                            +myJson.disks[z][`${select[i].dataset.name}`] >= +selectValueThis
                        ) {
                            arrSuperfluous.push(z);
                        }
                    }
                }
            }
        }
    }
    arrAll = arrAll.filter((e) => !~arrSuperfluous.indexOf(e)); // Удаление ненужного
    return arrAll;
}

function settingCards() {
    let cardsDynamicAdaptive = () => {
        let cardButtons = document.querySelectorAll(".card-info__buttons"),
            cardTitles = document.querySelectorAll(".card-info__title");

        function doDynamicAvButtons() {
            cardButtons.forEach((cardButton) => {
                let cardInfo = cardButton.closest(".catalog-card__info");
                let cardInfoBody = cardInfo.closest(".catalog-card__body");
                let cardButtonsNewParent = cardInfoBody.nextElementSibling;
                cardButton.remove(cardInfo);
                cardButtonsNewParent.append(cardButton);
            });
        }

        function doDynamicAvTitles() {
            cardTitles.forEach((cardTitle) => {
                let cardInfo = cardTitle.closest(".catalog-card__info");
                let cardInfoBody = cardInfo.closest(".catalog-card__body");
                let cardInfoBodyParent = cardInfoBody.parentElement;
                let cardTitlesNewParent = cardInfoBodyParent.querySelector(
                    ".catalog-card__media-title"
                );
                cardTitle.remove(cardInfo);
                cardTitlesNewParent.append(cardTitle);
            });
        }

        doDynamicAvButtons();
        doDynamicAvTitles();
    };

    if (window.innerWidth <= 600) {
        cardsDynamicAdaptive();
    }
}

//</FUNCTIONS>==============================================================================