#!/usr/bin/perl -T

require '../basics.cgi';
require '../basics_broadcast.cgi';

formRead("post");
  
print ("Content-Type: text/html; charset=UTF-8\n\n");

if ($text ne ''){
  $text = cleanText($text);
  my $dbh = connectDB();
  my $sth = $dbh->prepare(qq{
    INSERT INTO comments (text,date_created,user_id,page_id,p) VALUES (?,UTC_TIMESTAMP(),?,?,?)
  });
  $sth->execute($text, $user_id, $page_id, $p);
  $sth->finish();
  $dbh->disconnect();
}

$username = show_username($user_id,true);
$fulldate = date_string_long();

print qq~
  <li id="added_comment" style="display:none;">
    <p><span class="order">$new_order</span>$text</p>
    <p class="details"><span href="/users/$username" class="user-name" rel="$username">me</span>, <span title="$fulldate">a moment ago</span></p>
  </li>
~;

$text = qq~"$text"~;

#$text = "$username said: ".$text;
#Get user's explicit permission in users/ before broadcasting their name

if($user_id ne '' && $user_id !=0){
  broadcast_log($text,"http://$serverName/$uri#pr-1.1",0,1,$user_id);
}

cache_refresh("common--comments.*$page_id");
