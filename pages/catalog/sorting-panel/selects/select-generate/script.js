export default function selectGenerate(myJson) {
    let selectGroup = document.getElementById('selectGroup').children,
        minPrice = document.getElementById('MinPriceCard'),
        maxPrice = document.getElementById('MaxPriceCard'),
        MenuPriceRange = document.getElementById('MenuPriceRange')

    for (let i = 0; i < selectGroup.length; i++) { //Пробежка по всем селектам

        let name = selectGroup[i].dataset.name;
        let arr = [];

        for (let y = 0; y < myJson.tires.length; y++) { // Генерация из json файла по имени
            if (String(myJson.tires[y][name]).replace(/(^[^])|[ ]+/g, '$1') == 'undefined') {
                console.log('error:', 'str:', y , ', type:', name);
            } else {
                arr.push(String(myJson.tires[y][name]).replace(/(^[^])|[ ]+/g, '$1'));
            }

        };

        arr.sort((a, b) => a - b); // Сортировка по возрастанию
        arr = Array.from(new Set(arr)) // Удаление лишнего (повторов)

        for (let z = 0; z < arr.length; z++) { // Генерация option-ов
            selectGroup[i].children[0].innerHTML += `<option value='${arr[z]}'>${arr[z]}</option>`;
        };
    };

    for (let i = 0; i < myJson.tires.length; i++) {

        // Отоброжаемый текст ОТ и ДО
        if (
            (+(myJson.tires[i].price) < +(minPrice.textContent)) ||
            (+(myJson.tires[i].price) > +(maxPrice.textContent)) ||
            (minPrice.attributes.value.value == 'false') ||
            (maxPrice.attributes.value.value == 'false')
        ) {

            if (
                (minPrice.attributes.value.value == 'false') ||
                (maxPrice.attributes.value.value == 'false')
            ) {
                minPrice.attributes.value.value = `${myJson.tires[i].price}`;
                maxPrice.attributes.value.value = `${myJson.tires[i].price}`;
                minPrice.innerHTML = `${myJson.tires[i].price}`;
                maxPrice.innerHTML = `${myJson.tires[i].price}`;
            } else if (myJson.tires[i].price < +(minPrice.textContent)) {
                minPrice.innerHTML = `${myJson.tires[i].price}`;
            } else {
                maxPrice.attributes.value.value = `${myJson.tires[i].price}`;
                maxPrice.innerHTML = `${myJson.tires[i].price}`;
            };
        };

        // Параметры Value 
        if (
            (MenuPriceRange.min == false) || (MenuPriceRange.max == false) ||
            (+(MenuPriceRange.min) > +(myJson.tires[i].price)) || (+(MenuPriceRange.max) < +(myJson.tires[i].price))
        ) {
            if (
                (MenuPriceRange.min == false) ||
                (MenuPriceRange.max == false)
            ) {
                MenuPriceRange.min = `${myJson.tires[i].price}`;
                MenuPriceRange.max = `${myJson.tires[i].price}`;
                MenuPriceRange.value = `${myJson.tires[i].price}`;
            } else if (+(MenuPriceRange.min) > +(myJson.tires[i].price)) {
                MenuPriceRange.min = `${myJson.tires[i].price}`;
            } else {
                MenuPriceRange.max = `${myJson.tires[i].price}`;
                MenuPriceRange.value = `${myJson.tires[i].price}`;
            };
        };
    };
};