<?php
  #genericise
  $externalUrls = array(
    "github-readme-master" => "https://raw.github.com/joegattnet/joegatt.net/master/README.md",
    "github-readme-dev" => "https://raw.github.com/joegattnet/joegatt.net/dev/README.md"
  );

  $url = $externalUrls[$_GET['eu']]; 
  $output = file_get_contents($url);
  $output = '<article class="' . $_GET['class'] . '">' . $output . '</article>';

  print $output;

  $location = '../../cache/php-common--file_get-' . $_SERVER['QUERY_STRING'] . '.html';
  $fh = fopen($location, 'w') or die("Can't open file: $location");
  fwrite($fh, $output);
  fclose($fh);

?>

