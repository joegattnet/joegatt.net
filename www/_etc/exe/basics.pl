#!/usr/bin/perl -T

use utf8;
use URI::Escape;
use CGI;

# ******************************************************************************

  #require 'config/common.pl';

	$serverName = $ENV{"SERVER_NAME"};
	$uri = $ENV{"REQUEST_URI"};
 	$root = '/';
 	$debug = 1;
  
  $twitter_consumerkey = '026ussCKYOuzzcZjSV7UQ';
  $twitter_accesstoken = '66855083-GSzTcum1aWOdkEBqQTQQYCusW89TgLrvbwtzDDlcj';
  
  $db_pwfileloc = '/home/admin/_db_passwords/joegatt-net/live.txt';
  $saltfileloc = '/home/admin/_db_passwords/joegatt-net/salt.txt';
  $facebooksecretloc = '/home/admin/_db_passwords/joegatt-net/facebook.txt';
  $twitter_consumersecretloc = '/home/admin/_db_passwords/joegatt-net/twitter_consumersecret.txt';
  $twitter_accesstokensecretloc = '/home/admin/_db_passwords/joegatt-net/twitter_accesstokensecret.txt';
  $protectedloc = '/home/admin/_db_passwords/joegatt-net/protected.txt';
  $localhost = 0;
  $notesThreshold = 2;

  if ($serverName eq 'test.joegatt.org') {
  	$debug = 1;
  	$dsn = 'DBI:mysql:joegatt-net-test:localhost';
    $githubBranch = 'dev';
    $accessFile = "/var/log/apache2/access-test.log";
    $errorFile = "/var/log/apache2/error-test.log";
  }	elsif ($serverName =~ /joegatt\.org/) {
  	$debug = 1;
  	$dsn = 'DBI:mysql:joegatt-net-dev:localhost';
    $notesThreshold = 1;
    $githubBranch = 'dev';
    $accessFile = "/var/log/apache2/access-dropbox.log";
    $errorFile = "/var/log/apache2/error-dropbox.log";
  } else {
  	$debug = 0;
    $dsn = 'DBI:mysql:joegatt-net-production-v2:localhost';
    $githubBranch = 'master';
    $imageServer = 'http://a1.joegatt.org';
    $serverName = 'joegatt.net';
    $accessFile = "/var/log/apache2/access.log";
    $errorFile = "/var/log/apache2/error.log";
  }

# ******************************************************************************

sub formRead {

  	my $whichMethod = $_[0];
    if ($whichMethod eq "get") {
      if ($ARGV[0] ne '') {
        $buffer = $ARGV[0];
      } else {
        $buffer = $ENV{'QUERY_STRING'};
        $formMethod = "get";
      }
    } else {
      read(STDIN, $buffer, $ENV{CONTENT_LENGTH});
      $formMethod = "post";
    }
  
  @cgiPairs = split(/&/,$buffer);
  
  foreach $cgiPair (@cgiPairs) {
      ($name,$value) = split(/=/,$cgiPair);
      $value =~ s/\+/ /g;
      $value =~ s/%(..)/pack("c",hex($1))/ge;
      $$name = "";
      $$name .= "\0" if (defined($form{$name}));
      $$name .= "$value";
    }
}

# ******************************************************************************

sub parseDBcredentials {
  open (DBPASSWORDS, untaint($db_pwfileloc)) or die warn "Can't open DB passwords  file.";
    my @dbpwfile = <DBPASSWORDS>;
    $credentials = "@dbpwfile";
  close (DBPASSWORDS);
  $credentials =~ /([^\,]*)\,([^\n]*)/;
  $db_user_name = $1;
  $db_password = $2;
}

# ******************************************************************************

sub connectDB {
  parseDBcredentials();
  use DBI;
	my $dbh = DBI->connect("$dsn", $db_user_name, $db_password)or die warn "<p class='error'>Can't connect to $dsn!</p>";#$DBI::errstr;
	return $dbh;
}

# ******************************************************************************

sub quickDB {
  parseDBcredentials();
	my $dbh = connectDB();
	$dbh->do($_[0]);
  my $id = $dbh->last_insert_id(undef, undef, $_[2], ID);
	$dbh->disconnect();
	return $id;
}

