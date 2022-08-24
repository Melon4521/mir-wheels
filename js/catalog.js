import myJson from '../api/demoDataTires.json' assert {
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

document.getElementById('Reset').addEventListener('click', reset);

selectGenerate(myJson);
easydropdown.all();

//</Sorting>==============================================================================

//<Cards>==============================================================================

pagenInit(myJson);
settingCards();

//</Cards>==============================================================================

document.getElementById('LeftPick').addEventListener('click', () => {
    sortingEvents(myJson);
});

//<Shopping cart>==============================================================================

cartInit()

//</Shopping cart>==============================================================================