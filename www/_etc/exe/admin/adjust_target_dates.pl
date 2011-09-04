#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");
print ("Content-Type: text/html; charset=UTF-8\n\n");

print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" media="all" href="${root}_assets/css/src/0.Admin.css" />
</head>
<body class="admin">
<h2>Randomise target text dates</h2>
~;

my $dbh = connectDB();
$sql = "UPDATE target_text SET date_created=DATE_ADD(date_created,INTERVAL Id*-1 SECOND) WHERE book_id=?";
my $sth = $dbh->prepare($sql);
$sth->execute($b) or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";
my $rows = $sth->rows;
$sth->finish();
$dbh->disconnect();

print qq~
<p>Target text date_created differentiated.</p>
<p>$rows rows affected.</p>
</body>
</html>
~;
