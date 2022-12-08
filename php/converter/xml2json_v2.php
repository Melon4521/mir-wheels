<?php  

ini_set('memory_limit', '500M');

// Первая конвертация. Шины
$tiresXml = simplexml_load_file('tires0812.xml');
$dataTires = json_encode($tiresXml, JSON_UNESCAPED_UNICODE); 

$tiresJsonFile = fopen("../../api/tires-stage.json", "w");
fwrite($tiresJsonFile, $dataTires);
fclose($tiresJsonFile);

echo "<b>Конвертация Шин завершена!</b><br><br>";

// Вторая конвертация. Диски
$disksXml = simplexml_load_file('disks0812.xml');
$dataDisks = json_encode($disksXml, JSON_UNESCAPED_UNICODE); 

$disksJsonFile = fopen("../../api/disks-stage.json", "w");
fwrite($disksJsonFile, $dataDisks);
fclose($disksJsonFile);

echo "<b>Конвертация Дисков завершена!</b><br><br>";

// Объединение в один файл
$jsonReadyTires = file_get_contents('../../api/tires-stage.json', 'r');
$jsonReadyDisks = file_get_contents('../../api/disks-stage.json', 'r');

$tiresOffer = json_decode($jsonReadyTires, true)['shop']['offers']['offer'];
$disksOffer = json_decode($jsonReadyDisks, true)['shop']['offers']['offer'];

$tiresDataString = '{'.'"tires": '.json_encode($tiresOffer, JSON_UNESCAPED_UNICODE)."}";
$disksDataString = '{'.'"disks": '.json_encode($disksOffer, JSON_UNESCAPED_UNICODE)."}";

$tiresDataString = str_replace('\/', '/', $tiresDataString);
$disksDataString = str_replace('\/', '/', $disksDataString);

$newTiresJson = fopen('../../api/tires-stage.json', 'w');
$newDisksJson = fopen('../../api/disks-stage.json', 'w');

fwrite($newTiresJson, $tiresDataString);
fwrite($newDisksJson, $disksDataString);

fclose($newTiresJson);
fclose($newDisksJson);

echo "<br><br><b>Поздравляю, работа завершена!</b><br><br>";

?>