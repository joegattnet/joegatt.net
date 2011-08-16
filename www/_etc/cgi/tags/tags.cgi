#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$tags =~ s/\_/(( |[[:punct:]]|_)+)/g;
$tags =~ s/\,/XXX|XXX/g;
$tags = "XXX${tags}XXX";

$dbh = connectDB();
my $sth = $dbh->prepare(qq{
  SELECT DISTINCT name
  FROM tags, notes, _lookup
  WHERE CONCAT('XXX',tags.name_simple,'XXX') REGEXP ?
  AND latest=1 
  AND NOT tags.name_simple LIKE '\\_%' 
  AND notes.publish >= ?
  AND notes.deleted <> 1
  AND notes.type > 0
  AND check1=notes.e_guid 
  AND check2=tags.e_guid
  ORDER BY tags.name_simple 
});
$sth->execute($tags, $notesThreshold);

$count = 0;
while (my ($tag) = $sth->fetchrow_array()) {
    $outputTags .= tagListItem($tag);
    $count++;
}

$sth->finish();
$dbh->disconnect();

#if($tagsCount > 0){
  $output = qq~
    <h4><a href="/tags/">Tags</a> <span id="tags_count">($count)</span></h4>
    <ul id="n_tags" class="nav_h tags" href="">
      $outputTags
    </ul>
  ~;
#}

# ******************************************************************************

cache_output("../../cache/tags--tags-$ENV{\"QUERY_STRING\"}.html",$output);
