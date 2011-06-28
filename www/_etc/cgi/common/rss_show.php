<?php

  #genericise
  $externalUrls = array(
    "github-commits-master" => "http://github.com/joegattnet/joegatt.net/commits/master.atom",
    "github-commits-dev" => "http://github.com/joegattnet/joegatt.net/commits/dev.atom",
    "addthis-rss-shared" => "http://q.addthis.com/feeds/1.0/shared.rss?domain=joegatt.net&pubid=joegattnet&period=month"
  );

  $url = $externalUrls[$_GET['eu']]; 
  $raw = file_get_contents($url); 
  $xml = new SimpleXmlElement($raw);
  
  $original_title = $xml->title;
  
  if($_GET['title']){
    $title = $_GET['title'];
  } else {
    $title = $original_title;
  }
  
  $output = '<link rel="alternate" type="application/rss+xml" title="' . $original_title . '" href="' . $url . '">';
  $output .= '<div class="rss"><h4><a href="' . $xml->link['href'] . '">' . $title . '</a></h4>';
  $output .= '<a href="' . $url . '" class="feed">' . $title . '</a></h4>';
  $output .= '<ul>';

  //RSS
  //foreach($xml->channel->item as $item) {
  //    print $item->description;
  //}
  //atom

  foreach($xml->entry as $item) {
      $output .= '<li><p><a href="' . $item->link['href'] .'">' . $item->title . '</a></p>';
      $output .= '<p class="details"><a href="' . $item->author->uri .'">' . $item->author->name .'</a>, <abbr title="' . $item->updated . '" class="timeago">' . $item->updated . '</abbr></p></li>';
  }
  
  //filter joegatt.net (make relative)
  
  $output .= '</ul></div>';

  print $output;

  $location = '../../cache/php-common--rss_show-' . $_SERVER['QUERY_STRING'] . '.html';
  $fh = fopen($location, 'w') or die("Can't open file: $location");
  fwrite($fh, $output);
  fclose($fh);

?>
