import myJson from '../api/demoDataTires.json' assert {
    type: 'json'
};

import selectGenerate from '../pages/catalog/sorting-panel/selects/select-generate/script.js';
import createAndSettingCards from "../pages/catalog/cards/script.js";
import sortingEvents from '../pages/catalog/sorting-panel/sorting/script.js';
import reset from '../pages/catalog/sorting-panel/selects/reset.js';
import cartMainFunction from './shopping-cart.js';

//<Sorting>==============================================================================

document.getElementById("MenuPriceRange").addEventListener("input", function () {
    let inputRangeValue = document.getElementById('MaxPriceCard')
    inputRangeValue.innerHTML = `${this.value}`;
});

document.getElementById('LeftPick').addEventListener('click', function () {
    sortingEvents();
});

document.getElementById('Reset').addEventListener('click', reset);

selectGenerate(myJson);
easydropdown.all();

//</Sorting>==============================================================================

//<Cards>==============================================================================

createAndSettingCards(myJson);

//</Cards>==============================================================================

//<Shopping cart>==============================================================================

cartMainFunction()

//</Shopping cart>==============================================================================