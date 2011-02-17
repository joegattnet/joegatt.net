#!/usr/bin/perl -T

use utf8;

require '../basics.cgi';

formRead("get");

use CGI;

$paragraph_count = 82;

$p=1;

print ("Content-Type: text/html; charset=UTF-8\n\n");

my $dbh = connectDB();

$sql = "SELECT page FROM source_text WHERE book_id=? AND p=?";
my $sth = $dbh->prepare("$sql");
$sth->execute($b,$p);

my ($collate) = $sth->fetchrow_array();
$sth->finish();

# MySQL 4.0 (as used by FutureQuest) does not support subqueries so we have to do two queries
#$sql = "SELECT source_text.text AS source,target_text.text AS target,target_text.p,date_created,target_text.Id FROM (SELECT MAX(date_created) AS latest,p FROM target_text GROUP BY p) X LEFT JOIN target_text ON date_created=latest AND x.p=target_text.p,source_text WHERE source_text.p>=$p AND source_text.book_id=$b AND target_text.book_id=$b AND source_text.p=target_text.p GROUP BY p ORDER BY p LIMIT $collate";

$sql = "SELECT MAX(date_created) AS latest FROM target_text WHERE book_id=? GROUP BY p";
my $sth = $dbh->prepare("$sql");
$sth->execute($b) or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";;

while (my ($latest) = $sth->fetchrow_array()) {
	 push(@dates,"'$latest'");
}

$allDates = join(",", @dates);

# MySQL 4.0 (as used by FutureQuest) does not seem to support this
#$date_format = "CASE DATEDIFF(UTC_TIMESTAMP(),target_text.date_created) WHEN 0 THEN DATE_FORMAT(target_text.date_created,'today at %H:%i') WHEN 1 THEN DATE_FORMAT(target_text.date_created,'yesterday at %H:%i') ELSE DATE_FORMAT(target_text.date_created,'on %e %b') END";

$date_format = "DATE_FORMAT(target_text.date_created,' %e %b %H:%i')";
$sql = "SELECT target_text.text AS target FROM target_text WHERE target_text.date_created IN ($allDates) AND target_text.book_id=? GROUP BY p ORDER BY p";

# ******************************************************************************

my $sth = $dbh->prepare("$sql");
$sth->execute($b) or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";

my $showPage = 0;

print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" media="all" href="${root}_css/src/Admin.css" />
</head>
<body class="admin">
<h2>Target Text - latest versions</h2>
<textarea style="height:85%">
~;

while (my ($target) = $sth->fetchrow_array()) {
  print "$target\n";
}

print qq~</textarea>~;

$sth->finish();
$dbh->disconnect();
