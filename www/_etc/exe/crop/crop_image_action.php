<?php 

require_once('../src/php/createimage.php');
require_once('../src/php/imagecachebuster.php');
require_once('../src/php/outputimage.php');

#$styles = '<link type="text/css" rel="stylesheet" href="css/imig.css" media="screen, projection" />';
$scripts = '  <script src="lib/prototype.js" type="text/javascript"></script>
  <script src="lib/slider.js" type="text/javascript"></script>
  <script src="lib/init_resize.js" type="text/javascript"></script>';

include 'header.php';

if(isset($_POST['imageFileName'])) { 

  // DEFINE VARIABLES
  $imageWidth      = $_POST['imageWidth'];
  $imageHeight     = $_POST['imageHeight'];
  $imageFileName   = $_POST['imageFileName'];
  $imageExtension = $_POST['imageExtension'];
  $adjustPreview   = $_POST['adjustPreview'];
  $cropX           = $_POST['cropX'] * $adjustPreview;
  $cropY           = $_POST['cropY'] * $adjustPreview;
  $cropWidth       = $_POST['cropWidth'] * $adjustPreview;
  $cropHeight      = $_POST['cropHeight'] * $adjustPreview;
  $aspectWidth      = $_POST['aspectWidth'];
  $aspectHeight     = $_POST['aspectHeight'];
#  $oldRnd           = $_POST['rnd'];
  $newRnd = (rand()%99999);
  
  if($cropWidth == 0) { $cropWidth = $imageWidth; }
  if($cropHeight == 0) { $cropHeight = $imageHeight; }

  $sourceFile      = '../../../_assets/images/raw/' . $imageFileName . '.' . $imageExtension;
  $destinationFile = '../../../_assets/images/templates/' . $imageFileName . '-' . $aspectWidth . '_' . $aspectHeight . '.' . $imageExtension;
  $destinationFileAuto = '../../../_assets/images/templates/' . $imageFileName . '-' . $aspectWidth . '_' . $aspectHeight . '.auto.' . $imageExtension;

#    $src = createimage($sourceFile);
    $src = createimage($sourceFile);    
    $dst = imagecreatetruecolor($cropWidth, $cropHeight);
  
    imagecopyresampled($dst, $src, 0, 0, $cropX, $cropY, $cropWidth, $cropHeight, $cropWidth, $cropHeight);
    
    outputimage($dst, $ext, $destinationFile, -1);
    #imagejpeg($dst, $destinationFile, -1);

?>

   <div class="info">
    <h1>Done: <?php echo $imageFileName ?>.<?php echo $ext ?> <?php echo $aspectWidth ?>:<?php echo $aspectHeight ?></h1>

<?php

  if (file_exists($destinationFileAuto)){
    unlink($destinationFileAuto);
     print "<p>Deleted from cache: $destinationFileAuto</p>";
  }

  imagecachebuster($imageFileName,$newRnd,$aspectWidth . '_' . $aspectHeight);

  $preview1 = '../../../_assets/images/cut/' . $imageFileName . '-' . $newRnd . '-' . $aspectWidth . '_' . $aspectHeight . '-wb-4-0-0-0.' . $imageExtension;
  $preview2 = '../../../_assets/images/cut/' . $imageFileName . '-' . $newRnd . '-' . $aspectWidth . '_' . $aspectHeight . '-wb-7-0-0-0.' . $imageExtension;
  $preview3 = '../../../_assets/images/cut/' . $imageFileName . '-' . $newRnd . '-' . $aspectWidth . '_' . $aspectHeight . '-k3-7-0-0-0.' . $imageExtension;
  
  imagedestroy($src);
  imagedestroy($dst);

  #Replacing mentions of image in cache files
  include 'File/SearchReplace.php';
  $files_to_search = array();
  $direc_to_search = array('../../../_etc/cache/');
  $search_string  = '/' . $imageFileName . '-([0-9]+)-' . $aspectWidth . '_' . $aspectHeight . '/';
  $replace_string = $imageFileName . '-' . $newRnd . '-' . $aspectWidth . '_' . $aspectHeight;
  $snr = new File_SearchReplace($search_string,
                                $replace_string,
                                $files_to_search,
                                $direc_to_search,
                                true);
  $snr->setSearchFunction("preg"); 
  $snr->doSearch();
  $snrPrint = $snr->getNumOccurences();
?>

  <p><?php echo $snrPrint; ?> references to image replaced in cache.</p>


    <p><img src="<?php echo $preview1 ?>" /></p>
    <p><img src="<?php echo $preview2 ?>" /></p>
    <p><img src="<?php echo $preview3 ?>" /></p>
    <p><a href="crop_image2.php?image=<?php echo $imageFileName ?>&aspectWidth=<?php echo $aspectWidth ?>&aspectHeight=<?php echo $aspectHeight ?>&r=<?php echo $newRnd ?>">redo</a> <a href="index.php?r=<?php echo $rnd ?>">more...</a></p>
  </div>

<?php 

} 

include 'footer.php' 

?>