<?php

function imagecachebuster($imageName,$oldRnd,$newRnd,$aspectRatio){

  if ($handle = opendir('../../_resources/cut')) {
    while (($file = readdir($handle)) !== false) {
      if(strrpos($file, $imageName) !== false && strrpos($file, $aspectRatio) !== false) {
        unlink("../../_resources/cut/$file");
        print "<p>Deleted from cache: $file</p>";
      }
    }
    closedir($handle);
  }

}

?>