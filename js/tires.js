// <Получение JSON>==============================================================================

async function fetchAsync() {
    const response = await fetch('../api/demoDataTiresFull.json');
    return await response.json();
};

// </Получение JSON>==============================================================================

// <Document Actions>==============================================================================

document.addEventListener('click', function (e) {
    let targetElement = e.target;

    if (targetElement.classList.contains('sort-menu__find')) { // Кнопка "Подобрать"
        fetchAsync().then(function (myJson) {
            let sortedArray = sortingEvents(myJson);
            pagenInit(myJson, sortedArray);
            settingCards();
        })
    } 
    
    if (targetElement.classList.contains('sort-menu__reset')) { // Кнопка "Сбросить"
        fetchAsync().then(function (myJson) {
            let sortedArray = reset(myJson);
            pagenInit(myJson, sortedArray);
            settingCards();
        })
    } 
    
    if (targetElement.classList.contains('addToCart')) { // Кнопка "В корзину"
        add2Cart(targetElement);
    } 
    
    if (targetElement.classList.contains('buyIn1Click')) { // Кнопка "В корзину"
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
document.getElementById("MenuPriceRange").addEventListener("input", function () {
    let inputRangeValue = document.getElementById('MaxPriceCard')
    inputRangeValue.innerHTML = `${this.value}`;
});

// Функция с JSON
fetchAsync().then(function (myJson) {

    // <Select Generation>==============================================================================

    selectGenerate(myJson);
    easydropdown.all();

    // </Select Generation>==============================================================================

    // <Sorting>==============================================================================

    let sortedArray = sortingEvents(myJson);
    pagenInit(myJson, sortedArray);
    settingCards();

    // </Sorting>==============================================================================
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