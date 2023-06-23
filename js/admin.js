let root = document.querySelector("#root");
let authForm = document.querySelector('#authForm');
let authInputLogin = document.querySelector("#authInputLogin");
let authInputPw = document.querySelector("#authInputPw");
let enterBtn = document.querySelector("#enterBtn");

String.prototype.hashCode = function () {
    var hash = 0,
        i,
        chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 100) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

// Вход
authForm.addEventListener('submit', sendForm);

async function sendForm(e) {
    e.preventDefault();

    let error = formValidate(authForm);

    if (error === 0) {
        authForm.classList.add('_sending');
        if (
            authInputLogin.value.hashCode() == "6254155" &&
            authInputPw.value.hashCode() == "-367044297"
        ) {
            let formData = new FormData();
            formData.append('isAuth', true);

            let response = await fetch('./adminData.php', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                let answer = await response.json();

                let receivedData = {
                    isAuth: answer.isAuth,
                    choiseMenu: answer.choiseMenu,
                    loadConv: answer.loadConv,
                    loadConvFinished: answer.loadConvFinished,
                    sales: answer.sales,
                }

                authForm.classList.remove('_sending');

                render(root, receivedData.choiseMenu);

                document.addEventListener('click', function (e) {
                    let targetElement = e.target;

                    // Загрузка данных на сайт
                    if (targetElement.closest("#loadConvertation") && receivedData.isAuth) {
                        render(root, receivedData.loadConv);

                        let inputButton = root.querySelector('.load__button'),
                            inputs = root.querySelectorAll('.conv__input'),
                            counter = 0;
    
                        inputs.forEach(input => {
                            input.addEventListener('change', function () {
                                if (this.value) {
                                    counter++;
                                    
                                    if (counter >= 2) {
                                        if (inputButton.classList.contains('block')) {
                                            inputButton.classList.remove('block')
                                        }
                                    }
                                }
                            });
                        });

                        let loadForm = document.querySelector('#loadForm');

                        loadForm.addEventListener('submit', sendLoadForm);

                        async function sendLoadForm(e) {
                            e.preventDefault();

                            let loadFormData = new FormData(loadForm);

                            loadForm.classList.add('_sending');

                            let response = await fetch('./loadConv.php', {
                                method: 'POST',
                                body: loadFormData
                            });
                    
                            if (response.ok) {
                                let answer = await response.text();
                                render(root, receivedData.loadConvFinished)
                                document.querySelector('.load-finished__output').innerHTML = answer;
                                loadForm.classList.remove('_sending');
                            } else {
                                alert('Ошибка');
                                loadForm.classList.remove('_sending');
                            }
                        }
                    }

                    // Меню выбора
                    if (
                        targetElement.attributes.id &&
                        targetElement.attributes.id.value === "BackToChoiseMenuBtn" &&
                        receivedData.isAuth
                    ) {
                        render(root, receivedData.choiseMenu);
                    }

                    // Загрузка акций
                    if (targetElement.closest("#loadSales") && receivedData.isAuth) {
                        render(root, receivedData.sales);

                        async function loadSales() {
                            let response = await fetch('../api/sales.json', {
                                method: 'POST'
                            });

                            if (response.ok) {
                                let myJson = await response.json();
                        
                                let placeGeneration = document.querySelector('#sales');
                            
                                placeGeneration.innerHTML = '';
                        
                                for (let i = 0; i < myJson.sales.length; i++) {
                                    const sale = myJson.sales[i];
                        
                                    placeGeneration.innerHTML += /*html*/ `
                                        <div class="sales__item sales-item" data-id="${sale.id}">
                                            <h2 class="sales-item__title">${sale.title}</h2>
                                            <div class="sales-item__text">${sale.description}</div>
                                            <div class="sales-item__btns">
                                                <a href="#" class="sales-item__btn salesBtnEdit" data-id="${sale.id}">
                                                    Редактировать
                                                </a>
                                                <a href="#" class="sales-item__btn salesBtnDelete" data-id="${sale.id}">
                                                    Удалить
                                                </a>
                                            </div>
                                        </div>
                                    `;
                                }
                            } else {
                                alert('Ошибка');
                            }
                        }
                        
                        loadSales();

                        document.querySelector('.sales').addEventListener('click', function (e) {
                            let targetElement = e.target;

                            // Добавление акции
                            if (targetElement.attributes.id &&
                                targetElement.attributes.id.value == "salesAddBtn" &&
                                receivedData.isAuth) {
                                newSale();

                                async function newSale() {
                                    let saleTitle = prompt('Введите название Акции:'),
                                    saleDescription = prompt('Введите описание Акции:'),
                                    saleID,
                                    saleData = new FormData();

                                    let response1 = await fetch('../api/sales.json', {
                                        method: 'POST'
                                    }),
                                        maximum = 0

                                    // Определение ID элемента
                                    if (response1.ok) {
                                        let myJson = await response1.json();

                                        for (let i = 0; i < myJson.sales.length; i++) {
                                            const sale = myJson.sales[i];

                                            if (sale.id > maximum) {
                                                maximum = sale.id
                                            }
                                        }

                                        saleID = +maximum+1;
                                    } else {
                                        alert("Ошибка");
                                    }

                                    saleData.append('title', saleTitle);
                                    saleData.append('desc', saleDescription);
                                    saleData.append('id', saleID);
                                    saleData.append('type', 'new');

                                    let response2 = await fetch('./sales.php', {
                                        method: 'POST',
                                        body: saleData
                                    });

                                    if (response2.ok) {
                                        loadSales();
                                    } else {
                                        alert("Ошибка");
                                    }
                                }
                            }

                            // Редактирование акции
                            if (targetElement.classList.contains('salesBtnEdit') && receivedData.isAuth) {
                                e.preventDefault()
                                let id = targetElement.dataset.id;
                                editSale(id);

                                async function editSale(id) {
                                    let saleTitle = prompt('Введите новое название Акции:'),
                                    saleDescription = prompt('Введите новое описание Акции:'),
                                    saleID = id,
                                    saleData = new FormData();

                                    saleData.append('title', saleTitle);
                                    saleData.append('desc', saleDescription);
                                    saleData.append('id', saleID);
                                    saleData.append('type', 'edit');

                                    let response2 = await fetch('./sales.php', {
                                        method: 'POST',
                                        body: saleData
                                    });

                                    if (response2.ok) {
                                        loadSales();
                                    } else {
                                        alert("Ошибка");
                                    }
                                }
                            }

                            // Удаление акции
                            if (targetElement.classList.contains('salesBtnDelete') && receivedData.isAuth) {
                                e.preventDefault()
                                let id = targetElement.dataset.id;
                                deleteSale(id);

                                async function deleteSale(id) {
                                    let saleData = new FormData();

                                    saleData.append('id', id);
                                    saleData.append('type', 'delete');

                                    let response2 = await fetch('./sales.php', {
                                        method: 'POST',
                                        body: saleData
                                    });

                                    if (response2.ok) {
                                        loadSales();
                                    } else {
                                        alert("Ошибка");
                                    }
                                }
                            }
                        });
                    }
                });
            } else {
                alert('Ошибка');
                authForm.classList.remove('_sending');
            }
        } else {
            alert('Ошибка');
            authForm.classList.remove('_sending');
        }
    } else {
        alert('Заполните обязательные поля')
    }
}

function render(container, content) {
    container.innerHTML = content
}