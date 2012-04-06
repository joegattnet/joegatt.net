<?php

function imagelocation($imageName,$type) {
  #$firstLetter = substr($imageName, 0, 1);
  #$secondLetter = substr($imageName, 1, 1);
  #$location = '../../_assets/images/' . $type . '/' . $firstLetter . '/' . $secondLetter . '/';
  $location = '../../../_assets/images/' . $type . '/';
  return $location;
}

?>