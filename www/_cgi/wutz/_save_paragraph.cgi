#!/usr/bin/perl -T

require '../_basics.cgi';
require "../_basics_broadcast.cgi";

formRead("post");

$text = cleanText($text);
$base_id = $p_id;
$base_id =~ s/paragraph_id_//;

#$sql = "INSERT INTO target_text (text,sequence,user_id,score,score_total,book_id,date_created,version) VALUES ('$text',$sequence,$u,$score,$score_total,$b,UTC_TIMESTAMP(),$version)";
#$id = quickDB($sql);

print ("Content-Type: text/html; charset=UTF-8\n\n");

my $dbh = connectDB();

  my $sth = $dbh->prepare(qq{
    INSERT INTO target_text (text,sequence,user_id,score,score_total,book_id,date_created,version,base_id) VALUES (?,?,?,?,?,?,UTC_TIMESTAMP(),?,?)
  });
  $sth->execute($text,$sequence,$u,$score,$score_total,$b,$version,$base_id);
  my $id = $dbh->last_insert_id(undef, undef, $_[2], ID);
  $sth->finish();

  print qq~
  <script type="text/javascript">
  //<![CDATA[
  \$('alert').update('Paragraph $sequence saved.');
  if (!\$('$p_id').hasClassName('version')){
    \$('$p_id').morph('color:'+NB.SETTINGS.color.text);
  }
  \$('total').morph('color:'+NB.SETTINGS.color.neutral);
  \$('$p_id').writeAttribute('p_text',\$('$p_id').innerHTML);
  \$('$p_id').id = 'paragraph\_id\_$id';
  NB.W.versions.info[$id] = [$u,"$username",$score,'just now','You saved this paragraph in the current session.',$version,true];
  if (NB.p.current == $sequence) {
    NB.W.versions.display($id);
  }
  //NB.W.anagram.get();
  //]]>
  </script>
  ~;
  #IF WE WANT TO UPDATE THIS WE NEED TO BRING IT FROM BASICS
  
  $dbh->disconnect();
  saveAnagramParagraph($b,$sequence,$text);
  
  if ($sequence>1) {
    $url = "http://joegatt.net/wutz/$sequence";
  } else {
    $url = "http://joegatt.net/wutz/1";
  }
  
  $score_total = OOOcomma($score_total);
  
  $text = "$username improved Wutz P$sequence by $score to $score_total: ".$text;
  
  broadcast_log($text,"$url#pr-1.2",1,0,$u);

# Or check integrity but make broadcasts lazy somehow
# Maybe use a cron job every 5 mins (with 50% chance)
  
#TEST USER LEVEL INTEGRITY
#MAYBE WE CAN do CONDITIONAL MYSQL
#  my $sth = $dbh->prepare(qq{
#    SELECT level=? FROM users WHERE Id=?
#  });
#  $sth->execute($user_level,$u);
#  ($matches) = $sth->fetchrow_array();
#  $sth->finish();

#if ($matches!=1) {

#  print qq~
#  <script type="text/javascript">
#  //<![CDATA[
#  NB.page.showScreenCover();
# _gaq.push(['_trackEvent','Security Alert', 'User level changed', NB.user.name, NB.user.id]);
#	NB.Cookie.remove('rememberme');
#	NB.Cookie.remove('user_id');
#	NB.Cookie.remove('rmcode');
#  alert("INTEGRITY ERROR - Reloading page");
#  location.reload(true);
#  //]]>
#  </script>
#  ~;

#}
