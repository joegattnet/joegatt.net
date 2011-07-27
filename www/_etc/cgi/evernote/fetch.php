<?php

require_once("../basics.php");
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
  //$notebookName = 'joegattdev's notebook';
  $notebookName = 'joegatt.net';
  if ($notebook->name == $notebookName) {
    $notebookGuid = $notebook->guid;
    $notebook_update_sequence = $notebook->updateSequenceNum;
  }
}

//echo $notebook_update_sequence.'\n\n\n';

$con = connect_db();

$query = "SELECT MAX(update_sequence) AS update_sequence, unix_timestamp(MAX(date_modified)) AS latest_unix,DATE_FORMAT(MAX(date_modified),'%Y%m%dT%H%i%S') AS latest,unix_timestamp(MAX(date_deleted)) AS latest_unix_deleted FROM notes";
//$query = "SELECT MAX(update_sequence) FROM notes";

$result = mysql_query($query);
while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $latest_update_sequence = $row['update_sequence'];
    $latest_unix = $row['latest_unix']*1000;
    $latest = $row['latest'];
    $latest_unix_deleted = $row['latest_unix_deleted']*1000;
    //echo "Latest:$latest\n";//hhh
    //echo "Latest:$latest_unix\n";
}

$query = "SELECT e_guid,update_sequence FROM `notes` WHERE latest=1";
$result = mysql_query($query);
while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
  $update_sequence_lookup[$row['e_guid']] = $row['update_sequence'];
}

//echo $update_sequence_lookup['aaf8cfb3-5ca0-46ca-8741-86ecd5102ff1'];

$search = new edam_notestore_NoteFilter();

$resultSpec = new edam_notestore_NotesMetadataResultSpec();
$resultSpec->includeTitle =	false;	
$resultSpec->includeContentLength =	true;	
$resultSpec->includeCreated	= true;	
$resultSpec->includeUpdated	= false;	
$resultSpec->includeUpdateSequenceNum =	true;	
$resultSpec->includeNotebookGuid =	false;	
$resultSpec->includeTagGuids =	false;	
$resultSpec->includeAttributes =	false;	
$resultSpec->includeLargestResourceMime =	false;	
$resultSpec->includeLargestResourceSize =	false;	

$search->notebookGuid = $notebookGuid;
//$search->words = 'updated:20110101 -updated:20110701';
$search->ascending = false;
//$search->timeZone = "Europe/London";
$result = $noteStore->findNotesMetadata($authToken, $search, 0, 500, $resultSpec);
$notesFound = $result->notes;

//echo var_export($result,1);

$cache_queue = array();
$url_queue = array();

