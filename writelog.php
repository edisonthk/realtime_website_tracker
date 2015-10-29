<?php

include 'vendor/autoload.php';

$action = array_key_exists("q", $_GET) ? $_GET["q"] : "";
if(!empty($action)) {
    $data = date('Y-m-d H:i:s').'   '.$action."\n";

    file_put_contents("./action.log", $data ,FILE_APPEND);    
}