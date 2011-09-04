<?php

  ini_set("include_path", ini_get("include_path") . PATH_SEPARATOR . "../lib/php" . PATH_SEPARATOR . "../src/php" . PATH_SEPARATOR);

  if(isset($_SERVER['SERVER_NAME'])) {

    DEFINE("SERVER_NAME",$_SERVER['SERVER_NAME']);
    if (SERVER_NAME == 'joegatt.net' || SERVER_NAME == 'v2.joegatt.net' || SERVER_NAME == 'preview.joegatt.net') {
       DEFINE("DATABASE","joegatt-net-production-v2");
    } else if (SERVER_NAME == 'test.joegatt.org') {
       DEFINE("DATABASE","joegatt-net-test");
    } else {
       DEFINE("DATABASE","joegatt-net-dev");
    }

  } else {

    preg_match('@(/www/)([^/]+)(/)@i', getcwd(), $matches);
    $current = $matches[2];

    if ($current == 'production-v2') {
       DEFINE("SERVER_NAME",'joegatt.net');
       DEFINE("DATABASE","joegatt-net-production-v2");
    } else if ($current == 'test') {
       DEFINE("SERVER_NAME",'test.joegatt.org');
       DEFINE("DATABASE","joegatt-net-test");
    } else if ($current == 'dev') {
       DEFINE("SERVER_NAME",'dev.joegatt.org');
       DEFINE("DATABASE","joegatt-net-dev");
    } else {
       DEFINE("SERVER_NAME",'dropbox.joegatt.org');
       DEFINE("DATABASE","joegatt-net-dev");
    }
  
  }

  if (preg_match('/joegatt-net/',SERVER_NAME)) {
    require_once("D://Documents/Websites/_db_passwords/joegatt-net/passwords.php");
  } else {
    require_once("/home/admin/_db_passwords/joegatt-net/passwords.php");
  }

  function connect_db(){
    $con = mysql_connect("localhost",DB_USERNAME,DB_PASSWORD);
    if (!$con) {
      die(print 'Could not connect: ' . mysql_error() . '\n');
    }
    mysql_select_db(DATABASE, $con);
    return $con;
  }
  
  function disconnect_db($con){
    mysql_close($con);
  }

?>
