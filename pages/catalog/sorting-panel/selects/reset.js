export default function reset(myJson) {
    let maxPrice = document.getElementById('MaxPriceCard').attributes.value,
        input = document.getElementById('MenuPriceRange'),
        select = document.getElementById('selectGroup'),
        arrAll = [];

    document.getElementById('MaxPriceCard').innerHTML = `${maxPrice.textContent}`;
    input.value = input.max;

    for (let i = 0; i < myJson.tires.length; i++) { // Генерация всех индексов товаров
        arrAll.push(i)
    };

    return arrAll;
};