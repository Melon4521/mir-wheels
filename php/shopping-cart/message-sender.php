<?php

$error = true;
$secret = '6Leq0bsjAAAAALen1FnPr9uIt7LVFpyDJnRUGaxj';
 
if (!empty($_POST['g-recaptcha-response'])) {
    $out = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
    $out = json_decode($out);
    if ($out->success == true) {
        $error = false;
    } 
}
 
if ($error) {
    echo 'Ошибка заполнения капчи.';
} else {
    /* Здесь проверяется существование переменных */
    if (isset($_POST['name'])) {
        $name = $_POST['name'];
    }

    if (isset($_POST['phone'])) {
        $phone = $_POST['phone'];
    }

    if (isset($_POST['mail'])) {
        $emailCl = $_POST['mail'];
    }

    if (isset($_POST['cart'])) {
        $cart = $_POST['cart'];
    }

    /* Сюда впишите свою эл. почту */

    // $myaddress = "mirkoles61@yandex.ru, belozerov.o.s@yandex.ru";
    $myaddress = "kuznetsov.neon-x@yandex.ru";

    /* Сюда впишите эл. почту магазина */
    $shopEmail = 'mirkoles61@yandex.ru';

    // Письмо в магазин с заказом

    /* А здесь прописывается текст сообщения, \n - перенос строки */
    $mes1 = "Заказ в магазине mir-wheels.ru\n
    ==========================================\n
    Имя: $name\n
    Телефон: $phone\n
    E-mail: $emailCl\n
    ==========================================\n
    Данные корзины:\n
    $cart
    ";

    /* А эта функция как раз занимается отправкой письма на указанный вами email */
    $sub = 'Order'; // тема
    $send = mail($myaddress, $sub, $mes1, "Content-type:text/plain; Reply-To:no-reply@****.ru; Content-Transfer-Encoding: utf-8; charset = UTF-8\r\nFrom:$shopEmail");

    // Письмо отправителю о заказе

    /* А здесь прописывается текст сообщения, \n - перенос строки */
    $mes2 = "Вы отправили заказ в mir-wheels.ru\n
    ==========================================\n
    Имя: $name\n
    Телефон: $phone\n
    E-mail: $emailCl\n
    ==========================================\n
    Данные корзины:\n
    $cart
    ";

    /* А эта функция как раз занимается отправкой письма на указанный вами email */
    $send = mail($emailCl, $sub, $mes2, "Content-type:text/plain; charset = UTF-8\r\nFrom:$shopEmail");

    ini_set('short_open_tag', 'On');
    // header('Refresh: 5; URL = http://mir-wheels.ru');
}

?>