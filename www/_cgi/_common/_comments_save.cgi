#!/usr/bin/perl -T

require '../_basics.cgi';
require '../_basics_broadcast.cgi';

formRead("post");
  
print ("Content-Type: text/html; charset=UTF-8\n\n");

if ($text ne ''){

  $text = cleanText($text);

  my $dbh = connectDB();

  my $sth = $dbh->prepare(qq{
    INSERT INTO comments (text,date_created,user_id,page_id,sequence) VALUES (?,UTC_TIMESTAMP(),?,?,?)
  });
  $sth->execute($text, $user_id, $page_id, $p);
  
  $sth->finish();
  
  $dbh->disconnect();

}

print qq~
  <li id="added_comment" style="display:none;">
    <p>$text</p>
    <p class="details">me, just now</p>
  </li>
  <script type="text/javascript">
  //<![CDATA[
    NB.page.increment_commas(\$('comments_count').down('span'));
    var show = new Effect.SlideDown('added_comment');  
    var highlight = new Effect.Highlight('added_comment', { queue: 'end' });  
  //]]>
  </script>
~;

$username = show_username($user_id,true);

$text = "$username said: ".$text;

broadcast_log($text,"http://$serverName/$section/$p#pr-1.1",0,1,$user_id);
