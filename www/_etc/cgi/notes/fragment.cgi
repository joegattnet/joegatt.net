#!/usr/bin/perl -T

require '../basics.cgi';
require '../notes/basics.cgi';

formRead("get");

$p_hex = sprintf("%04x", $p);

$dbh = connectDB();
my $sth = $dbh->prepare(qq{
  SELECT DISTINCT notes.e_guid 
  FROM notes,tags,_lookup
  WHERE latest=1
  AND notes.publish = 1
  AND notes.deleted <> 1
  AND check1=notes.e_guid AND check2=tags.e_guid
  AND ? LIKE CONCAT('%',tags.name,'%') 
  ORDER BY date_modified 
  DESC
  LIMIT 1
});
$sth->execute($tags);

my ($note_e_guid) = $sth->fetchrow_array();

if($note_e_guid eq ''){
  $output = "<p class=\"debug-info error\">FRAGMENT NOT FOUND: $tag</p>";
}else{
  $output = printNote($note_e_guid,'fragment');
}

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/notes--fragment-$ENV{\"QUERY_STRING\"}.html",$output);
