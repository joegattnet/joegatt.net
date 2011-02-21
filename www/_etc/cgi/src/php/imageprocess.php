<?php

function imageprocess($imageLocation,$effects,$settings) {
  $reload = false;
  if(strpos($effects,'g') !== false){
    $cmd = "convert " . $imageLocation . " -colorspace Gray " . $imageLocation;
    $results = exec($cmd);
    $reload = true;
  }
  return $reload;
}

?>