foreach ($notesFound as $note) {
  $note_guid=$note->guid;
  $date_modified=$note->updated;
  $date_created=$note->created;
  $update_sequence=$note->updateSequenceNum;

//print "$update_sequence > $latest_update_sequence ? /n";
//print "($date_modified > $latest_unix || $date_created > $latest_unix)\n";

//print "$note_guid | $update_sequence_lookup[$note_guid] $update_sequence \n";

//if(1==1){
//    if($update_sequence_lookup[$note_guid] != $update_sequence){    
//  if($date_modified > $latest_unix || $date_created > $latest_unix){
  if($update_sequence>$latest_update_sequence){
    
    $noteEdam=$noteStore->getNote($authToken, $note_guid, 1,1,0,0);
  
    //echo var_export($noteEdam,1);
    
    $tagGuids=$noteEdam->tagGuids;
    $resources=$noteEdam->resources;
    $content=$noteEdam->content;
    $note_title=$noteEdam->title;
    //$date_created=$noteEdam->created;
    //$date_modified=$noteEdam->updated;
    $update_sequence=$noteEdam->updateSequenceNum;
    $content_hash=$noteEdam->contentHash;
  
    $attributes=$noteEdam->attributes;
    $subject_date=$attributes->subjectDate;
    $latitude=$attributes->latitude;
    $longitude=$attributes->longitude;
    $altitude=$attributes->altitude;
    $author=$attributes->author;
    $source=$attributes->source;
    $source_url=$attributes->sourceURL;
    $source_application=$attributes->sourceApplication;
      
    $latitude=($latitude===null?0:$latitude);
    $longitude=($longitude===null?0:$longitude);
    $altitude=($altitude===null?0:$altitude);
    
    $note_publish = 0;
    $note_type = 1;
    $latest = 1;
    
    $section = 'notes';
    $imageTitle = '';
    $booksTagFound = false;
    $expFound = false;
      
    $query = sprintf("DELETE _lookup WHERE check1='%s' AND (type=0 OR type=1)",
      $note_guid
    );
    mysql_query($query);
    
    if($tagGuids) {
      $tagCounter = 0;
      //Over-testing here?
      while ($tagCounter <= sizeof($tagGuids)-1 && strlen($tagGuids[$tagCounter])>1) {     
        $tag = $tagGuids[$tagCounter];
        $thisTag=$noteStore->getTag($authToken, $tag);
        $thisTagName = $thisTag->name;
        $thisTagGuid = $thisTag->guid;
        $thisTagParentGuid = $thisTag->parentGuid;
        
        if($thisTagParentGuid===null || $thisTagParentGuid == ''){
         $thisTagParentGuid = '';
        }else if(array_search($thisTagParentGuid,$tagGuids)===false){
         array_push($tagGuids,$thisTagParentGuid);
        }

        if($thisTagName == '__PREVIEW'){
          $note_publish = 1;
        } else if($thisTagName == '__PUBLISH'){
          $note_publish = 2;
        } else if($thisTagName == '__NOLIST'){
          $note_type = 0;
        } else if($thisTagName == '_books'){
          $booksTagFound = true;
        } else if($thisTagName == '_exp'){
          $expFound = true;
        } else if($thisTagName == '__LINK'){
          $note_type = 3;
          $section = 'links';
        } else if($thisTagName == '__TOPIC'){
          $note_type = 4;
          $section = 'topics';
        } else if($thisTagName == '__HOLD'){
          $latest = 0; //Hold publication - tags, etc are still updated
        }
        
        $query = sprintf("REPLACE INTO tags (e_guid,e_guid_parent,name) VALUES ('%s','%s','%s')",
          $thisTagGuid,
          $thisTagParentGuid,
          mysql_real_escape_string($thisTagName)
        );
        mysql_query($query);
        $query = sprintf("REPLACE INTO _lookup (check1,check2) VALUES ('%s','%s')",
          $note_guid,
          $thisTagGuid
        );
        mysql_query($query);
        if(!preg_match('/^_/i',$thisTagName)){
          array_push($url_queue,'http://'.SERVER_NAME.'/tags/'.strtolower($thisTagName));
        }
        $cache_queue = cache_queue($cache_queue,'/-tags=.*\b'.$thisTagName.'\b/');
        echo "Tag added: $thisTagName ($thisTagGuid)\n";
       $tagCounter++;
      }
    }
    
    if($booksTagFound && $expFound){
      $note_type = 2;
    }
    
    for ($i=0; $i<sizeof($resources); $i++){
      $thisResourceGuid = $resources[$i]->guid;
      $thisMime = $resources[$i]->mime;
      $thisActive = $resources[$i]->active;
      $thisHash = $resources[$i]->data->bodyHash;
      
      if($thisMime=='image/jpeg'){$ext = 'jpg';}
      if($thisMime=='image/png'){$ext = 'png';}
      if($thisMime=='image/gif'){$ext = 'gif';}
      if($thisMime=='audio/mpeg'){$ext = 'mpg';}
      
      if(isset($imageTitle) && $imageTitle != ''){
        $imageTitle = str_replace(' ', '_', $imageTitle);
      } else {
        $imageTitle = preg_replace('/[^_\w]/', '_', $note_title);
      }
      $imageTitle = strtolower(substr($imageTitle,0,100)) . '_' . $i;
            
      $rnd = rand(0, 99999);
      
      $filename = imagelocation($imageTitle,'raw') . $imageTitle . '.' . $ext;
  
      if(!file_exists($filename)||($thisHash!=md5_file($filename,true))){
        $data = $noteStore->getResourceData($authToken, $thisResourceGuid);
        $attributes = $resources[$i]->attributes;
        $resource_source_url = $attributes->sourceURL;
        $resource_latitude = $attributes->latitude;
        $resource_longitude = $attributes->longitude;
        $resource_altitude = $attributes->altitude;
        $camera_make = $attributes->cameraMake;
        $camera_model = $attributes->cameraModel;
        $original_filename = $attributes->fileName;
        
        $resource_latitude=($resource_latitude===null?0:$resource_latitude);
        $resource_longitude=($resource_longitude===null?0:$resource_longitude);
        $resource_altitude=($resource_altitude===null?0:$resource_altitude);
        
        $fp = fopen($filename, 'w');
        fwrite($fp, $data);
        fclose($fp);
        $query = sprintf("INSERT INTO resources (e_guid,title,rnd,ext,source_url,latitude,longitude,altitude,camera_make,camera_model,original_filename) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')",
            $thisResourceGuid,
            mysql_real_escape_string($imageTitle),
            $rnd,
            $ext,
            mysql_real_escape_string($resource_source_url),
            $resource_latitude,
            $resource_longitude,
            $resource_altitude,
            mysql_real_escape_string($camera_make),
            mysql_real_escape_string($camera_model),
            mysql_real_escape_string($original_filename)
        );
        mysql_query($query);
        $query = sprintf("INSERT INTO _lookup (check1,check2,type,sequence) VALUES ('%s','%s',1,%s)",
          $note_guid,
          $thisResourceGuid,
          $i
        );
        mysql_query($query);
        echo "Resource added: " . $filename . "\n";
      }
    }
    
    $date_created=date("Y-m-d H:i:s", ($date_created/1000));
    $date_modified=date("Y-m-d H:i:s", ($date_modified/1000));
    if($latest == 1){
      $query = sprintf("UPDATE notes SET latest=0 WHERE e_guid='%s' AND latest=1",
          $note_guid
      );
      mysql_query($query);
    }
    
    //$note_title = strip_tags($note_title);
    //$content = str_replace("</div>", "</div>/n", $content);
    //$content = strip_tags($content, '<a><ul><li><h3>');
    
    //mysql_query($query);
    $query = sprintf("REPLACE INTO notes (e_guid,title,text,date_created,date_modified,update_sequence,content_hash,subject_date,latitude,longitude,altitude,author,source,source_url,source_application,deleted,date_deleted,publish,type,latest) VALUES ('%s','%s','%s','%s','%s', %s, '%s', '%s', %s, %s, %s, '%s', '%s', '%s', '%s', 0, NULL, %s, %s, %s)",
        $note_guid,
        mysql_real_escape_string($note_title),
        mysql_real_escape_string($content),
        $date_created,
        $date_modified,
        $update_sequence,
        $content_hash,
        $subject_date,
        $latitude,
        $longitude,
        $altitude,
        mysql_real_escape_string($author),
        mysql_real_escape_string($source),
        mysql_real_escape_string($source_url),
        mysql_real_escape_string($source_application),
        $note_publish,
        $note_type,
        $latest
    );
    mysql_query($query);
    
    if ($note_publish > 1 && $latest == 1){
      $eguid_dec = hexdec(substr($note_guid,0,4));
      $cache_queue = cache_queue_guid($cache_queue,$eguid_dec);
      $url = 'http://'.SERVER_NAME.'/'.$section.'/'.$eguid_dec;
      array_push($url_queue,$url);
      //$url = 'http://'.SERVER_NAME.'/_etc/cache/notes--page-p='.$eguid_dec.'.shtml';
      //array_push($url_queue,$url);
      echo "Note added: $note_title ($note_guid) - publishing - $url\n";
    } else {
      echo "Note added: $note_title ($note_guid) - not publishing\n";
    }
    
  }
}

