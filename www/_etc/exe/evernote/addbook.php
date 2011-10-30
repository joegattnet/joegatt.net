<html>
<head>
	<title>ISBN DB</title>
</head>

<body>
		<?php

require_once("../basics.php");
require_once("connect.php");
require_once('../src/php/titlecase.php');
		
$isbnQuery = $_GET['isbnQuery'];
$evernote = $_GET['evernote'];

if ($isbnQuery != '' && $evernote != 'true') {

  $url = "http://isbndb.com/api/books.xml?access_key=3Z8MOLOU&index1=isbn&value1=" . $isbnQuery; 
  $raw = file_get_contents($url); 
  $xml = new SimpleXmlElement($raw);
  
  $isbn = $xml->BookList->BookData['isbn'];
  $isbn13 = $xml->BookList->BookData['isbn13'];
  $title = titleCase($xml->BookList->BookData->Title);
  $titleLong = titleCase($xml->BookList->BookData->TitleLong);
  $author = titleCase($xml->BookList->BookData->AuthorsText);
  $publisher = titleCase($xml->BookList->BookData->PublisherText);

  $filename = "http://www4.alibris-static.com/isbn/" . $isbn13. ".gif";
  
  preg_match('/([\w]+) ([\w]+)/', $author, $matches);
  $authorFirstname = $matches[1];
  $authorSurname = $matches[2];
  
  preg_match('/(\d{4})/', $publisher, $matches);
  $year = $matches[0];
  
  print "<img src='$filename' valign='top'>";
  
  print "<textarea style='width:500px;height:300px;marginleft:20px'>$raw</textarea>";
  print "<p><a href='http://www.worldcat.org/isbn/" . $isbn . "' target='_blank'>WorldCat</a> | <a href='http://books.google.co.uk/books?vid=ISBN" . $isbn . "' target='_blank'>Google Books</a></p>";
  print "<hr>";
  
  print "<form>";
  print "<input name='title' value='$title'> (title)<br>";
  print "<input name='titleLong' value='$titleLong'> (long title)<br>";
  print "<input name='authorFirstname' value='$authorFirstname'> (author first name)<br>";
  print "<input name='authorSurname' value='$authorSurname'> (author surname)<br>";
  print "<input name='publisher' value='$publisher'> (publisher)<br>";
  print "<input name='city' value='$city'> (city)<br>";
  print "<input name='year' value='$year'> (year)<br>";
  print "<input name='yearOriginal' value='$yearOriginal'> (year original)<br>";
  print "<input name='isbn' value='$isbn'> (isbn)<br>";
  print "<input name='isbn13' value='$isbn13' type='hidden'>";
  print "<input name='evernote' value='true' type='hidden'>";
  print "<input type='submit' value='Add to Evernote'>";
  print "<form><hr>";
  
}

  // Connect to Evernote *********************************************************
  
  if ($evernote == 'true') {
  
  $title = $_GET['title'];
  $titleLong = $_GET['titleLong'];
  $authorFirstname = $_GET['authorFirstname'];
  $authorSurname = $_GET['authorSurname'];
  $publisher = $_GET['publisher'];
  $year = $_GET['year'];
  $yearOriginal = $_GET['yearOriginal'];
  $city = $_GET['city'];
  $isbn = $_GET['isbn'];
  $isbn13 = $_GET['isbn13'];

  if ($titleLong != '') {
    $titleFull = $titleLong;
  } else {
    $titleFull = $title;
  }

  if ($yearOriginal == '') {
    $yearOriginal = $year;
  }

  if ($year == '') {
     $year = $yearOriginal;
  }

    $filename = "http://www4.alibris-static.com/isbn/" . $isbn13. ".gif";
    
    $body = "$authorSurname, $authorFirstname: $titleFull ($publisher, $city, $yearOriginal/$year) ISBN $isbn";
    
    $tags = array("_exp", "_books", "__PREVIEW", "__AUTO", "$authorSurname $yearOriginal: $title");

    $user = $authResult->user;
    $authToken = $authResult->authenticationToken;
    
    $noteStoreHttpClient = new THttpClient($evernoteHost, $evernotePort, "/edam/note/" . $user->shardId, $evernoteScheme);
    $noteStoreProtocol = new TBinaryProtocol($noteStoreHttpClient);
    $noteStore = new NoteStoreClient($noteStoreProtocol, $noteStoreProtocol);
    
    $notebooks = $noteStore->listNotebooks($authToken);
    
    // Select Notebook *************************************************************
    
    foreach ($notebooks as $notebook) {
      //$notebookName = 'joegattdev's notebook';
      $notebookName = 'joegatt.net';
      if ($notebook->name == $notebookName) {
        $notebookGuid = $notebook->guid;
        print "<p>Creating a new note in notebook:  " . $notebook->name . "<p>";
      }
    }
  
  $handle = fopen($filename, "rb");
  $image = stream_get_contents($handle);
  fclose($handle);
  
  $hash = md5($image, 1);
  $hashHex = md5($image, 0);
  
  $data = new edam_type_Data();
  $data->size = strlen($image);
  $data->bodyHash = $hash;
  $data->body = $image;
  
  $resource = new edam_type_Resource();
  $resource->mime = "image/gif";
  $resource->data = $data;
  $resource->attributes = new edam_type_ResourceAttributes();
  $resource->attributes->fileName = $filename;
  
  $note = new edam_type_Note();
  $note->title = $title;
  $note->content =
    '<?xml version="1.0" encoding="UTF-8"?>' .
    '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">' .
    '<en-note>' . $body . '<br/>' .
    '<en-media type="image/gif" hash="' . $hashHex . '"/>' .
    '</en-note>';
  $note->notebookGuid = $notebookGuid;
  $note->tagNames = $tags;
  $note->resources = array( $resource );
  
  $createdNote = $noteStore->createNote($authToken, $note);
  
  print $body;
  print "<p>Successfully created a new note with GUID: " . $createdNote->guid . "</p>";
  print "<p><img src='$filename'></p>";


  }

?>
<form>
  <input name="isbnQuery" autofocus="autofocus">
  <input type="submit">
</form>

</body>
</html>