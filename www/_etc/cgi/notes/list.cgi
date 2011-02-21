#!/usr/bin/perl -T

require '../basics.cgi';
require '../notes/basics.cgi';

$template = 'list';

formRead("get");

if ($exclude ne '') {
  $excludeSQL = "AND notes.e_guid NOT LIKE '".sprintf("%04x", $exclude)."%'";
} else {
  $excludeSQL = "";
}

if($latest eq 'true'){
  $order = "ORDER BY date_modified DESC";
} else {
  $tagsSQL = "AND ? LIKE CONCAT('%',tags.name,'%') AND check1=notes.e_guid AND check2=tags.e_guid";
  $order = "ORDER BY score DESC,date_modified DESC";
}


if($serverName eq 'joegatt.net' || $serverName eq 'test.joegatt.org'){
  $productionSQL = "AND ? LIKE CONCAT('%__PUBLISH%')";
}

#  AND CONCAT(notes.e_guid,'-',date_modified) IN (SELECT CONCAT(e_guid,'-',MAX(date_modified)) FROM notes WHERE notes.deleted <> 1 GROUP BY e_guid)
$dbh = connectDB();
my $sth = $dbh->prepare(qq{
  SELECT notes.e_guid,COUNT(*) AS score 
  FROM notes,tags,_lookup 
  WHERE latest=1
  AND notes.publish = 1
  AND notes.deleted <> 1 
  $productionSQL
  $excludeSQL 
  $tagsSQL 
  GROUP BY notes.e_guid 
  $order
});

if($latest ne 'true'){
  $sth->execute($tags);
} else {
  $sth->execute();
}

$notesCount = 0;

while (my ($note_e_guid) = $sth->fetchrow_array()) {
  $this_note_output = printNote($note_e_guid,$template);
  $output .= "<li>$this_note_output</li>";
  $notesCount++;
}

if ($header ne 'no') {
  $headerOutput = "<h4><a href=\"/notes/\">Notes</a> <span>($notesCount)</span></h4>";
}

if ($notesCount!=0) {
  $output = "$headerOutput<ul class=\"notes-list\">$output</ul>";
}

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/notes--list-$ENV{\"QUERY_STRING\"}.html",$output);