// Getting deleted notes *******************************************************
// We also need to delete notes if they are moved to another notebook
$search = new edam_notestore_NoteFilter();
$search->notebookGuid = $notebookGuid;
$search->ascending = true;
$search->inactive = true;
//$search->words = "deleted:$latest";
$result = $noteStore->findNotes($authToken, $search, 0, 99);
$notesFound = $result->notes;

foreach ($notesFound as $note) {
  $note_guid=$note->guid;
  $title=$note->title;
  $date_deleted=$note->deleted;
//  $update_sequence=$note->updateSequenceNum;

  if($date_deleted>$latest_unix_deleted){
//  if($update_sequence>$latest_update_sequence){
    $date_deleted=date("Y-m-d H:i:s", ($date_deleted/1000));
    $query = sprintf("UPDATE notes SET deleted=1,date_deleted='%s' WHERE e_guid='%s'",
        $date_deleted,
        $note_guid
    );
    mysql_query($query);
    echo "Note deleted: $title ($note_guid)\n";
  }
}

if(sizeof($cache_queue)>0||sizeof($url_queue)>0){
  $cache_queue = cache_queue($cache_queue,'/cloud|notes.*latest=true/');
  $cache_queue = cache_queue($cache_queue,'/wall/');
}

if(sizeof($cache_queue)>0){
  cache_refresh($cache_queue,SERVER_NAME);
}

