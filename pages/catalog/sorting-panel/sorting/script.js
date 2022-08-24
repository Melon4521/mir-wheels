export default function sortingEvents(myJson) {

    // Sorting v1.0

    let allItem = document.getElementById('Right'),
        maxPrice = document.getElementById('MaxPriceCard').textContent,
        select = document.getElementById('selectGroup');

    let arrAll = [];

    for (let i = 0; i < select.children.length; i++) {
        let type = select.children[i].children[0].children[0].children[2].value,
            qualification = 'data-' + select.children[i].dataset.name;

        if ((Number(document.getElementById('MaxPriceCard').attributes.value.value) != Number(maxPrice)) || (type != 0)) {
            for (let x = 0; x < allItem.children.length; x++) {

                if (type != 0) {
                    if (allItem.children[x].getAttribute(qualification) != type) {
                        arrAll.push(x);
                    };
                };

                if (Number(document.getElementById('MaxPriceCard').attributes.value.value) != Number(maxPrice)){
                    if (Number(allItem.children[x].attributes[3].value) > Number(maxPrice)) {
                        arrAll.push(x);
                    };
                };
            };
        };
    };

    arrAll = Array.from(new Set(arrAll)) // Удаление лишнего (повторов)
    arrAll.sort((a, b) => a - b); // Сортировка по возрастанию

    for (let i = 0; i < allItem.children.length; i++) {
        allItem.children[i].style.display = 'block';
    };

    for (let i = 0; i < arrAll.length; i++) {
        allItem.children[arrAll[i]].style.display = 'none';
    };

    // ======================================================================================
    // Sorting v2.0

    // let allItems = myJson.tires,
    //     allCards = document.getElementById('Right').children,
    //     maxPrice = document.getElementById('MaxPriceCard').textContent,
    //     selects = document.querySelectorAll('.SelectBox'),
    //     arrAll = [];

    // for (let i = 0; i < selects.length; i++) {
    //     let type = selects[i].children[0].children[0].children[2].value,
    //         qualification = 'data-' + selects[i].dataset.name;

    //     if ((Number(document.getElementById('MaxPriceCard').attributes.value.value) != Number(maxPrice)) || (type != 0)) {
    //         for (let x = 0; x < allItems.length; x++) {
    //             if (type != 0) {
    //                 if (allItems[x][qualification] != type) {
    //                     arrAll.push(x);
    //                 };
    //             };

    //             if (Number(document.getElementById('MaxPriceCard').attributes.value.value) != Number(maxPrice)){
    //                 if (Number(allItems[x].stock.value) > Number(maxPrice)) {
    //                     arrAll.push(x);
    //                 };
    //             };
    //         };
    //     };
    // };

    // arrAll = Array.from(new Set(arrAll)) // Удаление лишнего (повторов)
    // arrAll.sort((a, b) => a - b); // Сортировка по возрастанию

    // for (let i = 0; i < allItems.length; i++) {
    //     if (i > allCards.length-1) {
    //         break;
    //     } else {
    //         allCards[i].style.display = 'block';
    //     };

    //     // allItems.children[i].style.display = 'block';
    // };

    // for (let i = 0; i < arrAll.length; i++) {
    //     if (i > allCards.length-1) {
    //         break;
    //     } else {
    //         console.log(arrAll);
    //         allCards[i].style.display = 'none';
    //     };

    //     // document.querySelectorAll('.catalog-card')[i].style.display = 'none';
    //     // allItems.children[arrAll[i]].style.display = 'none';
    // };
};