#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");
formRead("post");

print ("Content-Type: text/html; charset=UTF-8\n\n");
print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" media="all" href="${root}_etc/css/src/Admin.css" />
</head>
<body class="admin">
<h2>Upload target text</h2>
<p>Delete previous versions manually.</p>
~;

if ($uploading) {

  $text =~ s/\n\n/\n/g;
  $text =~ s/  / /g;
	
	#hardcoded
	$u = 0;
	$source_text = 0;
	$version = 0;
  
  @paragraphs = split(/\n/,$text);
  
  my $dbh = connectDB();
  
  $counter = 0;
	$p = 0;
  foreach $paragraph (@paragraphs) {
  
    if ($paragraph ne '') {
    	$counter++;
			$p++;
      if ($counter>1) {
       $values .= ",";
      }
      #Timestamp is randomised to avoid getting trapped with the IN command
      $paragraph = cleanText($paragraph);
      $paragraph =~ s/\'/\'\'/g;
      $values .= "('$paragraph',$p,$version,$u,$b,TIMESTAMPADD(SECOND,RAND()*-1000,UTC_TIMESTAMP()),0)";
  	}
  
    if ($counter>200) {
      $values =~ s/\n|\r//g;
      $sql = "INSERT INTO target_text (text,p,version,user_id,book_id,date_created,score_total) VALUES $values;";
      $dbh->do($sql);
      $values='';
      $counter=0;
    }
  	
  }
  
  if ($values ne '') {
    $values =~ s/\n|\r//g;
    $sql = "INSERT INTO target_text (text,p,version,user_id,book_id,date_created,score_total) VALUES $values;";
    $dbh->do($sql);
  }	 

	$dbh->disconnect();
	
	print "<p>Text uploaded: $p paragraphs.</p>";

  print "<hr/>";
  $sql = "SELECT text FROM target_text WHERE book_id=? ORDER BY p;";
  my $sth = $dbh->prepare("$sql");
  $sth->execute($b);

  while (my ($text) = $sth->fetchrow_array()) {
    print "<p>$text</p>";
  }

  my $sth = $dbh->prepare("UPDATE target_text SET date_created=DATE_ADD(date_created,INTERVAL Id*-1 SECOND) WHERE book_id=?");
  $sth->execute($b) or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";
	$dbh->disconnect();

} else {

  print qq~
  <form method="post">
  			<textarea name="text"></textarea>
  			<input type="hidden" name="uploading" value="true" />
  			<input type="hidden" name="book_id" value="$b" />
  			<input type="submit" value="upload" />
  </form>
  ~;

}

print qq~
</body>
</html>
~;
