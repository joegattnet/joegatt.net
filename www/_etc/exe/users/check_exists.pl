#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

$dbh = connectDB();
  $sql = "SELECT Id FROM users WHERE (username=? AND username <> '') OR (email=? AND email <> '');";
  $sth = $dbh->prepare("$sql");
  $sth->execute($sent_username,$sent_email);
  my ($Id) = $sth->fetchrow_array();

  if ($Id) {
		  $exists = 'true';
	} else {
		  $exists = 'false';
	}
	
$dbh->disconnect();

print ("Content-Type: text/plain\n\n");
print qq~$jsoncallback({"exists":$exists})~;
