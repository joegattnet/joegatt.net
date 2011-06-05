#!/usr/bin/perl -T

require '../basics.cgi';
require '../notes/basics.cgi';

$template = 'list';

formRead("get");

if ($type eq 'fragment') {
  $type = 0;
} elsif ($show eq 'bibliography') {
  $type = 2;
} elsif ($show eq 'links') {
  $type = 3;
} elsif ($show eq 'topics') {
  $type = 4;
} elsif ($show eq 'content') {
  $type = 5;
}

$tags =~ s/\_/(( |[[:punct:]])+)/g;
$tags =~ s/\,/|/g;

if ($exclude ne '') {
  $excludeSQL = "AND notes.e_guid NOT LIKE '".sprintf("%04x", $exclude)."%'";
}

if($latest eq 'true'){
  $order = "ORDER BY date_modified DESC";
} else {
  $tagsSQL = "AND (tags.name REGEXP ?) AND check1=notes.e_guid AND check2=tags.e_guid";
  $order = "ORDER BY score DESC,date_modified DESC";
}

$dbh = connectDB();
my $sth = $dbh->prepare(qq{
  SELECT notes.e_guid,COUNT(*) AS score 
  FROM notes,tags,_lookup 
  WHERE latest = 1
  AND notes.publish >= ?
  AND notes.deleted <> 1 
  AND notes.type = ?
  $excludeSQL 
  $tagsSQL 
  GROUP BY notes.e_guid 
  $order
});

if ($type eq '') {
  $output = getNotes(1, 'notes', $latest);
  $output .= getNotes(2, 'bibliography', $latest);
  $output .= getNotes(3, 'links', $latest);
  $output .= getNotes(4, 'topics', $latest);
} else {
  $output = getNotes($type, $show, $latest);
}

sub getNotes {
  my $type = $_[0];
  my $show = $_[1]; 
  my $latest = $_[2];
  my $output = '';

  my $showTitle = "\U$show";

  if ($latest eq 'true') {
    $sth->execute($notesThreshold, $type);
  } else {
    $sth->execute($notesThreshold, $type, $tags);
  }

  $notesCount = 0;

  while (my ($note_e_guid) = $sth->fetchrow_array()) {
    $this_note_output = printNote($note_e_guid, $template);
    $output .= "<li>$this_note_output</li>";
    $notesCount++;
  }
  #if ($header ne 'no') {
    my $headerOutput = "<h4><a href=\"/$show/\">$showTitle</a> <span>($notesCount)</span></h4>";
  #}
  if ($notesCount!=0) {
    $output = "$headerOutput<ul class=\"notes-list notestype-$show\">$output</ul>";
  }
  return $output;
}

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/notes--list-$ENV{\"QUERY_STRING\"}.html",$output);
