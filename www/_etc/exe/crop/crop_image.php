<?php 

if($_FILES['image']['tmp_name']) {

  $uploadedFile = $_FILES['image']['tmp_name'];

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

  // SETUP DIRECTORY STRUCTURE WITH GOOD PERMS
  if(!is_dir("working")) { mkdir("working", 0777); chmod("working", 0777); }
  if(!is_dir("working/uploads")) { mkdir("working/uploads"); chmod("working/uploads", 0777); }
  if(!is_dir("working/cropped")) { mkdir("working/cropped"); chmod("working/cropped", 0777); }
  if(!is_dir("working/finished")) { mkdir("working/finished"); chmod("working/finished", 0777); }

  // DEFINE VARIABLES
  $maxWidth = 640;
  $maxHeight = 480;
  $imageFileName = basename($_FILES['image']['name']);
  $target_path = "working/uploads/";
  $target_path = $target_path . basename($_FILES['image']['name']);
  $imageLocation = $target_path;

  // DELETE FILE IF EXISTING
  if(file_exists($imageLocation)) { chmod($imageLocation, 0777); unlink($imageLocation); }

  // CHECK FOR IMAGE UPLOAD
  if(move_uploaded_file($uploadedFile, $imageLocation)) {
    chmod($imageLocation, 0777);

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
	    
    // RESIZE IF UPLOAD IS TOO BIG
    if(($dimensions['width']>$maxWidth) || ($dimensions['height']>$maxHeight)){
      $cmd = "convert " . $imageLocation . " -resize 640x480 " . $imageLocation;
      $results = exec($cmd);
      
      // GET NEW DIMENSIONS
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
    }
?>

  <div class="info">
    <h1>Step 1: Crop Your Image</h1>
    <p>You may click and drag an area within the image to crop.  Once complete you will be able to scale/resize your image before saving.</p>
  </div> <!-- /info -->

  <div id="crop_save">
    <form action="resize_image.php" method="post" class="frmCrop">
      <fieldset>
        <legend>Continue</legend>
        <input type="hidden" class="hidden" name="imageWidth" id="imageWidth" value="<?php echo $dimensions['width'] ?>" />
        <input type="hidden" class="hidden" name="imageHeight" id="imageHeight" value="<?php echo $dimensions['height'] ?>" />
        <input type="hidden" class="hidden" name="imageFileName" id="imageFileName" value="<?php echo $imageFileName ?>" />
        <input type="hidden" class="hidden" name="cropX" id="cropX" value="0" />
        <input type="hidden" class="hidden" name="cropY" id="cropY" value="0" />
        <input type="hidden" class="hidden" name="cropWidth" id="cropWidth" value="<?php echo $dimensions['width'] ?>" />
        <input type="hidden" class="hidden" name="cropHeight" id="cropHeight" value="<?php echo $dimensions['height'] ?>" />
        <div id="submit">
          <input type="submit" value="Save" name="save" id="save" />
        </div>
      </fieldset>
    </form>
  </div> <!-- /crop_save -->

  <div id="crop">
    <div id="cropWrap">
      <img src="<?php echo $imageLocation ?>" alt="Image to crop" id="cropImage" />
    </div> <!-- /cropWrap -->
  </div> <!-- /crop -->

<?php } } else { 

  switch ($_FILES['image'] ['error']) {
    case 1:
      $error = 'The file is bigger than this PHP installation allows.';
      break;
    case 2:
      $error = 'The file is bigger than 50k.';
      break;
    case 3:
      $error = 'Only part of the file was uploaded.';
      break;
    case 4:
      $error = 'No file was uploaded.';
      break;
   }
   
   include 'header.php';

?> 

  <div class="info">
    <h1>Error</h1>
    <p>There was an error uploading the file.  <?php echo $error; ?></p>

  </div>

<?php } 

include 'footer.php' ?>