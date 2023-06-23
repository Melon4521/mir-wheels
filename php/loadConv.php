<?php
		
$doConv =  false;

ini_set('memory_limit', '500M');

if ($_FILES && $_FILES['uploaded_file_tire'] &&
$_FILES['uploaded_file_tire']['error'] == 0) {

    $nameTires = $_FILES['uploaded_file_tire']['name'];
    //	echo "<br>имя передаваемого файла = ".$nameTres."<br>";
            
    $tmpnameTires = $_FILES['uploaded_file_tire']['tmp_name'];
    //	echo "<br>временное имя = ".$tmpnameTires."<br>";

    $typeTires = $_FILES['uploaded_file_tire']['type'];
    //	echo "<br>тип передаваемого файла = ".$typeTires."<br>";
    
    $filetypeTires = mime_content_type($tmpnameTires );
    //	echo "<br>Реальный тип передаваемого файла = ".$filetypeTires."<br>";
    
    $errorTires  = $_FILES['uploaded_file_tire']['error'];
    //	echo "<br>Есть ли ошибки при передачи = ".$errorTires ."<br>";
    
    $sizeTires  = $_FILES['uploaded_file_tire']['size'];
    //	echo "<br>размер передаваемого файла = ".$sizeTires ."<br>";

    $newpath = './converter/';
            
    $fd = fopen($newpath."log.txt", 'a+') or die("не удалось создать файл");
    
    if (true) {
        $newnameTires = $nameTires;
    
        if (move_uploaded_file($tmpnameTires, $newpath.$newnameTires)) {
        //	echo 'Файл загружен <br> <img width=30% src="'.$newnameTires .' ">';
            $str = date("H:i:s d/m/Y")." - ".$newnameTires."\r\n";
        } else {
            echo 'Файл не загружен';
            echo "<br><br>";
        }

        fwrite($fd, $str);
        
        $doConv = true;

        echo "Шины - ".$nameTires;
        echo "<br><br>";
        
    } else {
        echo 'Неверный формат файла';
        echo "<br><br>";
    }
    
    fclose($fd);	  
}

if ($_FILES &&	$_FILES['uploaded_file_disk'] &&
$_FILES['uploaded_file_disk']['error'] == 0) {

    $nameDisks= $_FILES['uploaded_file_disk']['name'];
    //	echo "<br>имя передаваемого файла = ".$nameDisks."<br>";

    $tmpnameDisks = $_FILES['uploaded_file_disk']['tmp_name'];
    //	echo "<br>временное имя = ".$tmpnameDisks."<br>";

    $typeDisks = $_FILES['uploaded_file_disk']['type'];
    //	echo "<br>тип передаваемого файла = ".$typeDisks."<br>";

    $filetypeDisks  = mime_content_type($tmpnameDisks );
    //	echo "<br>Реальный тип передаваемого файла = ".$filetypeDisks."<br>";

    $errorDisks  = $_FILES['uploaded_file_disk']['error'];
    //	echo "<br>Есть ли ошибки при передачи = ".$errorDisks ."<br>";

    $sizeTires  = $_FILES['uploaded_file_disk']['size'];
    //	echo "<br>размер передаваемого файла = ".$sizeDisks ."<br>";
            
    $newpath = '../converter/';
            
    $fd = fopen($newpath."log.txt", 'a+') or die("не удалось создать файл");
    
    if (true) {
        $newnameDisks  = $nameDisks ;
    
        if (move_uploaded_file($tmpnameDisks, $newpath.$newnameDisks )) {
            //	echo 'Файл загружен <br> <img width=30% src="'.$newnameDisks .' ">';
            $str = date("H:i:s d/m/Y")." - ".$newnameDisks."\r\n";
        } else {
            echo'Файл не загружен';
            echo "<br><br>";
        }

        fwrite($fd, $str);
        $doConv = true;

        echo "Диски - ".$nameDisks;
        echo "<br><br>";
        
    } else {
        echo 'Неверный формат файла';
        echo "<br><br>";
    }

    fclose($fd);	  
}

echo "<br><br>";

if ($doConv) {
    // Первая конвертация. Шины
    $tiresXml = simplexml_load_file("./converter/".$nameTires);
    $dataTires = json_encode($tiresXml, JSON_UNESCAPED_UNICODE); 

    $tiresJsonFile = fopen("../api/tires-stage.json", "w");
    fwrite($tiresJsonFile, $dataTires);
    fclose($tiresJsonFile);

    echo "<b>Конвертация Шин завершена!</b><br><br>";

    // Вторая конвертация. Диски
    $disksXml = simplexml_load_file("./converter/".$nameDisks);
    $dataDisks = json_encode($disksXml, JSON_UNESCAPED_UNICODE); 

    $disksJsonFile = fopen("../api/disks-stage.json", "w");
    fwrite($disksJsonFile, $dataDisks);
    fclose($disksJsonFile);

    echo "<b>Конвертация Дисков завершена!</b><br><br>";

    // Завершение работы
    $jsonReadyTires = file_get_contents('../api/tires-stage.json', 'r');
    $jsonReadyDisks = file_get_contents('../api/disks-stage.json', 'r');

    $tiresOffer = json_decode($jsonReadyTires, true)['shop']['offers']['offer'];
    $disksOffer = json_decode($jsonReadyDisks, true)['shop']['offers']['offer'];

    $tiresDataString = '{'.'"tires": '.json_encode($tiresOffer, JSON_UNESCAPED_UNICODE)."}";
    $disksDataString = '{'.'"disks": '.json_encode($disksOffer, JSON_UNESCAPED_UNICODE)."}";

    $tiresDataString = str_replace('\/', '/', $tiresDataString);
    $disksDataString = str_replace('\/', '/', $disksDataString);
    $tiresDataString = str_replace('[]', '""', $tiresDataString);
    $disksDataString = str_replace('[]', '""', $disksDataString);

    $newTiresJson = fopen('../api/tires-stage.json', 'w');
    $newDisksJson = fopen('../api/disks-stage.json', 'w');

    fwrite($newTiresJson, $tiresDataString);
    fwrite($newDisksJson, $disksDataString);

    fclose($newTiresJson);
    fclose($newDisksJson);

    unlink("./converter/".$nameTires);
    unlink("./converter/".$nameDisks);

    echo '<div class="checking"></div>';
    echo "<b>Временные файлы  шин и дисков для конвертации удалены с сервера!</b><br><br>";
    echo "<b>Данные о загрузке внесены в журнал!</b><br><br>";

    echo "<br><br><b>Поздравляю, работа завершена!</b><br><br>";
    echo '<a href = "http://mir-wheels.ru">Перейти в магазин</a>';
}

?>