#!/usr/bin/perl -T

require '../_basics.cgi';
$dsn = 'DBI:mysql:notes:localhost';

print ("Content-Type: text/html; charset=UTF-8\n\n");

print "<p>&gt;&gt; Evernote</p>";

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
    SELECT aId 
    FROM evernote 
});

$sth->execute();

while (my ($aId) = $sth->fetchrow_array()) {
  push(@myarray,$aId);
}

$sth->finish();

my $sth = $dbh->prepare(qq{
    SELECT Id 
    FROM crossrefs
    WHERE usersId=0 AND deleted=0 AND (ref1=6 AND ref2=6) AND (id1=? OR id2=?)   
});

foreach $noteId (@myarray){
  
  undef @mycfarray;
  
  $sth->execute($noteId,$noteId);

  while (my ($cId) = $sth->fetchrow_array()) {
    push(@mycfarray,$cId);
  }
  
  if($#mycfarray != -1){

    $tags = join(', _r',@mycfarray);
    $tags = "_r$tags";

    my $sth = $dbh->prepare(qq{
        UPDATE evernote 
        SET tags=? 
        WHERE aId=? 
    });
    
    $sth->execute($tags,$noteId);

  }
  
}

$dbh->disconnect();
