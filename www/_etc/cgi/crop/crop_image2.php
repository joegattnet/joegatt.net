<?php 

$styles = '  <link type="text/css" rel="stylesheet" href="css/debug.css" media="screen, projection" />
  <link type="text/css" rel="stylesheet" href="css/cropper.css" media="screen, projection" />
  <link type="text/css" rel="stylesheet" href="css/imig.css" media="screen, projection" />
  <!--[if IE 6]><link type="text/css" rel="stylesheet" href="css/cropper_ie6.css" media="screen, projection" /><![endif]-->
  <!--[if lte IE 5]><link type="text/css" rel="stylesheet" href="css/cropper_ie5.css" media="screen, projection" /><![endif]-->';

$scripts = '  <script src="lib/prototype.js" type="text/javascript"></script>	
  <script src="lib/scriptaculous.js?load=builder,dragdrop" type="text/javascript"></script>
  <script src="lib/cropper.js" type="text/javascript"></script>
  <script src="lib/init_cropper.js" type="text/javascript"></script>';

include 'header.php';
    
    $previewWidth = 600;
    
    $aspectWidth = $_GET["aspectWidth"];
    $aspectHeight = $_GET["aspectHeight"];
    $imageFileName = $_GET["image"];

    $imageLocation = '../../../_etc/resources/raw/' . $_GET["image"] . '.' . $_GET["ext"];

    // GET UPLOADED IMAGE DIMENSIONS
    $cmd = "identify '" . $imageLocation . "' 2>/dev/null";
    $results = exec($cmd);
    $results = trim($results);
    $results = explode(" ", $results);
    foreach ($results as $i=> $result) {
      if (preg_match("/^[0-9]*x[0-9]*$/", $result)) {
        $results = explode("x", $result);
        break;
      }
    }
    $dimensions['height'] = $results[1];
    $dimensions['width'] = $results[0];
    
    $adjustPreview = $dimensions['width']/$previewWidth;	    
?>

<script type="text/javascript">
  aspectWidth = <?php echo $aspectWidth ?>;
  aspectHeight = <?php echo $aspectHeight ?>;
</script>

  <div>
    <h1><?php echo $imageFileName ?> <?php echo $aspectWidth ?>:<?php echo $aspectHeight ?></h1>
    <p><?php echo $dimensions['width'] ?> x <?php echo $dimensions['height'] ?>px</p>
    
     <form action="crop_image_action.php" method="post" class="frmCrop">
        <fieldset>
          <legend>Continue</legend>
          <input type="hidden" class="hidden" name="imageWidth" id="imageWidth" value="<?php echo $dimensions['width'] ?>" />
          <input type="hidden" class="hidden" name="imageHeight" id="imageHeight" value="<?php echo $dimensions['height'] ?>" />
          <input type="hidden" class="hidden" name="imageFileName" id="imageFileName" value="<?php echo $imageFileName ?>" />
          <input type="hidden" class="hidden" name="cropX" id="cropX" value="0" />
          <input type="hidden" class="hidden" name="cropY" id="cropY" value="0" />
          <input type="hidden" class="hidden" name="cropWidth" id="cropWidth" value="<?php echo $dimensions['width'] ?>" />
          <input type="hidden" class="hidden" name="cropHeight" id="cropHeight" value="<?php echo $dimensions['height'] ?>" />
          <input type="hidden" class="hidden" name="aspectWidth" value="<?php echo $aspectWidth ?>" />
          <input type="hidden" class="hidden" name="aspectHeight" value="<?php echo $aspectHeight ?>" />
          <input type="hidden" class="hidden" name="adjustPreview" value="<?php echo $adjustPreview ?>" />
          <div id="submit">
            <input type="submit" value="Save" name="save" id="save" />
          </div>
        </fieldset>
      </form>

    <div id="crop">
      <div id="cropWrap">
        <img src="../../../_etc/resources/cut/<?php  echo $imageFileName ?>-0-0_0-fw-<?php  echo $previewWidth ?>-0-0-0.jpg" alt="Image to crop" id="cropImage" width="<?php  echo $previewWidth ?>" />
      </div>
    </div>

  </div>



<?php include 'footer.php' ?>