<?php

  ini_set("include_path", ini_get("include_path") . PATH_SEPARATOR . "../lib/php" . PATH_SEPARATOR . "../src/php" . PATH_SEPARATOR);

  //Not good enough - this will always be unset when not run on Apache (via cron)
  //(Needs to read directory)
  //if(isset($_SERVER['SERVER_NAME'])) {
  //  DEFINE("SERVER_NAME",$_SERVER['SERVER_NAME']);
  //} else {
  //  DEFINE("SERVER_NAME","localhost");
  //}
  DEFINE("SERVER_NAME","dropbox.joegatt.org");

  if (SERVER_NAME == 'joegatt.net' || SERVER_NAME == 'v2.joegatt.net') {
    DEFINE("DATABASE","joegatt-net-production-v2");
  } else if (preg_match('/joegatt-net/',SERVER_NAME)) {
    DEFINE("DATABASE","live");
  } else if (SERVER_NAME == 'test.joegatt.org') {
    DEFINE("DATABASE","joegatt-net-test");
  } else if (SERVER_NAME == 'preview.joegatt.org') {
    DEFINE("DATABASE","joegatt-net-preview");
  } else {
    DEFINE("DATABASE","joegatt-net-dev");
  }
  
  //PUT THESE UNDER /tmp ?
  
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
