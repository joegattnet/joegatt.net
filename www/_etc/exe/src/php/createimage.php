<?php

function createimage($image) {
  $ext = substr(strrchr($image, '.'), 1);
  switch ($ext) { 
  	case 'jpg':
  		$src = imagecreatefromjpeg($image) or notfound();
  		break;
  	case 'png':
  		$src = imagecreatefrompng($image) or notfound();
  		break;
  	case 'gif':
  		$src = imagecreatefromgif($image) or notfound();
  		break;
  	default:
  		//notfound();
  		echo "Not found.";
  }
  return $src;
}

?>