# ******************************************************************************

sub textTruncate {
  my $string = $_[0];
  my $displaychrs = $_[1];
  my $isTitle = $_[2];
  if ($isTitle eq "true") {
    $string =~ s/(:|\,|\;| \- ).*//;
  }
  if (length($string) > $displaychrs) {
    $string = substr($string,0,($displaychrs-3));
    $string =~ s/\<.*$//g;
    $string =~ s/ \w*$//;
    $string =~ s/\W$//g;
    $string =~ s/\W$//g;
    $string .= "...";
  }
  return $string;
}

# ******************************************************************************

sub textTruncateLink {
my $string = $_[0];
my $displaychrs = $_[1];
my $isTitle = $_[2];
my $href = $_[3];
my $title = $_[4];
if ($isTitle eq "true") {$string =~ s/(:|\,|\;| \- ).*//;}
if (length($string) > $displaychrs) {
$string = substr($string,0,($displaychrs-3));
$string =~ s/ \w*$//;
$string =~ s/\W$//g;
$string .= "<a href=\"$href\" title=\"$title\" class=\"ellipses\">...</a>";
}
return $string;
}

# ******************************************************************************

sub OOOcomma {
my $temp = $_[0];
$temp =~ s/(^[-+]?\d+?(?=(?>(?:\d{3})+)(?!\d))|\G\d{3}(?=\d))/$1,/g;
return $temp;
}

# ******************************************************************************

sub DEnormalize {
  use Lingua::DE::ASCII;
  return to_ascii(Encode::decode_utf8($_[0]));
}

# ******************************************************************************

sub flattenText {
  my $text = $_[0];
  $text = DEnormalize($text);
  $text =~ s/\W//g;
  $text = "\L$text\E";
	return $text;
}

# ******************************************************************************

sub cleanText {
    use Encode;
    $text = $_[0];
    $text = decode('UTF-8',$text);
    $text =~ s/ \-+ /—/g;
    $text =~ s/^\s+|\s+$|\n//g;
    $text  =~ s/“|”/"/g;
    $text  =~ s/\"/'/g;
    $text  =~ s/\‘|\’/'/g;
    $text  =~ s/(^'?"?\(?|\. '?"?\(?|\? '?"?\(?|\! '?"?\(?)(\w)/$1.uc($2)/eg;
    $text  =~ s/\'/’/g;
    $text  =~ s/’\b/‘/g;
    $text  =~ s/\b‘\b/’/g;
    $text  =~ s/"\b/‘/g;
    $text  =~ s/\b"/’/g;
    $text  =~ s/\' /’/g;
    $text =~ s/  / /g;
    $text =~ s/(\w)$/$1./g;
    $text =~ s/([a-zA-z])([A-Z]+)/$1\L$2\E/g;
  return $text;
}

# ******************************************************************************

sub simplifyText {
    $text = $_[0];
    $text  =~ s/([‘’“”"])/'/g; #"
    $text =~ s/—/-/g;
    $text =~ s/\n//g;
    $text =~ s/  / /g;
  return $text;
}


# ******************************************************************************

sub pluralize_regular {
    $text = $_[0];
    $number = $_[1];
    if ($number != 1) {
      $text .= 's';
    }
  return $text;
}

# ******************************************************************************

sub get_bitly {
  $url = $_[0];
  if ($url !~ /\#pr\-/) {
    $url =~ s/($serverName)(.*?#)(.*)/$1$3/;
  }
  use URI::Escape;
  $url = uri_escape($url);
  use LWP::Simple;
  $bitlyurl = "http://api.bit.ly/shorten?version=2.0.1&longUrl=$url&login=joegattnet&apiKey=R_394f906e44f9637b16d1adf22b0fae8a&history=0&format=text";
  return get($bitlyurl);
}

# ******************************************************************************

sub saveAnagramParagraph {
  my $b = $_[0];
  my $p = $_[1];
  my $target_text = $_[2];
	$dbh = connectDB();

	if ($target_text eq '') {
  
    #date_created needs to be replaced by score
  
    $sql = "SELECT text FROM target_text WHERE p=? AND book_id=? ORDER BY date_created DESC LIMIT 1;";
    my $sth = $dbh->prepare("$sql");
    $sth->execute($p,$b);
    
    
    my $text = $sth->fetchrow_array();
    my $target_text = "$text";
    
  }

    $target_text = flattenText($target_text);
    
    @character_target_text = split(//,$target_text);
    
		undef %target_counter;
    foreach $character (@character_target_text) {
    	$target_counter{$character}++;
    }
    
    foreach $character (keys %target_counter) {
    	push(@values, "($b,$p,'$character',$target_counter{$character})");
#    	push(@chartvalues, $target_counter{$character});
    }

  $values_string = join(',', @values);
  
  $sql = "REPLACE INTO character_count (book_id,p,label,count) VALUES $values_string;";
  
  my $sth = $dbh->prepare("$sql");
  $sth->execute();
	
	
  $dbh->disconnect();
  saveAnagram($b);
}

# ******************************************************************************

sub saveAnagram {  

	my $dbh = connectDB();
  my $b = $_[0];
  
  # Update flat anagram ********************************************************
 
  my $sql = "SELECT label, SUM(count) FROM character_count WHERE book_id=? GROUP BY label";
  my $sth = $dbh->prepare($sql);
  $sth->execute($b);
  
  $anagram_table = "<table><tbody>";

  while (my ($label,$count) = $sth->fetchrow_array()) {
    push(@jsarrayvalues, "$count");
    $anagram_table .= "<tr><th>$label</th><td>$count</td></tr>";
    $anagram_total += abs($count);
    
    if ($label eq 'b') {
      $anagram_table .= "</tbody></table><table class=\"middle\"><tbody>";
    } elsif ($label eq 'n') {
      $anagram_table .= "</tbody></table><table><tbody>"
    }

  }

	
	$dbh->disconnect();

  $anagram_table .= "</tbody></table>";
  $anagram_total_comma = OOOcomma($anagram_total);
  $anagram_table = "<div id=\"total_change\"><p id=\"total\" class=\"version-source-subtractive\">$anagram_total_comma</p><p id=\"change\"><!-- --></p></div><p id=\"alert\">Anagram status.</p><div class=\"tables clearfix\">$anagram_table</div>";

  $values_string = join(',', @jsarrayvalues);

  $location = untaint("../../../_etc/cache/enface--anagram-b=$b.json");
  open ANAGRAM_TABLE,">$location" or die warn "ERRROR: File not opened: $! $location";
  print ANAGRAM_TABLE "[$values_string]";
  close ANAGRAM_TABLE;
  
  $location = untaint("../../../_etc/cache/enface--anagram-b=$b.html");
  open ANAGRAM_TABLE,">$location" or die warn "ERRROR: File not opened: $! $location";
  print ANAGRAM_TABLE $anagram_table;
  print ANAGRAM_TABLE qq~
    <script type="text/javascript">
    NB.loaded_scripts.add(false, function(){
      NB.Anagram.anagram = [$values_string];
      NB.Cache.add('_anagram',NB.Anagram.anagram);
    });
    </script>  
  ~;
  close ANAGRAM_TABLE;

  $dbh->disconnect();
  
  #Remove - use client-side cloning
  #$version_number = eval ("1 - 0.$anagram_total");
  #$location = untaint("../../../_etc/cache/enface--version-b=$b.html");
  #open VERSION_NUMBER,">$location" or die warn "ERRROR: File not opened: $! $location";
  #print VERSION_NUMBER " $version_number";
  #close VERSION_NUMBER;

#also print title's colour

#also download piechart from google charts and save locally (use timestamp when showing)

#THESE ARE NOT BEING PRINTED!!!
#  print qq~
#  <script type="text/javascript">
#  //<![CDATA[
#  		NB.Anagram.anagram = [$values_string];
#  		NB.Anagram.update();
#  //]]>
#  </script>
#  ~;

}

# ******************************************************************************

sub untaint {
  $temp = $_[0];
  if ($temp =~ /(.*)/){
    $temp = $1;
  }
  return $temp;
}

# ******************************************************************************

sub show_username {
  my $user_id = $_[0];
  my $is_twitter = $_[1];

#if user has chosen to show twitter, use twitter - or first name, full name, etc

	my $dbh = connectDB();
	my $sql = "SELECT username FROM users WHERE Id=?";
  my $sth = $dbh->prepare("$sql");
  $sth->execute($user_id);
  my $showname = $sth->fetchrow_array();
	
	$sth->finish();
	$dbh->disconnect();
	
	return $showname;

}

# ******************************************************************************

sub debug_info {

  if($debug){
    $extra = $_[0];
    $fileName = $ENV{"SCRIPT_FILENAME"};
    $pathName = $fileName;
    $fileName =~ s/(.*)\/(.*?)/$2/;
    ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)=localtime(time);
  
    my $output .= qq~
      <div class="debug-info clearfix">
        <strong><span title="$pathName">$fileName</span> ~;
  
    #printf "%02d:%02d:%02d %2d.%02d.%02d",$hour,$min,$sec,$mday,$mon+1,$year-100;
    $output .= "$hour:$min:$sec $mday.".($mon+1).".".($year-100);
       
    $output .= qq~
        $dateTime</strong> $extra
      </div>
    ~;
    
    return $output;
    
  }

}

# ******************************************************************************

sub get_salt {
  if ($stored_salt eq '') {
      open (SALT, untaint($saltfileloc)) or die warn "Can't open Salt file.";
    my @saltfile = <SALT>;
    $stored_salt = "@saltfile";
    close (SALT);
  }
  return $stored_salt;
}

# ******************************************************************************

sub get_password {
  my $fileloc = $_[0];
  open (PASSWORD, untaint($fileloc)) or die warn "Can't open '$fileloc' file: $!.";
  my @passwordfile = <PASSWORD>;
  $password = "@passwordfile";
  close (PASSWORD);
  return $password;
}

# ******************************************************************************

sub date_string_long {
  ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)=localtime(time);
  @months3letter = ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
  return "$mday ".@months3letter[$mon]." ".($year+1900)." at ".sprintf("%02d", $hour).":". sprintf("%02d", $min)." UTC";
}

# ******************************************************************************

sub date_string_iso {
   use POSIX qw(strftime);
   return strftime("%Y-%m-%dT%H:%M:%S", localtime());
}

# ******************************************************************************

sub cache_output {
  $location = $_[0];
  $output = $_[1];
  
  if ($output eq ''){
    $output = '<span style="display:none">&nbsp;</span>';  
  }
  
  $location =~ s/(\&?)scope=([a-z]*?)//;
  
  #$location =s/\&ext\=([a-z]{2,4})//;
  #$extension = $1;
  #if ($extension eq ''){
  #  $extension = 'shtml';
  #)
  #$location = "$location.$extension";
  
  print $location;
  
  $location = untaint($location);
  open CACHE, ">$location" or print "ERRROR: Cache file not opened: $location";
  print CACHE "$output";
  close CACHE;
  
  # If the call is coming from Apache, the content will also be sent to the browser.
  # Remember though that since the url will have been rewritten, and we're using gzip,
  # a content encoding error will occur on the parent document.
  # The cache should, therefore, always be primed (at least until Apache fix the 
  # mod_rewrite > mod_include > mod_deflate bug).

  if($cache_only ne 'true'){
    print ("Content-Type: text/html; charset=UTF-8\n\n"); #//no-gzip dont-vary
    # This would be required when the above issue is resolved
    # then we would need to distinguish between running inside a cached page and
    # a cron-job. As it is, it litters cron emails with output.
    print $output;
   }
  
}

# ******************************************************************************

sub cache_refresh {
  $identifier = $_[0];
  $feedback = $_[1];
  $deleteOnly = $_[2];
  opendir(DIR, "../../../_etc/cache/");
  @files = grep(/$identifier/i,readdir(DIR));
  closedir(DIR);

  #Deleting the file should be enough but we also need to prime cache (see above)
  use LWP::UserAgent;
  my $ua = new LWP::UserAgent;
  #do we need password to access cache directly?
  if($debug){
    open (PASSWORDS, untaint($protectedloc)) or die warn '<p class="error">Can\'t open passwords  file.';
      my @protectedloc = <PASSWORDS>;
      $credentials = "@protectedloc";
    close (PASSWORDS);
    $credentials =~ /([^\,]*)\,([^\n]*)/;
    $user_name = $1;
    $password = $2;
    $ua->credentials(
      "$serverName:80",
      "Dev",
      $user_name => $password
    );
  }
  $ua->agent("Mozilla/6.0");
  #*****************************************************************************
  
  $feedbackVerb = "Delet";
  
  foreach $file (@files) {
    $cachefile = "../../../_etc/cache/$file";
    $cachefile = untaint($cachefile);
    if($file =~ /archive=true/){
      my $archivefile = "../../../_etc/archive/$file";
      use POSIX;
      my $timestamp = POSIX::strftime("%H%M%S%m%d%Y", localtime);
      $archivefile =~ s/(.*)(\..{3,4})$/$1---$timestamp$2/;
      $archivefile = untaint($archivefile);
      rename($cachefile,$archivefile);
      print "<p>Archived: <a href='$archivefile'>$archivefile</a></p>";
    } else {
      unlink($cachefile);
    }
    
    if(!$deleteOnly){
      $feedbackVerb = "Refresh";
      #Priming cache
      $url = "http://" . $serverName . "/_etc/cache/$file";
      #$url =~ s/\&scope=[a-z]//;
      my $reqPurge = new HTTP::Request PURGE => $url;
      my $reqGet = new HTTP::Request GET => $url;
      my $res = $ua->request($reqPurge);
      my $res = $ua->request($reqGet);
      sleep 1;
      if($file !~ /\.html$/){
        #request xssi pages four times to refresh included includes
        my $res = $ua->request($reqGet);
        sleep 1;
        my $res = $ua->request($reqGet);
        sleep 1;
        my $res = $ua->request($reqGet);
        sleep 1;
      }
      if ($debug){
        if ($res->is_error) {
          print "<p class='error'>Could not refresh cache: <a href='$url'>$url</a>".$res->is_error."|".$res->content."</p>";
        }
      }
      
      #*******
    }
    if ($feedback){
      print "<p>${feedbackVerb}ing: <a href='$url'>$file</a></p>";
      $feedback_counter++;
    }
  }
    if ($feedback){
      print "<p>${feedbackVerb}ed $feedback_counter files.</p>";
    }
}

#If a page is refreshed: curl http://developers.facebook.com/tools/lint/?url={YOUR_URL}&format=json

# ******************************************************************************

sub linkifyPath {
  $fileNav = $_[0];
  $crumbPath = $_[1];
  @crumbs = split('/', $fileNav);
  $last = pop(@crumbs);
  foreach $crumb (@crumbs) {
    $crumbPath .= "/$crumb";
    $linkifiedPath .= "/<a href=\"$crumbPath\" class=\"source-file\">$crumb</a>";
  }
  $linkifiedPath .= "/$last";
  return $linkifiedPath;
}

# ******************************************************************************

sub tagLinkify {
  $tag = $_[0];
  #tag name should already be normalised via name_simple
  #use Encode;
  #$tag = lc($tag);
  #$tag = to_ascii(Encode::decode_utf8($tagLink));
  #$tag =~ s/\s+|\W+/_/g;
  #$tag =~ s/^_|_$//g;
  #Should we only keep date for books?
  return $tag;
}

# ******************************************************************************

sub tagName {
  my $tag = $_[0];
  $tag =~ s/(.*) +(\d{4}[a-z]?):.*/$1 $2/;
  return $tag;
}

# ******************************************************************************

sub tagListItem {
  my $tag = $_[0];
  my $tagLink = $_[1];
  my $inline = ' ' . $_[2];
  my $forceName = $_[3];
#  my $tagLink = tagLinkify($tag);
  my $tagFull = $tag;
  my $listItem;
  $tag = tagName($tag);
  if($forceName && $forceName ne ''){
    $name = $forceName;
  } else {
    $name = $tag;
  }
  if($tag eq $tagFull) {
    $listItem = qq~
      <li><a href="/tags/$tagLink"$inline rel="tag">$name</a></li>
    ~;
  } else {
    $listItem = qq~
      <li><a href="/tags/$tagLink"$inline title="$tagFull" rel="tag">$name</a></li>
    ~;
  }
  return $listItem;
}

# ******************************************************************************

sub user_integrity {

}

1;
