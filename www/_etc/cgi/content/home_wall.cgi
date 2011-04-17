#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$imageCols = 12/$cols;
$total = $rows * $cols;

$dbh = connectDB();
#SLOW
#we need to make sure only published notes are used
my $sth = $dbh->prepare(qq{
  SELECT DISTINCT notes.e_guid, notes.title, resources.title, resources.rnd, resources.ext
  FROM (resources,notes) JOIN _lookup
  ON (_lookup.check1 = notes.e_guid AND _lookup.check2 = resources.e_guid)
  WHERE latest=1 
  AND notes.publish = 1
  AND notes.deleted <> 1
  AND _lookup.type = 1
  GROUP BY notes.e_guid
  ORDER BY notes.date_modified DESC
  LIMIT ?
});

$sth->execute($total);

$output = " <ul class=\"wall\">";

while (my ($note_e_guid,$note_title,$title,$rnd,$ext) = $sth->fetchrow_array()) {
  $count++;
  if(($count/$cols) == int($count/$cols)){
    $omega = " class=\"omega\"";
  }else{
    $omega = "";
  }
  
  $noteRef = hex(substr($note_e_guid,0,4));
  
  $output .= qq~
    <li$omega>
      <a href="/notes/$noteRef" title="$note_title">
        <img src="/_etc/resources/cut/$title-$rnd-16_9-wb-$imageCols-0-0-0.$ext" />
      </a>
    </li>~;
}

$output .= qq~
  </ul>
  ~;

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/content--home_wall-".$ENV{"QUERY_STRING"}.".html",$output);