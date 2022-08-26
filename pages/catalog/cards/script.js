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

function settingCards() {
    if (window.innerWidth <= 600) {
        cardsDynamicAdaptive();
    };
};