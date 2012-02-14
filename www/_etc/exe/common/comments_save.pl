#!/usr/bin/perl -T

require '../basics.pl';
require '../basics_broadcast.pl';

formRead("post");
  
print ("Content-Type: text/html; charset=UTF-8\n\n");

if($user_id ne '' && $user_id !=0 && $p ne '' && $url ne ''){

  if ($text ne ''){
    $text = cleanText($text);
    my $dbh = connectDB();
    my $sth = $dbh->prepare(qq{
      INSERT INTO comments (text, date_created, user_id, page_id, url, p, book_id, version) VALUES (?,UTC_TIMESTAMP(),?,?,?,?,?,?)
    });
    $sth->execute($text, $user_id, $page_id, $url, $p, $b, $version);
    
    $dbh->disconnect();
  }
  
  $username = show_username($user_id,true);
  $date_full = date_string_long();
  $date_iso8601 = date_string_iso();
  
  print qq~
    <li id="added_comment" style="display:none;">
      <p><span class="order">$new_order</span>$text</p>
      <p class="details"><span class="user-name" rel="$username">me</span>, <time class="updated timeago" datetime="$date_iso8601" pubdate>$date_full</time></p>
    </li>
  ~;
  
  $text = qq~"$text"~;
  
  #$text = "$username said: ".$text;
  #Get user's explicit permission in users/ before broadcasting their name
  
  broadcast_log($text,"http://$serverName/$uri#pr-1.1",0,1,$user_id);
  
  cache_refresh("common--comments.*$page_id");

}
