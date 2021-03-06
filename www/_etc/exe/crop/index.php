<?php 

$scripts = '  <script type="text/javascript" src="lib/prototype.js"></script>
  <script type="text/javascript" src="lib/scriptaculous.js"></script>
  <script type="text/javascript" src="lib/init_wait.js"></script>';

include 'header.php' ?>

    <h1>Crop Images</h1>

  <p>Show: <a href="index.php?show=">used</a> <a href="index.php?show=all">all</a> <a href="index.php?show=raw">raw</a></p>
<hr style="float:none;clear:both;">
    <!--
    <p>The following is a demo of <a href="http://mondaybynoon.com/2007/01/22/crop-resize-with-javascript-php-and-imagemagick/">
    JavaScript Crop and Resize Images</a>.  Using a combination of <a href="http://www.php.net/">PHP</a>, 
    <a href="http://www.imagemagick.org/">ImageMagick</a>, <a href="http://prototypejs.org/">Prototype</a>, 
    <a href="http://script.aculo.us/">script.aculo.us</a>, and the 
    <a href="http://www.defusion.org.uk/code/javascript-image-cropper-ui-using-prototype-scriptaculous/">JavaScript 
    Image Cropper UI</a> by Dave Spurr, this demo provides a visitor the ability to upload an image, crop it 
    to their liking, and then resize the picture.</p>

    <p>Current filesize limit is <strong>50k</strong>, you can change that as you see fit.</p>
    -->
  <ul style="clear:both;">
  <?php
  
  if($_GET["show"]=='raw'){
    if ($handle = opendir('../../../_assets/images/raw')) {
      while (($file = readdir($handle)) !== false) {
        if($file != "." && $file != "..") {
          preg_match('/^(.+)\.([a-z]{3})$/', $file, $matches);
          $image = $matches[1];
          $aspectWidth = 3;
          $aspectHeight = 4;
          $ext = $matches[2];
          $aspectRatio = $aspectWidth . '_' . $aspectHeight;
          print "<li style=\"float:left;display:inline-block;margin:0 5px 5px 0;\">
            <a href=\"crop_image2.php?image=$image&ext=$ext&aspectWidth=$aspectWidth&aspectHeight=$aspectHeight\">
              <img src=\"../../../_assets/images/cut/$image-0-$aspectRatio-th-120-0-0-0.$ext\" height=\"120\" title=\".$ext: $image $aspectWidth:$aspectHeight\"/>
            </a></li>";
        }
      }
      closedir($handle);
    }
  } else {
    if ($handle = opendir('../../../_assets/images/templates')) {
      while (($file = readdir($handle)) !== false) {
        if($file != "." && $file != ".." && ($_GET["show"] == "all" || strrpos($file, ".auto") !== false) && strrpos($file, "0_0") === false) {
          preg_match('/^(\w+)\-([0-9]+)\_([0-9]+).*?\.([a-z]{3})$/', $file, $matches);
          $image = $matches[1];
          $aspectWidth = $matches[2];
          $aspectHeight = $matches[3];
          $ext = $matches[4];
          $aspectRatio = $aspectWidth . '_' . $aspectHeight;
          print "<li style=\"float:left;display:inline-block;margin:0 5px 5px 0;\">
            <a href=\"crop_image2.php?image=$image&ext=$ext&aspectWidth=$aspectWidth&aspectHeight=$aspectHeight\">
              <img src=\"../../../_assets/images/cut/$image-0-$aspectRatio-th-120-0-0-0.$ext\" height=\"120\" title=\".$ext: $image $aspectWidth:$aspectHeight\"/>
            </a></li>";
        }
      }
      closedir($handle);
    }
  }

  ?>
  </ul>

<hr style="float:none;clear:both;">

  <p>Show: <a href="index.php?show=">used</a> <a href="index.php?show=all">all</a> <a href="index.php?show=raw">raw</a></p>
  
<?php include 'footer.php' ?>
