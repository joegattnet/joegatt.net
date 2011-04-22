#!/usr/bin/perl -T

require '../basics.cgi';

formRead("post");

$text = cleanText($text);
$paragraph_id =~ s/paragraph\_id\_//;
  
print ("Content-Type: text/html; charset=UTF-8\n\n");

if ($text ne '' && $user_id ne ''){
  my $dbh = connectDB();
  my $sth = $dbh->prepare(qq{
    INSERT INTO comments (text,date_created,user_id,book_id,paragraph_id,p,type,page_id) VALUES (?,UTC_TIMESTAMP(),?,?,?,?,1,?)
  });
  $sth->execute($text, $user_id, $book_id, $paragraph_id, $p, $page_id);
  $sth->finish();
  $dbh->disconnect();
}

$username = show_username($user_id,true);
$date_full = date_string_long();
$date_iso8601 = date_string_iso();

print qq~
  <li id="added_scholia" style="display:none;">
    <p>$text</p>
  	<p class="details"><span class="user-name" rel="$username">me</span>, <abbr class="timeago" title="$date_iso8601">$date_full</abbr></p>
	</li>
~;

cache_refresh("scholia.*b=$book_id.*p=$p");
