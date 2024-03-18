//<Popup>==============================================================================

const body = document.querySelector('body');
const lockElements = document.querySelectorAll('.lock-padding');

let unlock = true;

function popupOpen(popup, e) {
    if (popup && unlock) {
        if (e.target.classList.contains('cartMakeOffer')) {
            if (e.target.classList.contains('_has-cart-data')) {
                openedPopup = document.querySelector('.popup._open');

                if (openedPopup) {
                    closePopup(openedPopup, false)
                } else {
                    lockBody()
                };

                popup.classList.add('_open');
                popup.addEventListener('click', (e) => {
                    if (!e.target.closest('.popup__content') || e.target.classList.contains('popup__close')) {
                        if (!e.target.classList.contains('info-footer__func-btn')) {
                            closePopup(popup, true);
                            e.preventDefault();
                        }
                    };
                });
            } else if (e.target.classList.contains('_none-cart-data')) {
                alert('Корзина пуста, невозможно оформить заказ.');
            }
        } else {
            openedPopup = document.querySelector('.popup._open');

            if (openedPopup) {
                closePopup(openedPopup, false)
            } else {
                lockBody()
            };

            popup.classList.add('_open');
            popup.addEventListener('click', (e) => {
                if (!e.target.closest('.popup__content') || e.target.classList.contains('popup__close')) {
                    if (!e.target.classList.contains('info-footer__func-btn')) {
                        closePopup(popup, true);
                        e.preventDefault();
                    }
                };
            });
        }
    };
};

function closePopup(popup, doUnlock) {
    if (popup && unlock) {
        popup.classList.remove('_open');
        if (doUnlock) {
            unlockBody();
        };
    };
};

function lockBody() {
    let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
    body.classList.add('_lock');
    body.style.paddingRight = scrollWidth + 'px';
    if (lockElements) {
        for (let i = 0; i < lockElements.length; i++) {
            const elem = lockElements[i];
            if (elem.classList.contains('header')) {
                if (elem.classList.contains('_header-fixed')) {
                    elem.style.paddingRight = scrollWidth + 'px';
                }
            } else {
                elem.style.paddingRight = scrollWidth + 'px';
            };
        };
    };

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, 500);
};

function unlockBody() {
    setTimeout(() => {
        if (body.classList.contains('_lock')) {
            body.classList.remove('_lock');
            body.style.paddingRight = '0px';
        }
        if (lockElements) {
            for (let i = 0; i < lockElements.length; i++) {
                const elem = lockElements[i];
                elem.style.paddingRight = '0px';
            };
        };
    }, 300)

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, 500);
};

//</Popup>==============================================================================

//<Padding to main element. Header fixing>==============================================================================

const headerElement = document.querySelector('.header'),
    mainElement = document.querySelector('.main');

let addPadding = () => {
    let paddingForMain = headerElement.getBoundingClientRect().height;
    mainElement.style.paddingTop = `${paddingForMain}px`;
};

let removePadding = () => {
    mainElement.style.paddingTop = `0px`;
};

document.addEventListener('scroll', () => {
    // Фиксация хедера
    if (cheakScrollPosition(600)) {
        headerElement.classList.add('_header-fixed');
        addPadding();
    } else {
        if (cheakScrollPosition(0, '==')) {
            if (headerElement.classList.contains('_header-fixed')) {
                headerElement.classList.remove('_header-fixed');
                removePadding();
            }
        }
    }
    
    // elipse-up
    if (cheakScrollPosition(600)) {
        let elipseUp = document.querySelector('#elipseUp');
        elipseUp.classList.add('_active');
        elipseUp.onclick = () => {
            elipseUp.classList.remove('_active');
            scrollToPosition(0)
        }
    } else {
        let elipseUp = document.querySelector('#elipseUp');
        elipseUp.classList.remove('_active');
    }
});

//</Padding to main element. Header fixing>==============================================================================

//<Burger menu>==============================================================================

const navigationMenu = document.querySelector('.menu-nav'),
    burgerButton = document.querySelector('.top-menu__burger');

burgerButton.addEventListener('click', openMenuBurger);

