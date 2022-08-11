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