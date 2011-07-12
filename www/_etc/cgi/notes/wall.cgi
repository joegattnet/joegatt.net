#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$imageCols = 12/$cols;
$total = $rows * $cols;

$dbh = connectDB();

my $sth = $dbh->prepare(qq{
  SELECT DISTINCT notes.e_guid, notes.title, resources.title, resources.rnd, resources.ext
  FROM (resources,notes) JOIN _lookup
  ON (_lookup.check1 = notes.e_guid AND _lookup.check2 = resources.e_guid)
  WHERE latest = 1 
  AND notes.type = 1
  AND notes.publish >= ?
  AND notes.deleted <> 1
  AND _lookup.type = 1
  GROUP BY notes.e_guid
  ORDER BY notes.date_modified DESC
  LIMIT ?
});

$sth->execute($notesThreshold, $total);

$output = " <ul class=\"wall\">";

while (my ($note_e_guid,$note_title,$resource_title,$rnd,$ext) = $sth->fetchrow_array()) {
  $note_title =~ s/\"/\\"/g;
  $count++;
  if (($count/$cols) == int($count/$cols)) {
    $omega = " class=\"omega\"";
  } else {
    $omega = "";
  }
  $noteRef = hex(substr($note_e_guid,0,4));
  $output .= qq~
    <li$omega>
      <a href="/notes/$noteRef" title="$note_title">
        <img src="/_etc/resources/cut/$resource_title-$rnd-16_9-wb-$imageCols-0-0-0.$ext" alt="$note_title">
      </a>
    </li>
  ~;
}

$output .= qq~
  </ul>
  ~;

$sth->finish();
$dbh->disconnect();


# ******************************************************************************

cache_refresh('notes--wall', 0, 1);
cache_output("../../cache/notes--wall-".$ENV{"QUERY_STRING"}.".html", $output);