if(sizeof($url_queue)>0){
  $url_queue = array_unique($url_queue);
  foreach($url_queue as $url){
    $temp = get_content($url);
  }
}

if(sizeof($cache_queue)>0||sizeof($url_queue)>0){
  $temp = get_content('http://'.SERVER_NAME.'/');
  $temp = get_content('http://'.SERVER_NAME.'/tags/');
  $temp = get_content('http://'.SERVER_NAME.'/notes/');
  $temp = get_content('http://'.SERVER_NAME.'/bibliography/');
  $temp = get_content('http://'.SERVER_NAME.'/links/');
  $temp = get_content('http://'.SERVER_NAME.'/topics/');
}

mysql_close($con);

//echo "Done.\n";

// *****************************************************************************

function cache_queue($cache_queue,$string){
  if ($handle = opendir('../../../_etc/cache')) {
    while (($file = readdir($handle)) !== false) {
      if(preg_match($string,$file)!=0){
        array_push($cache_queue,$file);
      }
    }
  }
  return $cache_queue;
}

// *****************************************************************************

function cache_queue_guid($cache_queue,$eguid_dec){
  //$eguid_dec = hexdec(substr($note_guid,0,4));
  if ($handle = opendir('../../../_etc/cache')) {
    while (($file = readdir($handle)) !== false) {
      if(preg_match('/page-p=.*\b'.$eguid_dec.'\b/i',$file)!=0){
        array_push($cache_queue,$file);
      }
    }
  }
  return $cache_queue;
}

// *****************************************************************************

function cache_refresh($cache_queue,$servername ){
  $cache_queue = array_unique($cache_queue);
  foreach($cache_queue as $file){
    unlink('../../../_etc/cache/'.$file);
    echo "Deleted: $file\n";
    $url = 'http://'.$servername.'/_etc/cache/'.$file;
    $temp = get_content($url);
  }
}

// *****************************************************************************

function get_content($url){
    echo "Getting: $url\n";

    //Purge Varnish
    $chPurge = curl_init();
    curl_setopt($chPurge, CURLOPT_URL, $url);
    curl_setopt($chPurge, CURLOPT_CUSTOMREQUEST, "PURGE");

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    //curl_setopt ($ch, CURLOPT_HEADER, 0);
    if(SERVER_NAME != 'joegatt.net'){ 
    //echo "Password: $url\n";
      //Get these securely
      curl_setopt($chPurge, CURLOPT_RETURNTRANSFER, 1); 
      curl_setopt($chPurge, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
      curl_setopt($chPurge, CURLOPT_USERPWD, JGORG_CONNECT);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
      curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
      curl_setopt($ch, CURLOPT_USERPWD, JGORG_CONNECT);
    }
    ob_start();
    curl_exec($chPurge);
    curl_close($chPurge);
    ob_start();
    curl_exec($ch);
    curl_close($ch);
    echo "Curl: $url\n";
    $string = ob_get_contents();
    ob_end_clean();
    return $string;
    //If url is a 'real' page i.e. !~ /cache/
    //curl http://developers.facebook.com/tools/lint/?url={YOUR_URL}&format=json
}

?>