function openMenuBurger() {
    if (!navigationMenu.classList.contains('_burger-open') &&
        !burgerButton.classList.contains('_burger-open')) {
        burgerButton.classList.add('_burger-open');
        navigationMenu.classList.add('_burger-open');
        let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollWidth}px`;
        document.body.classList.add('_lock');
    } else {
        burgerButton.classList.remove('_burger-open');
        navigationMenu.classList.remove('_burger-open');
        document.body.classList.remove('_lock');
        document.body.style.paddingRight = `0px`;
    }

}

// <FUNCTIONS> ==============================================================================

function cheakScrollPosition(coord, symbol = '>=') {
    if (symbol === '>=') {
        return (window.pageYOffset >= coord) ? true : false;
    } else if (symbol === '<=') {
        return (window.pageYOffset <= coord) ? true : false;
    } else if (symbol === '==') {
        return (window.pageYOffset === coord) ? true : false;
    } else if (symbol === '>') {
        return (window.pageYOffset > coord) ? true : false;
    } else if (symbol === '<') {
        return (window.pageYOffset < coord) ? true : false;
    }
};

function scrollToPosition(top, behavior = "smooth") {
    window.scrollTo({
        top: top,
        behavior: behavior,
    });
};

// </FUNCTIONS> ==============================================================================


function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll('._req');

    for (let i = 0; i<formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);

        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.classList.contains('_phone')) {
            if (phoneTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
            formAddError(input);
            error++;
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
    return error;
}

function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function emailTest(input) { 
    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    return !reg.test(input.value)
}   

function phoneTest(input) {
    let reg = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
    return !reg.test(String(input.value));
}





let cartData = getCartData("shopping-cart"),
    offerForm = document.getElementById("offerForm");

const shoppingCart = document.querySelector('#shoppingCart'),
    cartIcon = document.querySelector('.top-menu__cart'),
    cartMakeOffer = document.querySelector('#cartMakeOffer');

// Отправка формы
offerForm.addEventListener('submit', sendForm);

async function sendForm(e) {
    e.preventDefault();

    let error = formValidate(offerForm);

    let formData = new FormData(offerForm);

    if (error === 0) {
        offerForm.classList.add('_sending');
        let response = await fetch('../php/shopping-cart/message-sender.php', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let answer = await response.text();
            alert(answer)
            sendOrder();
            offerForm.reset();
            offerForm.classList.remove('_sending');
        } else {
            alert('Ошибка');
            offerForm.classList.remove('_sending');
        }
    } else {
        alert('Заполните обязательные поля')
    }
}

//<Functions>==============================================================================

function generateCartCard(cardAtrs) {
    let PlaceGeneration = shoppingCart,
        image;

    if (cardAtrs.image500x500) {
        image = cardAtrs.image500x500;
    } else {
        image = "images/no-image.png";
    };

    PlaceGeneration.innerHTML += /*html*/ `
        <div class="cart-cards__item cart-card" data-id="${cardAtrs.name}">
            <div class="cart-card__body">
                <div class="cart-card__image">
                    <img loading="lazy" src="${image}" alt="Изображение">
                </div>
                <div class="cart-card__info">
                    <div class="cart-card__info-header info-header">
                        <div class="info-header__title">${cardAtrs.name}</div>
                        <div class="info-header__price">${cardAtrs.price} руб.</div>
                        ${
                            cardAtrs.typeItem === 'disks' ?
                                `<div class="info-header__details"><span>Цвет: </span>${cardAtrs.color}</div>
                                <div class="info-header__details"><span>Тип: </span>${cardAtrs.type}</div>`
                            : `<div class="info-header__details"><span>Сезон: </span>${cardAtrs.season}</div>`
                        }
                        <div class="info-header__details"><span>Дата производства: </span>${cardAtrs.dateUp}</div>
                        <div class="info-header__details _details-stock"><span>В наличии: </span>${cardAtrs.stock}</div>
                    </div>
                    <div class="cart-card__info-footer info-footer">
                        <div class="info-footer__cart-left"><span>В корзине: </span>${cardAtrs.cnt}</div>
                        <div class="info-footer__func-btns">
                            <button class="info-footer__func-btn addCartItem" data-id="${JSON.stringify(cardAtrs)}">Добавить</button>
                            <button class="info-footer__func-btn delCartItem" data-id="${JSON.stringify(cardAtrs)}">Убрать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

function setCartData(cartData, name) {
    localStorage.setItem(name, JSON.stringify(cartData));
};

function getCartData(name) {
    return JSON.parse(localStorage.getItem(name));
};

function openCart() {
    let cartData = getCartData("shopping-cart"),
        PlaceGeneration = shoppingCart,
        totalCartSum = 0, // Сумма всех товаров в корзине
        cartInfo = ''; // Текст заказа для письма
    if (cartData !== null) {
        PlaceGeneration.innerHTML = '';

        // Пробегаемся по всем ключам в LocalStorage
        for (let items in cartData) {
            const data = cartData[items].typeItem === 'disks' ? ['name','price','color', 'type', 'date_up', 'stock'] : ['name','price','season', 'date_up', 'stock'];

            for (const key of data) {
                cartInfo += `${cartData[items][key]}\t`
            }
        
            cartInfo += "\n\n";
            totalCartSum += Number(String((cartData[items].price)) * cartData[items].cnt);
            generateCartCard(cartData[items]);
        }
        document.getElementById("totalCartSum").innerHTML = `${totalCartSum} руб.`;
        document.getElementById("hiddenCartItem").value = cartInfo + `Общая стоимость товаров: ${totalCartSum}руб.`;
    }

    return totalCartSum;
};

function clearAllItems() {
    const userResponse = confirm("Вы точно хотите очистить всё?");
    if (userResponse) {
        localStorage.removeItem("shopping-cart");
        shoppingCart.innerHTML = '';
        shoppingCart.innerHTML = /*html*/ `
            <div class="cart-cards__empty">
                <p class="cart-cards__empty-text">Корзина пуста...</p>
            </div>
        `;

        // Закрытие окна
        setTimeout(() => {
            closePopup(document.querySelector('#popup-cart'), true);
        }, 1000)
    };

    let cartData = getCartData("shopping-cart"),
        totalCartSum = openCart();

    if (totalCartSum === 0) {
        document.getElementById("totalCartSum").innerHTML = `0 руб.`;
    }

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
    }

    changeCartIconNumber();
};

