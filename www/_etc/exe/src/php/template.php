<?php

function template($imageName,$rnd,$ext,$aspectWidth,$aspectHeight){

  $templateImage = imagelocation($imageName,'templates') . $imageName . '-' . $aspectWidth . '_' . $aspectHeight . '.' . $ext;
  $templateImageAuto = imagelocation($imageName,'templates') . $imageName . '-' . $aspectWidth . '_' . $aspectHeight . '.auto.' . $ext;

  if (file_exists($templateImage)){

    $dst = createimage($templateImage);
  
  } else if(file_exists($templateImageAuto)) {

    $dst = createimage($templateImageAuto);
    
  } else {
  
    $rawImage = imagelocation($imageName,'raw') . $imageName . '.' . $ext;

    if(file_exists($rawImage)){
      $size = getimagesize($rawImage);
      $originalWidth = $size[0];
      $originalHeight = $size[1];
    } else {
      #$rawImage = '../../../_assets/images/raw/0/0/00.' . $ext;
      $rawImage = '../../../_assets/images/raw/_blank.' . $ext;
      $originalWidth = 10000;
      $originalHeight = 10000;
    }
    
    //Try to guess a good crop; based on rule-of-thirds
    if ($aspectWidth == 0 && $aspectHeight == 0) {
      $templateHeight = $originalHeight;
      $templateWidth = $originalWidth;
      $original_x = 0;
      $original_y = 0;
    } else if ($originalHeight > $originalWidth * 2) {
      $templateWidth = $originalWidth;
      $templateHeight = ($originalWidth * $aspectHeight) / $aspectWidth;
      $original_x = (($originalWidth - $templateWidth) / 3) * 2;
      $original_y = 0;
    } else if ($originalHeight/$originalWidth > $aspectHeight/$aspectWidth) {
      $templateHeight = ($originalWidth * $aspectHeight) / $aspectWidth;
      $templateWidth = $originalWidth;
      $original_x = 0;
      $original_y = ($originalHeight - $templateHeight) / 3;
    } else {
      $templateWidth = ($originalHeight * $aspectWidth) / $aspectHeight;
      $templateHeight = $originalHeight;
      $original_x = (($originalWidth - $templateWidth) / 3) * 2;
      $original_y = 0;
    }
      
    $src = createimage($rawImage);
    
    $dst = imagecreatetruecolor($templateWidth, $templateHeight);
  
    imagecopyresampled($dst, $src, 0, 0, $original_x, $original_y, $templateWidth, $templateHeight, $templateWidth, $templateHeight);
    
    //Should be in included file
    $quality = array("jpg" => -1, "gif" => -1, "png" => -1);
    
    outputimage($dst, $ext, $templateImageAuto, $quality[$ext]);
  
  }
  
  return $dst;

}

?>