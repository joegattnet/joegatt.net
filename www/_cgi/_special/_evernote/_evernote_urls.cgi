#!/usr/bin/perl -T

require '../_basics.cgi';
$dsn = 'DBI:mysql:notes:localhost';

print ("Content-Type: text/html; charset=UTF-8\n\n");

print "<p>&gt;&gt; Evernote</p>";

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
  SELECT id2,url 
  FROM crossrefs,urls 
  WHERE id1=urls.Id AND ref1=7 AND crossrefs.usersId=0 AND urls.usersId=0 AND crossrefs.deleted=0 AND urls.deleted=0;
});

$sth->execute();

print "<p>Done 0</p>";

while (my ($id2,$url) = $sth->fetchrow_array()) {
  push(@myarray,"$id2|$url");
}

$sth->finish();

my $sth = $dbh->prepare(qq{
  SELECT id1,url 
  FROM crossrefs,urls 
  WHERE id2=urls.Id AND ref2=7 AND crossrefs.usersId=0 AND urls.usersId=0 AND crossrefs.deleted=0 AND urls.deleted=0;
});

$sth->execute();

print "<p>Done 1</p>";

while (my ($id1,$url) = $sth->fetchrow_array()) {
  push(@myarray,"$id1|$url");
}

$sth->finish();

print "<p>Done 2</p>";

# ******************************************************************************

foreach $myarray (@myarray){
  
  print "<p>$myarray</p>";
  @temp = split(/\|/,$myarray);

  my $sth = $dbh->prepare(qq{
      UPDATE evernote 
      SET url=? 
      WHERE aId=?;
  });

$sth->execute(@temp[1],@temp[0]);

}

$dbh->disconnect();

print "<p>Done!</p>";