function addItem(targetElement) {
    cartData = getCartData("shopping-cart");

    setCartData(cartData, "shopping-cart");
    changeCartIconNumber();
    openCart();
};

function deleteItem(targetElement) {
    let targetElementId = targetElement.dataset.id,
        cartData = getCartData("shopping-cart");

    for (let item in cartData) {

        if (cartData[item][7][0] === 'd') {
            if (cartData[item][7] == targetElementId) {

                if (cartData[item][cartData[item].length-1] == 1) {
                    delete cartData[item];
                } else {
                    cartData[item][cartData[item].length-1]--;
                }
    
                break;
            }
        } else {
            if (cartData[item][6] == targetElementId) {

                if (cartData[item][cartData[item].length-1] == 1) {
                    delete cartData[item];
                } else {
                    cartData[item][cartData[item].length-1]--;
                }
    
                break;
            }
        }
    }

    setCartData(cartData, "shopping-cart");
    changeCartIconNumber();
    openCart();

    if (openCart() === 0) {
        localStorage.removeItem("shopping-cart");
        changeCartIconNumber();
        shoppingCart.innerHTML = '';
        shoppingCart.innerHTML = /*html*/ `
            <div class="cart-cards__empty">
                <p class="cart-cards__empty-text">Корзина пуста...</p>
            </div>
        `;

        if (cartMakeOffer.classList.contains('_has-cart-data')) {
            cartMakeOffer.classList.remove('_has-cart-data');
        }

        cartMakeOffer.classList.add('_none-cart-data');

        alert("Корзина очищена");

        // Закрытие окна
        setTimeout(() => {
            closePopup(document.querySelector('#popup-cart'), true)
        }, 1000);
    }
};

function sendOrder() {
    // alert("Заказ отправлен, мы скоро с вами свяжемся!");
    // Закрытие окна
    setTimeout(() => {
        closePopup(document.querySelector('#popup-offer'), true);
    }, 1000);
    clearAllItems();
};

function changeCartIconNumber() {
    let cartData = getCartData("shopping-cart");
    let count = 0;

    if (cartData !== null) {
        for (let item in cartData) {
            count++;
        }
    }

    if (cartData === null) {
        cartIcon.dataset.count = '0';
    } else {
        if (count > 99) {
            cartIcon.dataset.count = `99`;
        } else {
            cartIcon.dataset.count = `${count}`;
        }
    }
};

//</Functions>==============================================================================


document.querySelector('[name="cart"]').addEventListener('click', (e)=>{
    addItem(e.target)
})