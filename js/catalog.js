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

selectGenerate(myJson);
easydropdown.all();

let sortedArray = sortingEvents(myJson);

document.getElementById('LeftPick').addEventListener('click', () => {
    sortedArray = sortingEvents(myJson);
    pagenInit(myJson, sortedArray);
});

document.getElementById('Reset').addEventListener('click', () => {
    sortedArray = reset(myJson);
    pagenInit(myJson, sortedArray)
});

//</Sorting>==============================================================================

//<Cards>==============================================================================

pagenInit(myJson, sortedArray);
settingCards();

//</Cards>==============================================================================

//<Shopping cart>==============================================================================

cartInit()

//</Shopping cart>==============================================================================