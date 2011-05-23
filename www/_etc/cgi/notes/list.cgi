#!/usr/bin/perl -T

require '../basics.cgi';
require '../notes/basics.cgi';

$template = 'list';

formRead("get");

$tags =~ s/\_/(( |[[:punct:]])+)/g;

if ($exclude ne '') {
  $excludeSQL = "AND notes.e_guid NOT LIKE '".sprintf("%04x", $exclude)."%'";
}

if($latest eq 'true'){
  $order = "ORDER BY date_modified DESC";
} else {
  $tagsSQL = "AND tags.name REGEXP ? AND check1=notes.e_guid AND check2=tags.e_guid";
  $order = "ORDER BY score DESC,date_modified DESC";
}

if($serverName eq 'joegatt.net' || $serverName eq 'test.joegatt.org'){
  $productionSQL = "AND notes.publish = 1 ";
} else {
  $productionSQL = "AND (notes.publish = 1 OR notes.preview = 1) ";
}

$dbh = connectDB();
my $sth = $dbh->prepare(qq{
  SELECT notes.e_guid,COUNT(*) AS score 
  FROM notes,tags,_lookup 
  WHERE latest=1
  AND notes.deleted <> 1 
  AND notes.list <> 0
  $productionSQL
  $excludeSQL 
  $tagsSQL 
  GROUP BY notes.e_guid 
  $order
});

if ($latest eq 'true') {
  $sth->execute();
} else {
  $sth->execute($tags);
}

$notesCount = 0;

while (my ($note_e_guid) = $sth->fetchrow_array()) {
  $this_note_output = printNote($note_e_guid, $template);
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
