<?php

require_once 'vendor/autoload.php';

use UAParser\Parser;

$action = array_key_exists("q", $_GET) ? $_GET["q"] : "";

if(!empty($action)) {

    $parser = Parser::create();
    $result = $parser->parse($_SERVER['HTTP_USER_AGENT']);

    $data = date('Y-m-d H:i:s')."\t".specificLengthWords($result->os->family ,6)."\t".specificLengthWords($result->ua->family ,6)."\t".$action."\n";

    file_put_contents("./action.log", $data ,FILE_APPEND);    
}

function specificLengthWords($word, $len)
{
    return substr($word."              ", 0,$len);
}