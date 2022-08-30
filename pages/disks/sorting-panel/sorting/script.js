function sortingEvents(myJson) {
    let selectAll = document.getElementById('selectGroup'), // Группа селектов
        maxPriceCard = document.getElementById('MaxPriceCard'),
        maxPriceValue = +(maxPriceCard.attributes.value.value),
        maxPriceText = +(maxPriceCard.textContent),
        arrAll = [],
        arrSuperfluous = [], // Массив лишних индексов
        jsonTires = myJson.tires;

    for (let i = 0; i < jsonTires.length; i++) { // Генерация всех индексов товаров
        arrAll.push(i)
    };

    for (let i = 0; i < selectAll.children.length; i++) { // Добавление в массив не подходящих по значению
        
        let selectDataName = selectAll.children[i].dataset.name, // Тип, data-name (brand, w, h, r...) 
            selectValue = selectAll.children[i].children[0].children[0].children[2].value; // Получение value текущего select'a 

        if (selectValue != 0) {
            for (let z = 0; z < jsonTires.length; z++) {
                if (jsonTires[z][`${selectDataName}`] != selectValue) {
                    arrSuperfluous.push(z)
                };
            };
        };
    };

    if (maxPriceText != maxPriceValue) {
        for (let z = 0; z < jsonTires.length; z++) {
            if (+(jsonTires[z].price) >= maxPriceText) {
                arrSuperfluous.push(z);
            };
        };
    };

    arrAll = arrAll.filter(e => !~arrSuperfluous.indexOf(e)); // Удаление ненужного

    return arrAll;
};