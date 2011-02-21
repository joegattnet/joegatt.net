#!/usr/bin/perl -T

require '../basics.cgi';

formRead("post");
print ("Content-Type: text/html; charset=UTF-8\n\n");

print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" media="all" href="${root}_etc/css/src/Admin.css" />
</head>
<body class="admin">
<h2>SQL</h2>
<form method="post">
<textarea name="qsql">$qsql</textarea><br/>
<input type="submit" value="execute"/>
</form>
<br/><br>
~;

if ($qsql ne "") {

my $dbh = connectDB();

print qq~
<br/>$qsql<br/><br>
~;

my $sth = $dbh->prepare("$qsql");
$sth->execute() or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$qsql</p>";

my $rows = $sth->rows;

  my $name = $sth->{'NAME'};

  $counter = 0;
  foreach ($name) {
		$prep = $name->[$counter];
		$counter++;
		push(@result,$prep);
	}

  $header = join('',@result);

if ($rows == 0) {
  print "<span class='negmess'>No rows affected.</span><br/><br/>";
} elsif ($rows == 1) {
	print "1 row affected";
} else {
	print "$rows rows affected";
}

if ($rows != 0) {
print qq~
<br/><br/><table cellpadding="0" cellspacing="10" border="0">
<tr>$header</tr>
~;

while (my @cols = $sth->fetchrow_array()) {
	print "<tr>";
	foreach $value (@cols) {
		print "<td>$value</td>";
	}
	print "</tr>";
}

print "</table></body></html>";
}

$sth->finish();
$dbh->disconnect();

}

print qq~
</body>
</html>
~;
