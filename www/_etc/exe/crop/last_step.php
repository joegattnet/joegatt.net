<?php 

$styles = '<link type="text/css" rel="stylesheet" href="css/imig.css" media="screen, projection" />';

include 'header.php';

if(isset($_POST['imageFileName'])) { 

  // DEFINE VARIABLES
  $imageWidth      = $_POST['imageWidth'];
  $imageFileName   = $_POST['imageFileName'];
  $resizeWidth     = $_POST['resizeWidth'];
  $sourceFile      = "working/cropped/". $imageFileName;
  $destinationFile = "working/finished/" . $imageFileName;

  if(file_exists($destinationFile)) { chmod($destinationFile, 0777); unlink($destinationFile); }  // delete if existing

  // CHECK TO SEE IF WE NEED TO CROP
  if($imageWidth != $resizeWidth) {
    $convertString = "convert $sourceFile -resize $resizeWidth $destinationFile";
    exec($convertString);
    chmod($destinationFile, 0777);
    chmod($sourceFile, 0777);
    unlink($sourceFile);

  } else { // RESIZE WAS SKIPPED
    $cmd = "mv " . $sourceFile . " " . $destinationFile;
    exec($cmd);
  }

?>

  <div class="info">
    <h1>All Done</h1>
    <p>Your image has been cropped and resized as you'd like.  The image below can be used as you see fit.</p>
  </div>


<div id="completedImage">
  <?php
  echo "<img src=\"" . $destinationFile . "\" id=\"theImage\" alt=\"Final Image\" />";
  $workingDir = exec('pwd');
  $finalFile = $workingDir . "/" . $destinationFile;
  // echo "Final File Location: " . $finalFile;
  ?>
</div> <!-- completedImage -->

<?php } else { ?> 

  <div class="info">
    <h1>Error</h1>
    <p>There was an error.</p> 
  </div>

<?php } include 'footer.php' ?>