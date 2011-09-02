<?php

// Settings (in root file)
ini_set("include_path", ini_get("include_path") . PATH_SEPARATOR . "../src/php" . PATH_SEPARATOR);
require_once("createimage.php");
require_once("template.php");
require_once("outputimage.php");
require_once("imageprocess.php");
require_once("imagelocation.php");

//Settings
$columnWidths = array("wb" => 60, "if" => 100, "fw" => 1, "th" => 1);
$gutterWidths = array("wb" => 20, "if" => 10, "fw" => 1, "th" => 1);
$lineHeight = array("wb" => 10, "if" => 1, "fw" => 1, "th" => 1);

$quality = array("jpg" => -1, "gif" => -1, "png" => -1);

$imageName = $_GET["img"];
$ext = $_GET["ext"];
$imageFile = $imageName . $ext;
$rnd = $_GET["rnd"];
$aspectRatio = $_GET["aspect"];
$platform = $_GET["platform"];
$columns = $_GET["columns"];
$border = $_GET["border"];
$processing = $_GET["processing"];
$psettings = $_GET["psettings"];

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
  	case 'wb': // Web
  		$outputWidth = ($columnWidths[$platform] * $columns) + ($gutterWidths[$platform] * ($columns - 1));
  		break;
  	case 'if':
  		$outputWidth = 100;
  		break;
  	case 'ip': // iPhone
  		$outputWidth = 250;
  		break;
  	case 'k3': // Kindle
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
  	case 'fw': // Freeform - force width
  		$outputWidth = $columns;
  	  $rawImage = imagelocation($imageName,'raw') . $imageName . '.' . $ext;
      $size = getimagesize($rawImage);
      $outputHeight = ($size[1] * $outputWidth) / $size[0];
      $aspectWidth = 0;
      $aspectHeight = 0;
  		break;
  	case 'fh': //Freeform - force height
  		$outputHeight = $columns;
  	    $rawImage = imagelocation($imageName,'raw') . $imageName . '.' . $ext;
        $size = getimagesize($rawImage);
      $outputWidth = ($size[0] * $outputHeight) / $size[1];
      $aspectWidth = 0;
      $aspectHeight = 0;
  		break;
  	case 'sq': // Square (icon)
      $outputWidth = $columns;
      $aspectWidth = 1;
      $aspectHeight = 1;
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
  
  if($lineHeight[$platform]){
    $outputHeight = round($outputHeight / $lineHeight[$platform]) * $lineHeight[$platform];
  }
  
  $outputWidth = $outputWidth - ($border * 2);
  $outputHeight = $outputHeight - ($border * 2);
  
  $template = template($imageName,$rnd,$ext,$aspectWidth,$aspectHeight);
  
  $templateWidth = imagesx($template) - ($border*2);
  $templateHeight = imagesy($template) - ($border*2);
  
  $outputImage = imagecreatetruecolor($outputWidth, $outputHeight);
  
  imagecopyresampled($outputImage, $template, 0, 0, $border, $border, $outputWidth, $outputHeight, $templateWidth, $templateHeight);

  outputimage($outputImage, $ext, $outputLocation, $quality[$ext]);
  
  if(imageprocess($outputLocation,$processing,$psettings)){
    $outputImage = createimage($outputLocation);
  };

}

outputimage($outputImage, $ext, null, $quality[$ext]);

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