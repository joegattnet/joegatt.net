#!/usr/bin/perl -T

require '../basics.cgi';


formRead("get");
formRead("post");

print ("Content-Type: text/html; charset=UTF-8\n\n");
print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" media="all" href="${root}_etc/css/src/0.Admin.css" />
</head>
<body class="admin">
<h2>Upload source text</h2>
<p>Delete previous versions manually.</p>
~;

if ($uploading) {

  @paragraphs = split(/\n/,$text);
  
  my $dbh = connectDB();
  
  $counter = 0;
	$p = 0;
  $sql = "REPLACE INTO source_text (text,p,book_id,date_created) VALUES (?,?,?,UTC_TIMESTAMP());";
  my $sth = $dbh->prepare("$sql");

  foreach $paragraph (@paragraphs) {
    $paragraph = cleanText($paragraph);
    $p++;
    $sth->execute($paragraph,$p,1) or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";
  }

	print "<p>Text uploaded: $p paragraphs.</p>";

  print "<hr/>";
  $sql = "SELECT text FROM source_text WHERE book_id=? ORDER BY p;";
  my $sth = $dbh->prepare("$sql");
  $sth->execute($b) or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";

  while (my ($text) = $sth->fetchrow_array()) {
    print "<p>$text</p>";
  }

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
