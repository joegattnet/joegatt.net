<?php

function imagecachebuster($imageName,$newRnd,$aspectRatio){

  if ($handle = opendir('../../../_assets/images/cut')) {
    while (($file = readdir($handle)) !== false) {
      if(strrpos($file, $imageName) !== false && strrpos($file, $aspectRatio) !== false) {
        unlink("../../../_assets/images/cut/$file");
        print "<p>Deleted from cache: $file</p>";
      }
    }
    closedir($handle);
  }

}

?>