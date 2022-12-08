<?php  

// Первая конвертация. Шины

$tiresXml = simplexml_load_file('tires0812.xml');
//$dataTires = json_encode($tiresXml, JSON_UNESCAPED_UNICODE); 
//$dataTires = mb_convert_encoding($dataTires, "KOI8-R", "UTF-8");

$dataTires = mb_convert_encoding($dataTires, "UTF-8", "UTF-8");
$dataTires = json_encode($tiresXml, JSON_UNESCAPED_UNICODE); 

$tiresJsonFile = fopen("tires-stage.json", "w");
fwrite($tiresJsonFile, $dataTires);
fclose($tiresJsonFile);

echo "<b>Конвертация Шин завершена!</b><br><br>";
print_r($dataTires);

// Вторая конвертация. Диски

$disksXml = simplexml_load_file('disks0812.xml');
$dataDisks = json_encode($disksXml, JSON_UNESCAPED_UNICODE); 
$dataDisks = mb_convert_encoding($dataDisks, "KOI8-R", "UTF-8");

$disksJsonFile = fopen("disks-stage.json", "w");
fwrite($disksJsonFile, $dataDisks);
fclose($disksJsonFile);

echo "<b>Конвертация Дисков завершена!</b><br><br>";
// print_r($dataDisks);

// Объединение в один файл

$jsonReadyTires = file_get_contents('tires-stage.json', 'r');
//print_r($jsonReadyTires);
$jsonReadyDisks = file_get_contents('disks-stage.json', 'r');
//print_r($jsonReadyDisks);

$tiresOffer = json_decode($jsonReadyTires, true)['shop']['offers']['offer'];
echo $tiresOffer;




//
//$disksOffer = json_decode($jsonReadyDisks, true)['shop']['offers']['offer'];
//
//$dataString = '{'.'"tires": '.json_encode($tiresOffer, JSON_UNESCAPED_UNICODE).",".'"disks": '.json_encode($disksOffer, JSON_INVALID_UTF8_IGNORE)."}";
//
//$dataString = str_replace('\/', '/', $dataString);
//
//
//
//$newJsonFile = fopen('dataBase7.json', 'w');
//fwrite($newJsonFile, $dataString);
//
//echo "<br><br><b>Поздравляю, работа завершена!</b><br><br>";
//
//fclose($newJsonFile);
//



?>







