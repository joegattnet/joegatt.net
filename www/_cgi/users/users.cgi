#!/usr/bin/perl -T

require 'basics.cgi';

formRead("get");

print ("Content-Type: text/html; charset=UTF-8\n\n");

my $dbh = connectDB();

$date_format = "CASE DATEDIFF(UTC_TIMESTAMP(),date_confirmed) WHEN 0 THEN DATE_FORMAT(date_confirmed,'today at %H:%i') WHEN 1 THEN DATE_FORMAT(date_confirmed,'yesterday at %H:%i') ELSE DATE_FORMAT(date_confirmed,'%e %b') END";
$sql = "SELECT username,SUM(score),COUNT(score),target_text.user_id,$date_format FROM target_text,users WHERE target_text.user_id=users.Id GROUP BY user_id ORDER BY SUM(score) DESC";
my $sth = $dbh->prepare("$sql");
$sth->execute();

print "||$user_id||<table cellpadding=\"5\" border=\"1\"><th><td>username</td><td>score</td><td>edits</td><td>joined</td></th>";

while (my ($username,$score,$edits,$id,$oined) = $sth->fetchrow_array()) {
  print "<tr><td><a href=\"user.cgi?id=$id\">$username</a></td><td>$score</td><td>$edits</td><td>$joined</td></tr>";
}

print "</table>";

$sth->finish();
$dbh->disconnect();