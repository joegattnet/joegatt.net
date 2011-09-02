<?php

function outputimage($image, $ext, $location, $quality) {
  if($location===null){
    if($ext=='jpg'){
      $mime = 'jpeg';
    } else {
      $mime = $ext;
    }
    header("Content-type: image/" . $mime);
  }
  switch ($ext) { 
  	case 'png':
  		imagepng($image, $location, $quality);
  		break;
  	case 'gif':
  		imagegif($image, $location, $quality);
  		break;
  	default:
  		imagejpeg($image, $location, $quality);
  }
  return true;
}

?>