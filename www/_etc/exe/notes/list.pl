#!/usr/bin/perl -T

require '../basics.pl';
require '../notes/basics.pl';

$template = 'list';
$limit = 99;
$offset = 0;

formRead("get");

#If we're just doing bibliography we should do dedicated ones like this
#SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(textonly,':',1),',',1) AS authorSurname, title, CONV(SUBSTRING(e_guid,1,4), 16, 10) FROM notes WHERE type=2 AND latest=1 AND deleted<>1 ORDER BY authorSurname
#And send it straight to a TT loop with saving location

$dbh = connectDB();

if ($exclude ne '') {
  $excludeSQL = "AND notes.e_guid NOT LIKE '".sprintf("%04x", $exclude)."%'";
}

if ($exclude_text ne '') {
  $excludeSQL = "AND notes.text NOT LIKE '%" . $exclude_text . "%'";
}

$tagsCond = $tags;
$tagsCond =~ s/\,/' OR tags.name_simple = '/g;
$tagsCond = "tags.name_simple = '$tagsCond'";

if($alphabetical eq 'true' && $view eq 'bibliography') {
  $order = "ORDER BY textonly, notes.title";
}elsif ($alphabetical eq 'true'){
  $order = "ORDER BY notes.title ASC, date_modified DESC";
} elsif($latest eq 'true'){
  $order = "ORDER BY date_modified DESC";
} elsif($view eq 'alias'){
  #This is not working well enough
  $tagsSQL = "AND check1=notes.e_guid AND check2=tags.e_guid AND ($tagsCond)";
  $order = "ORDER BY score DESC, textonly ASC";
} else {
  $tagsSQL = "AND check1=notes.e_guid AND check2=tags.e_guid AND ($tagsCond)";
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
} elsif ($view eq 'alias') {
  $type = 5;
}

if ($latest eq 'true'){
  $sth = $dbh->prepare(qq{
    SELECT notes.e_guid 
    FROM notes 
    WHERE latest = 1
    AND notes.publish >= ?
    AND notes.deleted <> 1 
    AND notes.type = ?
    $order
    LIMIT ? OFFSET ?
  });
} else {
  $sth = $dbh->prepare(qq{
    SELECT notes.e_guid, COUNT(*) AS score 
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
}

if ($type eq '') {
  $output = getNotes(5, 'alias', $latest, $limit, $offset);
  $output .= getNotes(1, 'notes', $latest, $limit, $offset);
  $output .= getNotes(2, 'bibliography', $latest, $limit, $offset);
  $output .= getNotes(3, 'links', $latest, $limit, $offset);
  $output .= getNotes(4, 'topics', $latest, $limit, $offset);
} else {
  $output = getNotes($type, $view, $latest, $limit, $offset);
}

sub getNotes {
  my $type = $_[0];
  my $view = $_[1]; 
  my $latest = $_[2];
  my $limit = $_[3];
  my $offset = $_[4];
  my $output = '';

  my $viewTitle = "\U$view";
  
  $sth->execute($notesThreshold, $type, $limit, $offset);

  $notesCount = 0;
  $notesFound = $sth->rows + 1;
  if ($limit > $notesFound) {
    $limit = $notesFound;
  }

  if ($cols ne ''){
    $colLength = int(($limit/$cols)+ 0.999);
    $colCount = 0;
    $colNum = 1;
    $gridWidth = 12 / $cols;
    $grid = " grid_$gridWidth";
    while (my ($note_e_guid, $count_found) = $sth->fetchrow_array()) {
      $output .= printNote($note_e_guid, $template);
      $notesCount++;
      $colCount++;
      if ($colCount == $colLength) {
        $colNum++;
        $colCount = 0;
        if ($colNum == $cols){
          $omega .= " omega";
        }
        $output .= "</ul><ul class=\"notes-list notestype-$view$omega$grid\">";
      }
    }
  } else {
    while (my ($note_e_guid, $count_found) = $sth->fetchrow_array()) {
      #This is very inefficient, of course. need to consolidate and send list
      #directly to templates
      $output .= printNote($note_e_guid, $template);
      $notesCount++;
    }
  }
  if ($notesCount != 0) {
    if ($header ne 'no') {
      #Groups etc seems to screw up FOUND_ROWS so not using $foundRowsReal
      #Also see http://www.mysqlperformanceblog.com/2007/08/28/to-sql_calc_found_rows-or-not-to-sql_calc_found_rows/
      #HACK - rename to projects and link to sitempa or projects page?
      if($view eq 'alias'){
        $headerOutput = "<h4><a href=\"/\">Pages</a> <span>($notesCount)</span></h4>";
      } else {
        $headerOutput = "<h4><a href=\"/$view/\">$viewTitle</a> <span>($notesCount)</span></h4>";
      }
    }
    $output = "$headerOutput<ul class=\"notes-list notestype-$view$grid alpha\">$output</ul>";
  }
  return $output;
}

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/notes--list-$ENV{\"QUERY_STRING\"}.html",$output);
