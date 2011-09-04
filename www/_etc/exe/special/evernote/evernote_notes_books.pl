#!/usr/bin/perl -T

require '../basics.pl';
$dsn = 'DBI:mysql:notes:localhost';

print ("Content-Type: text/html; charset=UTF-8\n\n");

print "<p>&gt;&gt; Evernote</p>";

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
    SELECT id2,CONCAT(surname,': ',title),booksPages
    FROM crossrefs,books_flat
    WHERE crossrefs.deleted=0 AND crossrefs.usersId=0 AND id1=books_flat.booksId AND ref1=3 AND ref2=6
});

$sth->execute();

while (my ($id2,$book,$pages) = $sth->fetchrow_array()) {
  push(@myarray,"$id2|$book|$pages");
}

$sth->finish();

my $sth = $dbh->prepare(qq{
    SELECT id1,CONCAT(surname,': ',title),booksPages
    FROM crossrefs,books_flat
    WHERE crossrefs.deleted=0 AND crossrefs.usersId=0 AND id2=books_flat.booksId AND ref2=3 AND ref1=6
});

$sth->execute();

print "<p>Done 1</p>";

while (my ($id1,$book,$pages) = $sth->fetchrow_array()) {
  push(@myarray,"$id1|$book|$pages");
}

$sth->finish();

print "<p>Done 2</p>";

# ******************************************************************************

foreach $myarray (@myarray){
  
  print "<p>$myarray</p>";
  @temp = split(/\|/,$myarray);

  my $sth = $dbh->prepare(qq{
      UPDATE evernote 
      SET tags=CONCAT(tags,' ,',?,' ,_p',?)
      WHERE aId=? AND NOT tags IS NULL
  });

$sth->execute(@temp[1],@temp[2],@temp[0]);

  my $sth = $dbh->prepare(qq{
      UPDATE evernote 
      SET tags=CONCAT(?,' ,_p',?)
      WHERE aId=? AND tags IS NULL
  });

$sth->execute(@temp[1],@temp[2],@temp[0]);

}

$dbh->disconnect();

print "<p>Done!</p>";
