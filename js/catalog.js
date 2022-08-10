//<Padding to main element>==============================================================================

const headerElement = document.querySelector('.header'),
    mainElement = document.querySelector('.main');

let addPadding = () => {
    let paddingForMain = headerElement.getBoundingClientRect().height;
    mainElement.style.paddingTop = `${paddingForMain}px`;
}

document.addEventListener('scroll', () => {
    if (cheakScrollPosition(500)) {
        headerElement.classList.add('_header-fixed');
        addPadding();
    }
});

//</Padding to main element>==============================================================================

//<Burger menu>==============================================================================

const navigationMenu = document.querySelector('.menu-nav'),
    burgerButton = document.querySelector('.top-menu__burger');

burgerButton.addEventListener('click', openMenuBurger);

function openMenuBurger() {
    burgerButton.classList.toggle('_burger-open');
    navigationMenu.classList.toggle('_burger-open');
    document.body.classList.toggle('_lock')
};

//</Burger menu>==============================================================================

// ======================================================================================
// ======================================================================================
// ======================================================================================

// <FUNCTIONS> ==============================================================================

function cheakMaxWidth(pixels) {
    let mediaQuery = window.matchMedia(`(max-width: ${pixels}px)`);
    return mediaQuery.matches
}

function cheakMinWidth(pixels) {
    let mediaQuery = window.matchMedia(`(min-width: ${pixels}px)`);
    return mediaQuery.matches
}

function cheakScrollPosition(coord) {
    return (window.pageYOffset >= coord) ? true : false;
}

// </FUNCTIONS> ==============================================================================