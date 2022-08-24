import myJson from '../api/demoDataTiresFull.json' assert {
    type: 'json'
};

import selectGenerate from '../pages/catalog/sorting-panel/selects/select-generate/script.js';
import settingCards from "../pages/catalog/cards/script.js";
import sortingEvents from '../pages/catalog/sorting-panel/sorting/script.js';
import reset from '../pages/catalog/sorting-panel/selects/reset.js';
import cartInit from './shopping-cart.js';
import pagenInit from '../pages/catalog/pagination/script.js';

//<Sorting>==============================================================================

document.getElementById("MenuPriceRange").addEventListener("input", function () {
    let inputRangeValue = document.getElementById('MaxPriceCard')
    inputRangeValue.innerHTML = `${this.value}`;
});

let sortedArray,
    page = 1;

document.getElementById('Reset').addEventListener('click', reset);

document.getElementById('LeftPick').addEventListener('click', () => {
    sortingEvents(myJson, page);
});

selectGenerate(myJson);
easydropdown.all();

//</Sorting>==============================================================================

//<Cards>==============================================================================

// pagenInit(myJson, sortedArray);
settingCards();

//</Cards>==============================================================================

//<Shopping cart>==============================================================================

cartInit()

//</Shopping cart>==============================================================================