<?php

require_once("../basics.php");

// DON't CONNECT TO EVERNOTE UNLESS THERE ARE ITEMS TO ADD - CHECK RiL FIRST!!!!
require_once("connect.php");

// Connect to Evernote *********************************************************

$user = $authResult->user;
$authToken = $authResult->authenticationToken;

$noteStoreHttpClient = new THttpClient($evernoteHost, $evernotePort, "/edam/note/" . $user->shardId, $evernoteScheme);
$noteStoreProtocol = new TBinaryProtocol($noteStoreHttpClient);
$noteStore = new NoteStoreClient($noteStoreProtocol, $noteStoreProtocol);

$notebooks = $noteStore->listNotebooks($authToken);

// Select Notebook *************************************************************

foreach ($notebooks as $notebook) {
  echo "    * " . $notebook->name . $notebook->guid . "!\n";
  if ($notebook->name == "joegattdev's notebook") {
    $notebookGuid = $notebook->guid;
  }
}

$con = mysql_connect("localhost","root","itTienI10");
if (!$con) {
  die(print 'Could not connect: ' . mysql_error() . '\n');
}

mysql_select_db("joegatt-net-dev", $con);

$ril_json = file("https://readitlaterlist.com/v2/get?username=joegatt&password=harmony&apikey=111g8B3dpOR46V6cQ4TG84bk03A2rnn6&since=0");

foreach($ril_json as $key=>$value) { 
  echo $key.": ".$value; 
} 

#echo $ril_json;


mysql_close($con);

?>
