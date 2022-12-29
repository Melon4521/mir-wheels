let root = document.querySelector("#root");

function render() {
    /*
    `<div id='upload'>
        <form method="post" enctype="multipart/form-data">
            <!--enctype="multipart/form-data" чтобы передовалось не только имя файла но и его содержимое-->
            <div class='title'>
                Загрузка данных на сайт
            </div>

            <div>
                <span>ШИНЫ</span>
                <input class='file' type="file" name="uploaded_file_tire" value="good" />
            </div>

            <div>
                <span>ДИСКИ</span>
                <input class='file' type="file" name="uploaded_file_disk" value="good" />
            </div>
            
            <button type="submit">Конвертация и выгрузка в базу</button>
        </form>
    </div>
    `;
    */

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
                console.log(counter);
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