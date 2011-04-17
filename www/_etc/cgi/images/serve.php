<?php

// Settings (in root file)
ini_set("include_path", ini_get("include_path") . PATH_SEPARATOR . "../src/php" . PATH_SEPARATOR);
require_once("createimage.php");
require_once("template.php");
require_once("outputimage.php");
require_once("imageprocess.php");
require_once("imagelocation.php");

//Settings
$columnWidths = array("wb" => 60, "if" => 100);
$gutterWidths = array("wb" => 20, "if" => 10);

// Get from url

$image = $_GET["imgfile"];
$rnd = $_GET["rnd"];
$aspectRatio = $_GET["aspect"];
$platform = $_GET["platform"];
$columns = $_GET["columns"];
$border = $_GET["border"];
$processing = $_GET["processing"];
$psettings = $_GET["psettings"];

$ext = substr(strrchr($image, '.'), 1);
$imageName = substr($image, 0, strrpos($image, '.')); // get the file extension

$outputLocation = imagelocation($imageName,'cut') . $imageName . '-' . $rnd . '-' . $aspectRatio . '-' . $platform . '-' . $columns  . '-' . $border . '-' . $processing . '-' . $psettings . '.' . $ext;

if (file_exists($outputLocation)){

  $outputImage = createimage($outputLocation);

} else {

  $aspectDimensions = explode("_", $aspectRatio);
  $aspectWidth = $aspectDimensions[0];
  $aspectHeight = $aspectDimensions[1];
  
  $outputWidth = 0;
  $outputHeight = 0;
   
  switch ($platform) {
  	case 'wb':
  		$outputWidth = ($columnWidths[$platform] * $columns) + ($gutterWidths[$platform] * ($columns - 1));
  		break;
  	case 'if':
  		$outputWidth = 100;
  		break;
  	case 'ip':
  		$outputWidth = 250;
  		break;
  	case 'k3':
  		$outputWidth = 600;
      $aspectWidth = 3;
      $aspectHeight = 4;
      $processing = 'g';
  		break;
  	case 'tw':
  		$outputWidth = $columns;
  		break;
  	case 'th':
  		$outputHeight = $columns;
  		break;
  	case 'fw':
  		$outputWidth = $columns;
  	    $rawImage = imagelocation($imageName,'raw') . $imageName . '.' . $ext;
        $size = getimagesize($rawImage);
      $outputHeight = ($size[1] * $outputWidth) / $size[0];
      $aspectWidth = 0;
      $aspectHeight = 0;
  		break;
  	case 'fh':
  		$outputHeight = $columns;
  	    $rawImage = imagelocation($imageName,'raw') . $imageName . '.' . $ext;
        $size = getimagesize($rawImage);
      $outputWidth = ($size[0] * $outputHeight) / $size[1];
      $aspectWidth = 0;
      $aspectHeight = 0;
  		break;
  	default:
  		$outputWidth = ($columnWidths[$platform] * $columns) + ($gutterWidths[$platform] * ($columns - 1));
  }
  
  if($outputWidth == 0){
    $outputWidth = ($outputHeight * $aspectWidth) / $aspectHeight;
  }

  if($outputHeight == 0){
    $outputHeight = ($outputWidth * $aspectHeight) / $aspectWidth;
  }
  
  $outputWidth = $outputWidth - ($border*2);
  $outputHeight = $outputHeight - ($border*2);
  
  $template = template($imageName,$rnd,$ext,$aspectWidth,$aspectHeight);
  
  $templateWidth = imagesx($template) - ($border*2);
  $templateHeight = imagesy($template) - ($border*2);
  
  $outputImage = imagecreatetruecolor($outputWidth, $outputHeight);
  
  imagecopyresampled($outputImage, $template, 0, 0, $border, $border, $outputWidth, $outputHeight, $templateWidth, $templateHeight);

  outputimage($outputImage, $ext, $outputLocation, -1);
  
  if(imageprocess($outputLocation,$processing,$psettings)){
    $outputImage = createimage($outputLocation);
  };

}

outputimage($outputImage, $ext, null, -1);

imagedestroy($template);
imagedestroy($outputImage);

/*

.htaccess

marienbad_still-3456-16_9-if-1-0
marienbad_still-3456-16_9-ip-2-0
marienbad_still-3456-16_9-wb-3-0

marienbad_01-3456-0-ff-180x90-0-scm-0_3_2.jpg
a            b    c d  e      f g   h     i

a. pic name (as in DB) - possibly including crop id '_2'
b. random number to defeat cache
c. aspect ratio (0 if freeform)
d. platform (ff if freeform)
e. columns (or dimensions if freeform)
f. border width
g. post-processing flags
h. post-processing settings
i. extension

*/

?>