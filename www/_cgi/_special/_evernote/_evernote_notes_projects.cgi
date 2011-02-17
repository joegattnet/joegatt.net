#!/usr/bin/perl -T

require '../_basics.cgi';
$dsn = 'DBI:mysql:notes:localhost';

print ("Content-Type: text/html; charset=UTF-8\n\n");

print "<p>&gt;&gt; Evernote</p>";

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
    SELECT id2,nickname 
    FROM crossrefs,projects
    WHERE crossrefs.deleted=0 AND projects.deleted=0 AND crossrefs.usersId=0 AND projects.usersId=0 AND id1=projects.Id AND ref1=0 AND ref2=6
});

$sth->execute();

while (my ($id2,$nickname) = $sth->fetchrow_array()) {
  push(@myarray,"$id2|$nickname");
}

$sth->finish();

my $sth = $dbh->prepare(qq{
    SELECT id1,nickname 
    FROM crossrefs,projects
    WHERE crossrefs.deleted=0 AND projects.deleted=0 AND crossrefs.usersId=0 AND projects.usersId=0 AND id2=projects.Id AND ref2=0 AND ref1=6
});

$sth->execute();

print "<p>Done 1</p>";

while (my ($id1,$nickname) = $sth->fetchrow_array()) {
  push(@myarray,"$id1|$nickname");
}

$sth->finish();

print "<p>Done 2</p>";

# ******************************************************************************

foreach $myarray (@myarray){
  
  print "<p>$myarray</p>";
  @temp = split(/\|/,$myarray);

  my $sth = $dbh->prepare(qq{
      UPDATE evernote 
      SET tags=CONCAT(tags,' ,',?)
      WHERE aId=? AND NOT tags IS NULL
  });

$sth->execute(@temp[1],@temp[0]);

  my $sth = $dbh->prepare(qq{
      UPDATE evernote 
      SET tags=?
      WHERE aId=? AND tags IS NULL
  });

$sth->execute(@temp[1],@temp[0]);

}

$dbh->disconnect();

print "<p>Done!</p>";
