export default function sortingEvents() {

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
};