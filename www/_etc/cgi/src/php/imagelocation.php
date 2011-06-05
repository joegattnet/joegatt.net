<?php

function imagelocation($imageName,$type) {
  #$firstLetter = substr($imageName, 0, 1);
  #$secondLetter = substr($imageName, 1, 1);
  #$location = '../../_etc/resources/' . $type . '/' . $firstLetter . '/' . $secondLetter . '/';
  $location = '../../../_etc/resources/' . $type . '/';
  return $location;
}

?>