#!/usr/bin/perl -T

require '../basics.cgi';
require '../basics_broadcast.cgi';

formRead("post");

$text = cleanText($text);
$base_id = $p_id;
$base_id =~ s/paragraph_id_//;

print ("Content-Type: text/html; charset=UTF-8\n\n");

my $dbh = connectDB();

  my $sth = $dbh->prepare(qq{
    INSERT INTO target_text (text,p,user_id,score,score_total,book_id,date_created,version,base_id) VALUES (?,?,?,?,?,?,UTC_TIMESTAMP(),?,?)
  });
  $sth->execute($text,$p,$u,$score,$score_total,$b,$version,$base_id);
  my $id = $dbh->last_insert_id(undef, undef, $_[2], ID);
  $sth->finish();

  print qq~
  <script type="text/javascript">
  \$('#alert').text('Paragraph $p saved.');
  if (!\$('\#$p_id').hasClass('version')){
    \$('\#$p_id').animate({color: NB.S.color.text},2000);
  }
  \$('#total').animate({color: NB.S.color.neutral}, 2000);
  \$('\#$p_id').data('p_text',\$('$p_id').text());
  \$('\#$p_id').data('dirty',false);
  \$('\#$p_id').id = 'paragraph\_id\_$id';
  NB.versions['p$id'] = [$u,"$username",$score,'a moment ago','You saved this paragraph in the current session.',$version,true];
  if (NB.p.current == $p) {
    NB.Versions.display('$id');
  }
  //NB.Anagram.get();
  </script>
  ~;
  #IF WE WANT TO UPDATE THIS WE NEED TO BRING IT FROM BASICS
  
  $dbh->disconnect();
  saveAnagramParagraph($b,$p,$text);
  
  if ($p>1) {
    $url = "http://joegatt.net/wutz/$p";
  } else {
    $url = "http://joegatt.net/wutz/1";
  }
  
  $score_total = OOOcomma($score_total);
  
  $text = "Wutz P$p improved by $score to $score_total: ".$text;

  #$text = "$username improved Wutz P$p by $score to $score_total: ".$text;
  #Get user's explicit permission in users/ before broadcasting their name
  
  broadcast_log($text,"$url#pr-1.2",1,0,$u);

  cache_refresh("b=$b.*p=$p");

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
#  NB.Ui.screencover.show();
# NB.Nav.track(2,'Security Alert', 'User level changed', NB.User.name, NB.User.id);
#	NB.Cookie.remove('rememberme');
#	NB.Cookie.remove('user_id');
#	NB.Cookie.remove('rmcode');
#  alert("INTEGRITY ERROR - Reloading page");
#  location.reload(true);
#  //]]>
#  </script>
#  ~;

#}
