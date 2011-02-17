#!/usr/bin/perl -T

require '../_basics.cgi';
$dsn = 'DBI:mysql:notes:localhost';

print ("Content-Type: text/html; charset=UTF-8\n\n");

print "<p>&gt;&gt; Evernote</p>";

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
  SELECT Id,url,title,dateCreated,dateModified  
  FROM urls 
  WHERE deleted=0 AND usersId=0 AND NOT Id IN (SELECT id1 FROM crossrefs WHERE ref1=7) AND NOT ID IN (SELECT id2 FROM crossrefs WHERE ref2=7)
});

$sth->execute();

print "<p>Done 0</p>";

while (my ($aId,$url,$title,$dateCreated,$dateModified) = $sth->fetchrow_array()) {
      push(@myarray,"$aId|$url|$title|$dateCreated|$dateModified");
}

$sth->finish();

my $sth = $dbh->prepare(qq{
    INSERT INTO evernote (aId,aType,url,title,dateCreated,dateModified) VALUES (?,?,?,?,?,?)
});

foreach (@myarray) {
  @temp = split(/\|/,$_);
  $sth->execute(@temp[0],7,@temp[1],@temp[2],@temp[3],@temp[4]);
}

print "<p>Done 2</p>";

$sth->finish();
$dbh->disconnect();

print "<p>Done!</p>";
