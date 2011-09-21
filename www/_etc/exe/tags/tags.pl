#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

$dbh = connectDB();

if ($from_alias ne ''){
  my $sthTags = $dbh->prepare(qq{
    SELECT tags.name_simple
    FROM tags, notes, _lookup
    WHERE textonly =  ?
    AND NOT tags.name_simple LIKE '\\_%'
    AND _lookup.type =0
    AND _lookup.check1 = notes.e_guid
    AND _lookup.check2 = tags.e_guid
    ORDER BY tags.name_simple
  });
  $sthTags->execute($from_alias);
  $tags = join(",", $sthTags->fetchrow_array(), $tags);
}

$tagsCond = $tags;
$tagsCond =~ s/\,/' OR tags.name_simple = '/g;
$tagsCond = "tags.name_simple = '$tagsCond'";

my $sth = $dbh->prepare(qq{
  SELECT DISTINCT name, name_simple
  FROM tags, notes, _lookup
  WHERE check2=tags.e_guid
  AND check1=notes.e_guid 
  AND latest = 1
  AND notes.publish >= ?
  AND notes.deleted <> 1
  AND notes.type > 0
  AND ($tagsCond)
  AND NOT tags.name_simple LIKE '\\_%' 
  ORDER BY tags.name_simple 
});
$sth->execute($notesThreshold);

$count = 0;
while (my ($tag, $tagLink) = $sth->fetchrow_array()) {
    $outputTags .= tagListItem($tag, $tagLink);
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
