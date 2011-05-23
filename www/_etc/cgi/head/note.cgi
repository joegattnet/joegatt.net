#!/usr/bin/perl -T

require '../basics.cgi';
require '../notes/basics.cgi';

formRead("get");

$p_hex = sprintf("%04x", $p);

$dbh = connectDB();
my $sth = $dbh->prepare(qq{
  SELECT DISTINCT e_guid 
  FROM notes
  WHERE latest=1
  AND notes.publish = 1
  AND notes.deleted <> 1
  AND SUBSTRING(e_guid,1,4)=? 
  LIMIT 1
});
$sth->execute($p_hex);

my ($note_e_guid) = $sth->fetchrow_array();
$output = printNote($note_e_guid,'head');

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/head--note-$ENV{\"QUERY_STRING\"}.shtml",$output);
