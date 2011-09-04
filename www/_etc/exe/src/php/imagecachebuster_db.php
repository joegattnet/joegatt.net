<?php

function imagecachebuster_db($imageName,$oldRnd,$newRnd,$aspectRatio){

/* Is this necessary?
  $con = connect_db();
  $query = sprintf("UPDATE resources SET rnd='%s' WHERE title='%s'",
      $newRnd,
      mysql_real_escape_string($imageName)
  );
  $result = mysql_query($query);
*/

/* Is this necessary? Notes are still asking for the old image... can also do via cron job
  $query = sprintf("SELECT DISTINCT tags.name FROM tags, notes, _lookup WHERE _lookup.check1 = notes.e_guid AND _lookup.check2 = tags.e_guid AND _lookup.type = 0 AND notes.e_guid IN (SELECT DISTINCT notes.e_guid FROM resources, notes, _lookup WHERE _lookup.type = 1 AND _lookup.check1 = notes.e_guid AND _lookup.check2 = resources.e_guid AND resources.title = '%s'",
        mysql_real_escape_string($imageName)
  );
  $result = mysql_query($query);

  if ($handle = opendir('../../_cache')) {
    while (($file = readdir($handle)) !== false) {
      if(strrpos($file, "$imageName-$oldRnd") !== false) {
        #unlink("../../_cache/$file");
        #print "<p>Deleted from cache: $file</p>";
      }
    }
    closedir($handle);
  }
  mysql_close($con);
*/

}

?>