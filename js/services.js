//<Document Actions>==============================================================================

document.addEventListener('click', function (e) {
    documentActions(e)
});

function documentActions(e) {
    let targetElement = e.target;
    
    // Иконка корзины
    if (targetElement.classList.contains('top-menu__cart')) {
        openCart();
    };

    // Кнопка "Очистить все" в корзине.
    if (targetElement.classList.contains('cartClearAll')) {
        clearAllItems();
    };

    // Кнопка "Добавить" в корзине.
    if (targetElement.classList.contains('addCartItem')) {
        addItem(targetElement);
    };

    // Кнопка "Убрать" в корзине.
    if (targetElement.classList.contains('delCartItem')) {
        deleteItem(targetElement);
    };

    // Открытие popup-а.
    if (targetElement.classList.contains('popup-opener')) {
        const dataAtribute = targetElement.dataset.popup_open;
        let popup = document.querySelector(dataAtribute);
        popupOpen(popup, e);
        e.preventDefault();
    };

    // Кнопка "Записаться" на главном изображение.
    if (targetElement.classList.contains('hi-image__button')) {
        let scrollPlace = document.querySelector('.service-form__form').getBoundingClientRect().top + window.pageYOffset;
            headerElementHeight = document.querySelector('.header').getBoundingClientRect().height;
        scrollTo({
            top: (scrollPlace - headerElementHeight),
            behavior: "smooth"
        });
    };

    // Кнопка "Записаться" на главном изображение.
    if (targetElement.classList.contains('service-form__button')) {

        
    };
};

//</Document Actions>==============================================================================

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

//<Pre-loader>==============================================================================

setTimeout(() => {
    let pageLoading = document.querySelector('.page-loading');
    if (!pageLoading.classList.contains('_loaded')) {
        pageLoading.classList.add('_loaded');
        document.body.classList.remove('_lock');
    };
}, 1000);

//</Pre-loader>==============================================================================

//<Checking form validity>==============================================================================

let serviceForm = document.querySelector('.service-form__form'),
    servicePhone = document.querySelector('.service-form__phone');

serviceForm.onsubmit = function () {
    if (checkForm(servicePhone, null)) {
        return true;
    } else {
        return false;
    };
}
//</Checking form validity>==============================================================================