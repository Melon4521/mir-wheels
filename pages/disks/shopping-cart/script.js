let cartData = getCartData("shopping-cart"),
    offerForm = document.getElementById("offerForm");
    // offerInputPhone = document.getElementById("offerInputPhone"),
    // offerInputMail = document.getElementById("offerInputMail");

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
        let response = await fetch('../../../php/shopping-cart/message-sender.php', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            sendOrder();
            offerForm.reset();
            offerForm.classList.remove('_sending');
        } else {
            alert('Ошибка')
            offerForm.classList.remove('_sending');
        }
    } else {
        alert('Заполните обязательные поля')
    }
}

// offerForm.onsubmit = function () {
//     if (!checkFormValidity(offerInputPhone)) {
//         return false;
//     } else {
//         sendOrder();
//         return true;
//     }
// };

//<Functions>==============================================================================

function add2Cart(targetButton) {
    let cardDataAtributes = {
            cardName: targetButton.dataset.name,
            price: targetButton.dataset.price,
            color: targetButton.dataset.color,
            type: targetButton.dataset.type,
            dateUp: targetButton.dataset.date_up,
            stock: targetButton.dataset.stock,
            cardImage: targetButton.dataset.image,
            cardId: targetButton.dataset.card_id || '0',
        },
        cartData = getCartData("shopping-cart") || {},
        cardID = cardDataAtributes.cardId;

    if (cartData.hasOwnProperty(cardID)) {
        // Если товар уже есть в корзине, то прибавляем его кол-во
        if (cartData[cardID][5] > cartData[cardID][cartData[cardID].length - 1]) {
            cartData[cardID][cartData[cardID].length - 1]++;
        }
    } else {
        // Иначе создаем новый товар
        cartData[cardID] = [
            cardDataAtributes.cardName,
            cardDataAtributes.price,
            cardDataAtributes.color,
            cardDataAtributes.type,
            cardDataAtributes.dateUp,
            cardDataAtributes.stock,
            cardDataAtributes.cardImage,
            cardID,
            1,
        ];
    };

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

    setCartData(cartData, "shopping-cart");
    changeCartIconNumber();
};

