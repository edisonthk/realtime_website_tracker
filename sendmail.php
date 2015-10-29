<?php

include 'vendor/autoload.php';

$query = array_key_exists("q", $_GET) ? $_GET["q"] : "";


// // initial
// $transport = Swift_SmtpTransport::newInstance('localhost', 8000);
// $mailer = Swift_Mailer::newInstance($transport);

// // mail
// $message = Swift_Message::newInstance()
//   ->setSubject('EmailTracker Project')
//   ->setTo(array('edisonthk@gmail.com'))
//   ->setBody('Message: '.$_GET["q"] );

// $numSent = $mailer->send($message);


echo $query;