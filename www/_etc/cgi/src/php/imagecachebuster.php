<?php

function imagecachebuster($imageName,$newRnd,$aspectRatio){

  if ($handle = opendir('../../../_etc/resources/cut')) {
    while (($file = readdir($handle)) !== false) {
      if(strrpos($file, $imageName) !== false && strrpos($file, $aspectRatio) !== false) {
        unlink("../../../_etc/resources/cut/$file");
        print "<p>Deleted from cache: $file</p>";
      }
    }
    closedir($handle);
  }

}

?>