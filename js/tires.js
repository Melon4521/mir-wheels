let sortedArray = [];

// <Получение JSON>==============================================================================

async function fetchAsync() {
    const response = await fetch('../api/tires-stage.json');
    return await response.json();
};

// </Получение JSON>==============================================================================

// <Document Actions>==============================================================================

document.addEventListener('click', function (e) {
    let targetElement = e.target;

    if (targetElement.classList.contains('sort-menu__find')) { // Кнопка "Подобрать"
        fetchAsync().then(function (myJson) {
            sortedArray = sortingEvents(myJson);
            pagenInit(myJson, sortedArray);
            settingCards();
        })
    }
    
    if (targetElement.classList.contains('sort-menu__reset')) { // Кнопка "Сбросить"
        fetchAsync().then(function (myJson) {
            sortedArray = reset(myJson);
            pagenInit(myJson, sortedArray);
            settingCards();
        })
    } 
    
    if (targetElement.classList.contains('addToCart')) { // Кнопка "В корзину"
        alert("Внимание! Сайт находится на стадии тестирования,\
        пока что вы не сможете ничего купить!")
        add2Cart(targetElement);
    } 
    
    if (targetElement.classList.contains('buyIn1Click')) { // Кнопка "Купить в 1 клик"
        alert("Внимание! Сайт находится на стадии тестирования,\
        пока что вы не сможете ничего купить!")
        buyIn1Click(targetElement);
    } 
    
    if (targetElement.classList.contains('top-menu__cart')) { // Иконка корзины
        openCart();
    } 
    
    if (targetElement.classList.contains('cartClearAll')) { // Кнопка "Очистить все" в корзине.
        clearAllItems();
    } 
    
    if (targetElement.classList.contains('addCartItem')) { // Кнопка "Добавить" в корзине.
        addItem(targetElement);
    } 
    
    if (targetElement.classList.contains('delCartItem')) { // Кнопка "Убрать" в корзине.
        deleteItem(targetElement);
    } 
    
    if (targetElement.classList.contains('popup-opener')) { // Открытие popup-а.
        const dataAtribute = targetElement.dataset.popup_open;
        let popup = document.querySelector(dataAtribute);
        popupOpen(popup, e);
        e.preventDefault();
    }
});

// </Document Actions>==============================================================================

// Меняем maxPrice по ползунку
// document.getElementById("MenuPriceRange").addEventListener("input", function () {
//     let inputRangeValue = document.getElementById('MaxPriceCard')
//     inputRangeValue.innerHTML = `${this.value}`;
// });

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
        let pageLoading = document.querySelector('.page-loading');
        if (!pageLoading.classList.contains('_loaded')) {
            pageLoading.classList.add('_loaded');
            document.body.classList.remove('_lock');
        };
    }, 500);

    //</Pre-loader>==============================================================================
});

// <Shopping cart>==============================================================================

// Запрет на открытие "Оформления заказа", если корзина пуста.
if (cartData !== null) {
    if (cartMakeOffer.classList.contains('_none-cart-data')) {
        cartMakeOffer.classList.remove('_none-cart-data');
    };

    cartMakeOffer.classList.add('_has-cart-data');
} else {
    if (cartMakeOffer.classList.contains('_has-cart-data')) {
        cartMakeOffer.classList.remove('_has-cart-data');
    };

    cartMakeOffer.classList.add('_none-cart-data');
};

// Меняем показатель кол-ва товаров в корзине.
changeCartIconNumber();

// </Shopping cart>==============================================================================

//<FUNCTIONS>==============================================================================

function selectGenerate(myJson) {
    let selectGroup = document.getElementById('selectGroup').children;
        // minPrice = document.getElementById('MinPriceCard'),
        // maxPrice = document.getElementById('MaxPriceCard'),
        // MenuPriceRange = document.getElementById('MenuPriceRange')

    for (let i = 0; i < selectGroup.length; i++) { //Пробежка по всем селектам

        let name = selectGroup[i].dataset.name;
        let arr = [];

        for (let y = 0; y < myJson.tires.length; y++) { // Генерация из json файла по имени
            // replace(/(^[^])|[ ]+/g, '$1')
            if (String(myJson.tires[y][name]).trim() == 'undefined') {
                console.log('error:', 'str:', y , ', type:', name);
            } else {
                arr.push(String(myJson.tires[y][name]).trim());
            }

        };

        arr.sort((a, b) => a - b); // Сортировка по возрастанию
        arr = Array.from(new Set(arr)) // Удаление лишнего (повторов)

        for (let z = 0; z < arr.length; z++) { // Генерация option-ов
            selectGroup[i].children[0].innerHTML += `<option value='${arr[z]}'>${arr[z]}</option>`;
        };
    };

    // for (let i = 0; i < myJson.tires.length; i++) {

    //     // Отоброжаемый текст ОТ и ДО
    //     if (
    //         (+(myJson.tires[i].price) < +(minPrice.textContent)) ||
    //         (+(myJson.tires[i].price) > +(maxPrice.textContent)) ||
    //         (minPrice.attributes.value.value == 'false') ||
    //         (maxPrice.attributes.value.value == 'false')
    //     ) {

    //         if (
    //             (minPrice.attributes.value.value == 'false') ||
    //             (maxPrice.attributes.value.value == 'false')
    //         ) {
    //             minPrice.attributes.value.value = `${myJson.tires[i].price}`;
    //             maxPrice.attributes.value.value = `${myJson.tires[i].price}`;
    //             minPrice.innerHTML = `${myJson.tires[i].price}`;
    //             maxPrice.innerHTML = `${myJson.tires[i].price}`;
    //         } else if (myJson.tires[i].price < +(minPrice.textContent)) {
    //             minPrice.innerHTML = `${myJson.tires[i].price}`;
    //         } else {
    //             maxPrice.attributes.value.value = `${myJson.tires[i].price}`;
    //             maxPrice.innerHTML = `${myJson.tires[i].price}`;
    //         };
    //     };

    //     // Параметры Value 
    //     if (
    //         (MenuPriceRange.min == false) || (MenuPriceRange.max == false) ||
    //         (+(MenuPriceRange.min) > +(myJson.tires[i].price)) || (+(MenuPriceRange.max) < +(myJson.tires[i].price))
    //     ) {
    //         if (
    //             (MenuPriceRange.min == false) ||
    //             (MenuPriceRange.max == false)
    //         ) {
    //             MenuPriceRange.min = `${myJson.tires[i].price}`;
    //             MenuPriceRange.max = `${myJson.tires[i].price}`;
    //             MenuPriceRange.value = `${myJson.tires[i].price}`;
    //         } else if (+(MenuPriceRange.min) > +(myJson.tires[i].price)) {
    //             MenuPriceRange.min = `${myJson.tires[i].price}`;
    //         } else {
    //             MenuPriceRange.max = `${myJson.tires[i].price}`;
    //             MenuPriceRange.value = `${myJson.tires[i].price}`;
    //         };
    //     };
    // };
};

