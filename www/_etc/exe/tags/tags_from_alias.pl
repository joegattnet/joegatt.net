#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

$dbh = connectDB();

my $sthTags = $dbh->prepare(qq{
  SELECT DISTINCT tags.name_simple
  FROM tags, notes, _lookup
  WHERE textonly =  ?
  AND NOT tags.name_simple LIKE '\\_%'
  AND _lookup.type = 0
  AND _lookup.check1 = notes.e_guid
  AND _lookup.check2 = tags.e_guid
  ORDER BY tags.name_simple
});
$sthTags->execute($exclude_text);

while (my ($tag) = $sthTags->fetchrow_array()) {
  push(@foundTags, $tag);
}
push(@foundTags, $tags);
$tags = join(",", @foundTags);

$sthTags->finish();
$dbh->disconnect();

$output = qq~
  <!--#set var="tags" value="$tags" -->
~;

# ******************************************************************************

cache_output("../../cache/tags--tags_from_alias-$ENV{\"QUERY_STRING\"}.shtml",$output);
