#!/usr/bin/perl -T

require '../basics.pl';

print ("Content-Type: text/html; charset=UTF-8\n\n");

print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" media="all" href="${root}_assets/css/src/0.Admin.css" />
</head>
<body class="admin">
<h2>Stats</h2>
~;

my $dbh = connectDB();

# ******************************************************************************

$sql = "SELECT COUNT(*) FROM users WHERE confirmed=1";
my $sth = $dbh->prepare("$sql");
$sth->execute() or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";

while (my ($users) = $sth->fetchrow_array()) {
	print "<p><b>$users</b> confirmed users.</p>";
}

# ******************************************************************************

$sql = "SELECT COUNT(*) FROM users WHERE confirmed=0";
my $sth = $dbh->prepare("$sql");
$sth->execute() or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";

while (my ($users) = $sth->fetchrow_array()) {
	print "<p><b>$users</b> unconfirmed users.</p>";
}
# ******************************************************************************

$sql = "SELECT COUNT(*) FROM users WHERE TO_DAYS( NOW( ) ) - TO_DAYS( date_last_visit ) <=1;";
my $sth = $dbh->prepare("$sql");
$sth->execute() or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";

while (my ($users) = $sth->fetchrow_array()) {
	print "<p><b>$users</b> active users in the last day.</p>";
}
# ******************************************************************************

print "<hr/><h4>Wutz</h4>";


$dbh->disconnect();

print qq~
</body>
</html>
~;