function reset(myJson) {
    let select = document.getElementById('selectGroup'),
        arrAll = [];
        // maxPrice = document.getElementById('MaxPriceCard').attributes.value,
        // input = document.getElementById('MenuPriceRange');
        
    // document.getElementById('MaxPriceCard').innerHTML = `${maxPrice.textContent}`;
    // input.value = input.max;

    for (let i = 0; i < myJson.tires.length; i++) { // Генерация всех индексов товаров
        arrAll.push(i)
    };

    for (let i = 0; i < select.children.length; i++) { // Добавление в массив не подходящих по значению
        if (select.children[i].children[0].children[0].children[2].value != 0){
            select.children[i].children[0].children[0].children[2].value = 0;
        };
    };

    return arrAll;
};

function settingCards() {
    let cardsDynamicAdaptive = () => {
        let cardButtons = document.querySelectorAll('.card-info__buttons'),
            cardTitles = document.querySelectorAll('.card-info__title');
    
        function doDynamicAvButtons() {
            cardButtons.forEach(cardButton => {
                let cardInfo = cardButton.closest('.catalog-card__info');
                let cardInfoBody = cardInfo.closest('.catalog-card__body');
                let cardButtonsNewParent = cardInfoBody.nextElementSibling;
                cardButton.remove(cardInfo);
                cardButtonsNewParent.append(cardButton);
            });
        };
    
        function doDynamicAvTitles() {
            cardTitles.forEach(cardTitle => {
                let cardInfo = cardTitle.closest('.catalog-card__info');
                let cardInfoBody = cardInfo.closest('.catalog-card__body');
                let cardInfoBodyParent = cardInfoBody.parentElement;
                let cardTitlesNewParent = cardInfoBodyParent.querySelector('.catalog-card__media-title');
                cardTitle.remove(cardInfo);
                cardTitlesNewParent.append(cardTitle);
            });
        };
    
        doDynamicAvButtons();
        doDynamicAvTitles();
    };

    if (window.innerWidth <= 600) {
        cardsDynamicAdaptive();
    };
};

function sortingEvents(myJson) {
    let selectAll = document.getElementById('selectGroup'), // Группа селектов
        // maxPriceCard = document.getElementById('MaxPriceCard'),
        // maxPriceValue = +(maxPriceCard.attributes.value.value),
        // maxPriceText = +(maxPriceCard.textContent),
        arrAll = [],
        arrSuperfluous = [], // Массив лишних индексов
        jsonTires = myJson.tires;

    for (let i = 0; i < jsonTires.length; i++) { // Генерация всех индексов товаров
        arrAll.push(i)
    };

    for (let i = 0; i < selectAll.children.length; i++) { // Добавление в массив не подходящих по значению
        
        let selectDataName = selectAll.children[i].dataset.name, // Тип, data-name (brand, w, h, r...) 
            selectValue = selectAll.children[i].children[0].children[0].children[2].value; // Получение value текущего select'a 

        if (selectValue != 0) {
            for (let z = 0; z < jsonTires.length; z++) {
                if (jsonTires[z][`${selectDataName}`] != selectValue) {
                    arrSuperfluous.push(z)
                };
            };
        };
    };

    // if (maxPriceText != maxPriceValue) {
    //     for (let z = 0; z < jsonTires.length; z++) {
    //         if (+(jsonTires[z].price) >= maxPriceText) {
    //             arrSuperfluous.push(z);
    //         };
    //     };
    // };

    arrAll = arrAll.filter(e => !~arrSuperfluous.indexOf(e)); // Удаление ненужного

    return arrAll;
};

//</FUNCTIONS>==============================================================================