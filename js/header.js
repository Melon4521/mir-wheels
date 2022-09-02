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
    
    if (cheakScrollPosition(600)) {
        let elipseUp = document.querySelector('#elipseUp');
        elipseUp.classList.add('_active');
        elipseUp.addEventListener('click', () => {
            scrollToPosition(0)
        });
    } else {
        let elipseUp = document.querySelector('#elipseUp');
        elipseUp.classList.remove('_active');
        elipseUp.removeEventListener('click', () => {
            scrollToPosition(0)
        })
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

//</Burger menu>==============================================================================

// ======================================================================================
// ======================================================================================
// ======================================================================================

// <FUNCTIONS> ==============================================================================

// function cheakMaxWidth(pixels) {
//     let mediaQuery = window.matchMedia(`(max-width: ${pixels}px)`);
//     return mediaQuery.matches
// };

// function cheakMinWidth(pixels) {
//     let mediaQuery = window.matchMedia(`(min-width: ${pixels}px)`);
//     return mediaQuery.matches
// };

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

// </FUNCTIONS> ==============================================================================