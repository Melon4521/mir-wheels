<?php
/* Здесь проверяется существование переменных */
if (isset($_POST['name'])) {
    $name = $_POST['name'];
}

if (isset($_POST['phone'])) {
    $phone = $_POST['phone'];
}

if (isset($_POST['emailCl'])) {
    $emailCl = $_POST['emailCl'];
}

if (isset($_POST['car_marka'])) {
    $carMarka = $_POST['car_marka'];
}

if (isset($_POST['car_model'])) {
    $carModel = $_POST['car_model'];
}

if (isset($_POST['comment'])) {
    $userComment = $_POST['comment'];
}

/* Сюда впишите свою эл. почту */
$myaddress = "kuznetsov.neon-x@yandex.ru,vlad123kyz@gmail.com";
/* Сюда впишите эл. почту магазина */
$shopEmail = 'shop@mir-wheels.ru';

// Письмо в магазин с заказом

/* А здесь прописывается текст сообщения, \n - перенос строки */
$message = "Запись на услугу в магазине mir-wheels.ru\n
==========================================\n\n
Имя: $name\n
Телефон: $phone\n
E-mail: $emailCl\n
==========================================\n\n
Услуга: Шиномонтаж
Данные пользователя:\n
Марка авто: $carMarka\n
Модель авто: $carModel\n
Комментарий: \n$userComment\n
";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$sub = 'Service'; // тема
$send = mail($myaddress, $sub, $message, "Content-type:text/plain; Reply-To:no-reply@****.ru; Content-Transfer-Encoding: utf-8; charset = UTF-8\r\nFrom:$emailCl");

// Письмо отправителю о заказе
 
/* А здесь прописывается текст сообщения, \n - перенос строки */
$mes2 = "Вы отправили заказ в mir-wheels.ru\n
==========================================\n\n
Имя: $name\n
Телефон: $phone\n
E-mail: $emailCl\n
==========================================\n\n
Услуга: Шиномонтаж
Данные пользователя:\n
Марка авто: $carMarka\n
Модель авто: $carModel\n
Комментарий: \n$userComment\n
";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$send = mail($emailCl, $sub, $mes2, "Content-type:text/plain; charset = UTF-8\r\nFrom:$shopEmail");

ini_set('short_open_tag', 'On');
header('Refresh: 5; URL = https://tires.intermir.ru/index.html');

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="5; url = index.html">
    <title>Спасибо за заказ!</title>
    <script type="text/javascript">
        setTimeout("location.replace('https://tires.intermir.ru/index.html')", 5000);
    </script>
</head>
<body>
    <div style="max-width: 1000px; padding: 0 15px; margin: 0 auto; text-align: center;">
		<h1 style="font-size: 40px;">Спасибо за заказ!</h1>
		<p style="font-size: 20px;">В ближайшее время с Вами свяжутся.</p>
	    <p style="font-size: 18px;">Вас перенаправят на страницу магазина через 5 секунд</p>
    </div>
</body>
</html>