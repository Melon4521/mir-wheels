export default function reset() {
    let maxPrice = document.getElementById('MaxPriceCard').attributes.value;
    let input = document.getElementById('MenuPriceRange');
    let select = document.getElementById('selectGroup');

    document.getElementById('MaxPriceCard').innerHTML = `${maxPrice.textContent}`;
    input.value = input.max;

    for (let i = 0; i < Right.children.length; i++) {
        Right.children[i].style.display = 'block';
    };

    for (let i = 0; i < select.children.length; i++) {
        select.children[i].children[0].children[0].children[2].value = 0;
    };
};