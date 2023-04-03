let root = document.querySelector("#root");

function render() {

    root.innerHTML = /*html*/`
    <div class="wrapper">

        <!-- HEADER -->
        <header class="header lock-padding">
            <div class="header__container top-header">
                <div class="top-header__logo header-logo">
                    <img class="header-logo__img" width="70" src="../images/Logo-2.png" alt="Логотип">
                    <div class="logo__text">
                        <h3 class="header-logo__title">Мир колёс</h3>
                        <h4 class="header-logo__subtitle">шины и диски</h4>
                    </div>
                </div>
                <div class="top-header__menu top-menu">
                    <a class="top-menu__tel" href="http://mir-wheels.ru">Вернуться на сайт</a>
                </div>
            </div>
        </header>
        
        <!-- MAIN -->
        <main class="main">

            <div class="load">
                <div class="load__container">
                    <form class="load__form" method="post" enctype="multipart/form-data">
                    
                        <h1 class="load__title _title">Загрузка данных на сайт</h1>
                        <div class="load__conv conv">
                            <div class="conv__item">
                                <h3 class="conv__title">Шины</h3>
                                <input class="conv__input" id="tires" type="file" name="uploaded_file_tire">
                            </div>
                            <div class="conv__item">
                                <h3 class="conv__title">Диски</h3>
                                <input class="conv__input" id="disks" type="file" name="uploaded_file_disk">
                            </div>
                        </div>
                        <div class="load__finish">
                            <button class="load__button _button block" type="submit">Конвертация и выгрузка в базу</button>
                        </div>

                    </form>
                </div>
            </div>

            <div class="guide">
                <div class="guide__container">

                    <div class="guide__item guide-item">
                        <h2 class="guide__title _title">Инструкция</h2>
                        <div class="guide-item__image" style="margin-bottom: 40px;">
                            <img src="../images/admin-1.jpg" alt="Загрузка шин и дисков">
                        </div>
                        <div class="guide-item__text" style="margin-bottom: 0; text-align: center;">
                            Скачайте файлы шин и дисков с сайта TyreOpt.ru
                        </div>
                    </div>

                    <div class="guide__item guide-item">
                        <h2 class="guide__title _title">Загрузка файла Шин</h2>
                        <div class="guide-item__text">
                            <div style="margin-bottom: 15px">
                                Для загрузки файла Шин нажмите на ссылку в столбце “Выгрузка“ в таблице “Шины”.
                            </div>
                            
                            Обратите внимание на:
                            <ol style="margin-left: 19px;">
                                <li>
                                    Столбец “Название”, в названии должно присутствовать “с изображениями”.
                                </li>
                                <li>
                                    Столбец “Формат”, там должно быть написано “XML”.
                                </li>
                                <li>
                                    Столбец “Дата генерации”, дата должа быть свежая.
                                </li>
                            </ol>
                        </div>
                        <div class="guide-item__image">
                            <img src="../images/admin-tires.jpg" alt="Загрузка шин">
                        </div>
                    </div>

                    <div class="guide__item guide-item">
                        <h2 class="guide__title _title">Загрузка файла Дисков</h2>
                        <div class="guide-item__text">
                            <div style="margin-bottom: 15px">
                                Для загрузки файла Дисков нажмите на ссылку в столбце “Выгрузка“ в таблице “Диски”.
                            </div>
                            
                            Обратите внимание на:
                            <ol style="margin-left: 19px;">
                                <li>
                                    Столбец “Название”, в названии должно присутствовать “с изображениями”.
                                </li>
                                <li>
                                    Столбец “Формат”, там должно быть написано “XML”.
                                </li>
                                <li>
                                Столбец “Дата генерации”, дата должа быть свежая.
                                </li>
                            </ol>
                        </div>
                        <div class="guide-item__image">
                            <img src="../images/admin-disks.jpg" alt="Загрузка дисков">
                        </div>
                    </div>

                </div>
            </div>

        </main>
        
        <!-- FOOTER -->
        <footer class="footer"></footer>

    </div>
    `

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
}

if (root.innerHTML != /*html*/`
    <!-- HEADER -->
    <header class="header lock-padding">
        <div class="header__container top-header">
            <div class="top-header__logo header-logo">
                <img class="header-logo__img" width="70" src="../images/Logo-2.png" alt="Логотип">
                <div class="logo__text">
                    <h3 class="header-logo__title">Мир колёс</h3>
                    <h4 class="header-logo__subtitle">шины и диски</h4>
                </div>
            </div>
            <div class="top-header__menu top-menu">
                <a class="top-menu__tel" href="http://mir-wheels.ru">Вернуться на сайт</a>
            </div>
        </div>
    </header>
`) {
    document.getElementById("formregister").addEventListener("submit", (event) => {
        event.preventDefault();
    });
    
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
    };
    
    root.addEventListener("keyup", () => {
        if (
            document.querySelector("#login").value &&
            document.querySelector("#password").value
        ) {
            document.querySelector("#egsit").classList.remove("block");
        } else {
            document.querySelector("#egsit").classList.add("block");
        }
    });
    
    document.querySelector("#egsit").addEventListener("click", (e) => {
        if (
            document.querySelector("#login").value.hashCode() == "6254155" &&
            document.querySelector("#password").value.hashCode() == "-367044297"
        ) {
            render();
        }
    });
}