<?php

function imageprocess($imageLocation, $processing, $psettings) {
  $reload = false;
  if(preg_match('/grey/', $processing)){
    $cmd = "convert " . $imageLocation . " -colorspace Gray " . $imageLocation;
    $results = exec($cmd);
    $reload = true;
  }
  return $reload;
}

?>