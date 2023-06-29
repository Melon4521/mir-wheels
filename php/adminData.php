<?php

$is_auth = false;

$choise_menu = '
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
                <a class="top-menu__tel" href="http://mir-wheels.ru">В магазин</a>
            </div>
        </div>
    </header>

    <!-- MAIN -->
    <main class="main">

        <div class="choise">
            <div class="choise__container">
                <h1 class="choise__title _title">Меню выбора</h1>
                <div class="choise__body">

                    <div class="choise__item choise-item" id="loadConvertation">
                        <div class="choise-item__image choise-item__image-1">
                            <div class="choise-item__layer"></div>
                        </div>
                        <div class="choise-item__text">
                            <span>Загрузка данных на сайт</span>
                        </div>
                    </div>

                    <div class="choise__item choise-item" id="loadSales">
                        <div class="choise-item__image choise-item__image-2">
                            <div class="choise-item__layer"></div>
                        </div>
                        <div class="choise-item__text">
                            <span>Акции</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </main>

    <!-- FOOTER -->
    <footer class="footer"></footer>

    </div>
';

$load_conv = '
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
                <a class="top-menu__tel" id="BackToChoiseMenuBtn" href="#">Меню выбора</a>
                <a class="top-menu__tel" href="http://mir-wheels.ru">В магазин</a>
            </div>
        </div>
    </header>

    <!-- MAIN -->
    <main class="main">

        <div class="load">
            <div class="load__container">
                <form class="load__form" id="loadForm" method="POST" enctype="multipart/form-data" action="#">
                
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
';

$load_conv_finished = '
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
                    <a class="top-menu__tel" id="BackToChoiseMenuBtn" href="#">Меню выбора</a>
                    <a class="top-menu__tel" href="http://mir-wheels.ru">В магазин</a>
                </div>
            </div>
        </header>

        <!-- MAIN -->
        <main class="main">

            <div class="load-finished">
                <div class="load-finished__container">
                    <h1 class="load-finished__title _title">Загрузка данных на сайт</h1>
                    <div class="load-finished__output"></div>
                </div>
            </div>

        </main>

        <!-- FOOTER -->
        <footer class="footer"></footer>

    </div>
';

$sales = '
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
                <a class="top-menu__tel" id="BackToChoiseMenuBtn" href="#">Меню выбора</a>
                <a class="top-menu__tel" href="http://mir-wheels.ru">В магазин</a>
            </div>
        </div>
    </header>

    <!-- MAIN -->
    <main class="main">

        <div class="main__sales sales">
            <div class="sales__container">
                <h1 class="sales__title _title">Редактирование акций</h1>
                <div class="sales__items" id="sales">
                    <!-- Sales will be shown here -->
                </div>
                <div class="sales__button-container">
                    <button class="sales__button _button" id="salesAddBtn">Добавить акцию</button>
                </div>
            </div>
        </div>

    </main>

    <!-- FOOTER -->
    <footer class="footer"></footer>

    </div>
';

if (isset($_POST['isAuth'])) {
    if ($_POST['isAuth'] === 'true') {
        $is_auth = true;
    }
}

$resault = [
    "isAuth" => $is_auth,
    "choiseMenu" => $choise_menu,
    "loadConv" => $load_conv,
    "loadConvFinished" => $load_conv_finished,
    "sales" => $sales,
];

$resault = json_encode($resault);

print_r($resault);

?>