//<Получение JSON>==============================================================================

async function fetchAsync() {
    const response = await fetch('../api/demoDataTiresFull.json');
    return await response.json();
};

// async function getJson() {
//     const fileUrl = '../api/demoDataTiresFull.json';
//     const response = await fetch(fileUrl);
//     let DB = await response.json();

//     return DB;
// };

// let myJson = await getJson();

// console.log(myJson);

//</Получение JSON>==============================================================================

document.addEventListener('click', function (e) {
    documentActions(e)
});

function documentActions(e) {
    let targetElement = e.target;

    // Кнопка "Подобрать"
    if (targetElement.classList.contains('sort-menu__find')) {
        fetchAsync().then(function (myJson) {
            let sortedArray = sortingEvents(myJson);
            pagenInit(myJson, sortedArray);
            settingCards();
        });
    };

    // Кнопка "Сбросить"
    if (targetElement.classList.contains('sort-menu__reset')) {
        fetchAsync().then(function (myJson) {
            let sortedArray = reset(myJson);
            pagenInit(myJson, sortedArray);
            settingCards();
        });
    };

    // Кнопка "В корзину"
    if (targetElement.classList.contains('addToCart')) {
        add2Cart(targetElement);
    }
    
    // Иконка корзины
    if (targetElement.classList.contains('top-menu__cart')) {
        openCart();
    }

    // Кнопка "Очистить все" в корзине.
    if (targetElement.classList.contains('cartClearAll')) {
        clearAllItems();
    }

    // Кнопка "Добавить" в корзине.
    if (targetElement.classList.contains('addCartItem')) {
        addItem(targetElement);
    }

    // Кнопка "Убрать" в корзине.
    if (targetElement.classList.contains('delCartItem')) {
        deleteItem(targetElement);
    }
};

// ======================================================================================

// Меняем maxPrice по ползунку
document.getElementById("MenuPriceRange").addEventListener("input", function () {
    let inputRangeValue = document.getElementById('MaxPriceCard')
    inputRangeValue.innerHTML = `${this.value}`;
});

// Функция с JSON
fetchAsync().then(function (myJson) {

    //<Select Generation>==============================================================================

    selectGenerate(myJson);
    easydropdown.all();

    //</Select Generation>==============================================================================

    //<Sorting>==============================================================================

    let sortedArray = sortingEvents(myJson);
    pagenInit(myJson, sortedArray);
    settingCards();

    //</Sorting>==============================================================================
});

//<Shopping cart>==============================================================================

// Запрет на открытие "Оформления заказа", если корзина пуста
if (cartData !== null) {
    if (cartMakeOffer.classList.contains('_none-cart-data')) {
        cartMakeOffer.classList.remove('_none-cart-data');
    }
    cartMakeOffer.classList.add('_has-cart-data');
} else {
    if (cartMakeOffer.classList.contains('_has-cart-data')) {
        cartMakeOffer.classList.remove('_has-cart-data');
    }
    cartMakeOffer.classList.add('_none-cart-data');
};

changeCartIconNumber();

//</Shopping cart>==============================================================================