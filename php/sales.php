<?php

if (isset($_POST['type'])) {
    $TYPE = $_POST['type'];
}

if ($TYPE == 'new') {

    if (isset($_POST['title'])) {
        $title = $_POST['title'];
    }
    
    if (isset($_POST['desc'])) {
        $desc = $_POST['desc'];
    }
    
    if (isset($_POST['id'])) {
        $id = $_POST['id'];
    }
    
    $new_item = [
        'id' => $id,
        'title' => $title,
        'description' => $desc
    ];
    
    $json_content = file_get_contents('../api/sales.json');
    $json_decoded = json_decode($json_content, true);
    
    $json_decoded['sales'][] = $new_item;
    
    $json = json_encode($json_decoded, JSON_UNESCAPED_UNICODE);
    
    file_put_contents('../api/sales.json', $json);

} else if ($TYPE == 'edit') {

    if (isset($_POST['title'])) {
        $title = $_POST['title'];
    }
    
    if (isset($_POST['desc'])) {
        $desc = $_POST['desc'];
    }
    
    if (isset($_POST['id'])) {
        $id = $_POST['id'];
    }

    $json_content = file_get_contents('../api/sales.json');
    $json_decoded = json_decode($json_content, true);

    for ($i = 0; $i < count($json_decoded['sales']); $i++) {
        $item = $json_decoded['sales'][$i];

        if ($item['id'] == $id) {
            $json_decoded['sales'][$i]['title'] = $title;
            $json_decoded['sales'][$i]['description'] = $desc;
        }
    }

    $json = json_encode($json_decoded, JSON_UNESCAPED_UNICODE);
    
    file_put_contents('../api/sales.json', $json);
} else if ($TYPE == 'delete') {

    if (isset($_POST['id'])) {
        $id = $_POST['id'];
    }

    $json_content = file_get_contents('../api/sales.json');
    $json_decoded = json_decode($json_content, true);

    for ($i = 0; $i < count($json_decoded['sales']); $i++) {
        $item = $json_decoded['sales'][$i];

        if ($item['id'] == $id) {
            unset($json_decoded['sales'][$i]);
            $json_decoded['sales'] = array_values($json_decoded['sales']);
        }
    }

    $json = json_encode($json_decoded, JSON_UNESCAPED_UNICODE);
    
    file_put_contents('../api/sales.json', $json);
}

?>