function generateCartCard(cardAtrs) {
    let PlaceGeneration = shoppingCart,
        image;

    if (cardAtrs.cardImage) {
        image = cardAtrs.cardImage;
    } else {
        image = "images/no-image.png";
    };

    if (cardAtrs.cardId[0] === 'd') { // Создание карточек товаров для дисков 
        PlaceGeneration.innerHTML += /*html*/ `
        <div class="cart-cards__item cart-card" data-id="${cardAtrs.cardId}">
            <div class="cart-card__body">
                <div class="cart-card__image">
                    <img loading="lazy" src="${image}" alt="Изображение">
                </div>
                <div class="cart-card__info">
                    <div class="cart-card__info-header info-header">
                        <div class="info-header__title">${cardAtrs.cardName}</div>
                        <div class="info-header__price">${cardAtrs.price} руб.</div>
                        <div class="info-header__details"><span>Цвет: </span>${cardAtrs.color}</div>
                        <div class="info-header__details"><span>Тип: </span>${cardAtrs.type}</div>
                        <div class="info-header__details"><span>Дата производства: </span>${cardAtrs.dateUp}</div>
                        <div class="info-header__details _details-stock"><span>В наличии: </span>${cardAtrs.stock}</div>
                    </div>
                    <div class="cart-card__info-footer info-footer">
                        <div class="info-footer__cart-left"><span>В корзине: </span>${cardAtrs.total}</div>
                        <div class="info-footer__func-btns">
                            <button class="info-footer__func-btn addCartItem" data-id="${cardAtrs.cardId}">Добавить</button>
                            <button class="info-footer__func-btn delCartItem" data-id="${cardAtrs.cardId}">Убрать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    } else { // Создание карточек товаров для шин 
        PlaceGeneration.innerHTML += /*html*/ `
        <div class="cart-cards__item cart-card" data-id="${cardAtrs.cardId}">
            <div class="cart-card__body">
                <div class="cart-card__image">
                    <img loading="lazy" src="${image}" alt="Изображение">
                </div>
                <div class="cart-card__info">
                    <div class="cart-card__info-header info-header">
                        <div class="info-header__title">${cardAtrs.cardName}</div>
                        <div class="info-header__price">${cardAtrs.price} руб.</div>
                        <div class="info-header__details"><span>Сезон: </span>${cardAtrs.season}</div>
                        <div class="info-header__details"><span>Дата производства: </span>${cardAtrs.dateUp}</div>
                        <div class="info-header__details _details-stock"><span>В наличии: </span>${cardAtrs.stock}</div>
                    </div>
                    <div class="cart-card__info-footer info-footer">
                        <div class="info-footer__cart-left"><span>В корзине: </span>${cardAtrs.total}</div>
                        <div class="info-footer__func-btns">
                            <button class="info-footer__func-btn addCartItem" data-id="${cardAtrs.cardId}">Добавить</button>
                            <button class="info-footer__func-btn delCartItem" data-id="${cardAtrs.cardId}">Убрать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
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
        cartDataAtrs,
        totalCartSum = 0, // Сумма всех товаров в корзине
        cartInfo = ''; // Текст заказа для письма

    if (cartData !== null) {
        PlaceGeneration.innerHTML = '';

        // Пробегаемся по всем ключам в LocalStorage
        for (let items in cartData) {

            // Забираем значения в объект
            if (cartData[items][7][0] === 'd') {
                cartDataAtrs = {
                    cardName: cartData[items][0],
                    price: cartData[items][1],
                    color: cartData[items][2],
                    type: cartData[items][3],
                    dateUp: cartData[items][4],
                    stock: cartData[items][5],
                    cardImage: cartData[items][6],
                    cardId: cartData[items][7],
                    total: cartData[items][8],
                }; 
            } else {
                cartDataAtrs = {
                    cardName: cartData[items][0],
                    price: cartData[items][1],
                    season: cartData[items][2],
                    dateUp: cartData[items][3],
                    stock: cartData[items][4],
                    cardImage: cartData[items][5],
                    cardId: cartData[items][6],
                    total: cartData[items][7],
                };
            };

            for (let i = 0; i < cartData[items].length; i++) {
                cartInfo += `${cartData[items][i]}\t`;
            };

            cartInfo += "\n\n";
            totalCartSum += Number(String((cartData[items][1])) * cartData[items][cartData[items].length-1]);

            generateCartCard(cartDataAtrs);
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
    let targetElementId = targetElement.dataset.id,
        cartData = getCartData("shopping-cart");

    for (let item in cartData) {

        if (cartData[item][7][0] === 'd') {
            if (cartData[item][7] == targetElementId) {
                // Проверка на превышение кол-ва товаров в наличии
                if (cartData[item][5] > cartData[item][cartData[item].length-1]) {
                    cartData[item][cartData[item].length-1]++;
                    break;
                }
            }
        } else {
            if (cartData[item][6] == targetElementId) {
                // Проверка на превышение кол-ва товаров в наличии
                if (cartData[item][4] > cartData[item][cartData[item].length-1]) {
                    cartData[item][cartData[item].length-1]++;
                    break;
                }
            }
        }
    }

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
        };
    };

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
    alert("Заказ отправлен, мы скоро с вами свяжемся!");
    // Закрытие окна
    setTimeout(() => {
        closePopup(document.querySelector('#popup-offer'), true);
    }, 1000);
    clearAllItems();
};

// function checkFormValidity(phone) {
//     if (phone.value.length < 11 || !validatePhone(phone.value)) {
//         alert('Неправильный формат ввода телефона!');
//         return false;
//     } else {
//         return true;
//     }

//     function validatePhone(phone) {
//         let reg = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
//         return reg.test(String(phone));
//     }
// };

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

function buyIn1Click(targetButton) {
    let cardDataAtributes = {
        "item": {
            cardName: targetButton.dataset.name,
            price: targetButton.dataset.price,
            color: targetButton.dataset.color,
            type: targetButton.dataset.type,
            dateUp: targetButton.dataset.date_up,
            stock: targetButton.dataset.stock,
            cardImage: targetButton.dataset.image,
            cardId: targetButton.dataset.card_id || '0',
        }
    },
    totalCartSum = 0, // Сумма всех товаров в корзине
    cartInfo = ''; // Текст заказа для письма

    setCartData(cardDataAtributes, "one_click");

    let cartData = getCartData("one_click");

    for (let item in cartData.item) {
        cartInfo += `${cartData.item[item]}\t`;
    }

    totalCartSum += Number(String(cartData.item.price));

    document.getElementById("hiddenCartItem").value = cartInfo + `\n\nОбщая стоимость товаров: ${totalCartSum}руб.`;

    localStorage.removeItem("one_click");
};

//</Functions>==============================================================================