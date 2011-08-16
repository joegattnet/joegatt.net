#!/usr/bin/perl -T

require '../basics.cgi';
require '../notes/basics.cgi';

$template = 'list';
$limit = 20;
$offset = 0;

formRead("get");

$tags =~ s/\_/(( |[[:punct:]])+)/g;
$tags =~ s/\,/XXX|XXX/g;
$tags = "XXX${tags}XXX";

if ($exclude ne '') {
  $excludeSQL = "AND notes.e_guid NOT LIKE '".sprintf("%04x", $exclude)."%'";
}

if($alphabetical eq 'true' && $view eq 'bibliography') {
  $order = "ORDER BY textonly, notes.title";
}elsif ($alphabetical eq 'true'){
  $order = "ORDER BY notes.title ASC, date_modified DESC";
} elsif($latest eq 'true'){
  $order = "ORDER BY date_modified DESC";
} else {
#  $tagsSQL = "AND (CONCAT('XXX',tags.name_simple,'XXX') LIKE CONCAT('%', ?, '%')) AND check1=notes.e_guid AND check2=tags.e_guid";
  $tagsSQL = "AND (CONCAT('XXX',tags.name_simple,'XXX') REGEXP ?) AND check1=notes.e_guid AND check2=tags.e_guid";
  $order = "ORDER BY score DESC, date_modified DESC";
}

if ($type eq 'fragment') {
  $type = 0;
} elsif ($view eq 'notes') {
  $type = 1;
} elsif ($view eq 'bibliography') {
  $type = 2;
} elsif ($view eq 'links') {
  $type = 3;
} elsif ($view eq 'topics') {
  $type = 4;
} elsif ($view eq 'content') {
  $type = 5;
}

$dbh = connectDB();
my $sth = $dbh->prepare(qq{
  SELECT SQL_CALC_FOUND_ROWS notes.e_guid,COUNT(*) AS score 
  FROM notes,tags,_lookup 
  WHERE latest = 1
  AND notes.publish >= ?
  AND notes.deleted <> 1 
  AND notes.type = ?
  $excludeSQL 
  $tagsSQL 
  GROUP BY notes.e_guid 
  $order
  LIMIT ? OFFSET ?
});

if ($type eq '') {
  $output = getNotes(1, 'notes', $latest);
  $output .= getNotes(2, 'bibliography', $latest);
  $output .= getNotes(3, 'links', $latest);
  $output .= getNotes(4, 'topics', $latest);
} else {
  $output = getNotes($type, $view, $latest);
}

sub getNotes {
  my $type = $_[0];
  my $view = $_[1]; 
  my $latest = $_[2];
  my $output = '';

  my $viewTitle = "\U$view";

  if ($latest eq 'true') {
    $sth->execute($notesThreshold, $type, $limit, $offset);
  } else {
    $sth->execute($notesThreshold, $type, $tags, $limit, $offset);
  }

  $notesCount = 0;

  while (my ($note_e_guid) = $sth->fetchrow_array()) {
    #This is very inefficient, of course. need to consolidate and send list
    #directly to templates
    $output .= printNote($note_e_guid, $template);
    $notesCount++;
  }
  if ($notesCount != 0) {
    #my $sth = $dbh->prepare(qq{
    #  SELECT FOUND_ROWS()
    #});
    #$sth->execute();
    #my ($foundRowsReal) = $sth->fetchrow_array();
    if ($header ne 'no') {
      #Groups etc seems to screw up FOUND_ROWS so not using $foundRowsReal
      #Also see http://www.mysqlperformanceblog.com/2007/08/28/to-sql_calc_found_rows-or-not-to-sql_calc_found_rows/
      $headerOutput = "<h4><a href=\"/$view/\">$viewTitle</a> <span>($notesCount)</span></h4>";
    }
    $output = "$headerOutput<ul class=\"notes-list notestype-$view\">$output</ul>";
  }
  return $output;
}

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/notes--list-$ENV{\"QUERY_STRING\"}.html",$output);
