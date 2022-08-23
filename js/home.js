import cartInit from './shopping-cart.js';

//<Slider config>==============================================================================

new Swiper('.my-slider', {
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },

    grabCursor: true,

    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
    },

});

//</Slider config>==============================================================================

//<Shopping cart>==============================================================================

cartInit()

//</Shopping cart>==============================================================================