#!/usr/bin/perl -T

require '../basics.cgi';

$min = 0;
$smallest = 32;
$template = 'simple';
$cols = 1;
$brackets = 0;

formRead("get");

$range = 100 - $smallest;

use strict;
use DBI;
use XML::Generator::DBI;
use XML::Filter::SAX1toSAX2;
use XML::Filter::XSLT;
use XML::SAX::Writer;

#my $dbh = DBI->connect(
#   qw(DBI:vendor:database:host user pass),
#   {RaiseError=>1},
#);
$dbh = connectDB();

my $writer    = XML::SAX::Writer->new();
my $xsl_filt  = XML::Filter::XSLT->new(Handler => $writer);
my $sax_filt  = XML::Filter::SAX1toSAX2->new(Handler => $xsl_filt);
my $generator = XML::Generator::DBI->new(
   Handler => $sax_filt,
   dbh     => $dbh,
);

$xsl_filt->set_stylesheet_uri('../xslt/tags.list.xsl');

$generator->prepare(qq{
  SELECT name,COUNT(*) AS score  
  FROM tags,notes,_lookup 
  WHERE latest=1 
  AND NOT name LIKE '\\_%' 
  AND notes.publish >= ?
  AND notes.deleted <> 1
  AND notes.type > 0
  AND check1=notes.e_guid 
  AND check2=tags.e_guid 
  GROUP BY name 
  HAVING score >= ? 
  ORDER BY name
});
$generator->execute($notesThreshold, $min);



#We need to think through parent/child tags
#We should make sure that all displayed tags also have notes with __PUBLISHED
# and not __NOLIST attached to them
#Also; this is double counting all versions; we need to group by note.guid too

$dbh = connectDB();

$highest = 0;
while (my ($name,$score) = $sth->fetchrow_array()) {
  push(@tags, [$name, $score]);
  if($score>$highest){
    $highest = $score;
  }
};

$sth->finish();
$dbh->disconnect();

$ulTag = "<ul id=\"tag_list\" class=\"$template\">";

$output = $ulTag;
for my $i (0..$#tags) {
  my $name = $tags[$i][0];
  my $score = $tags[$i][1];
  $tagLink = "\L$name\E";
  $tagLink =~ s/ /_/g;
  if($template eq 'cloud'){
    my $reference = pluralize_regular('reference',$score);
    $fontsize = int($smallest + ((($score-1)*$range)/$highest)) . '%';
    $inline = " title=\"$score $reference\" style=\"font-size:$fontsize\"";
  } else {
    $inline = "";
  }
  if($brackets){
    $name = "$name ($score)";
  }
  $output .= "<li><a href=\"/tags/$tagLink\"$inline rel=\"tag\">$name</a></li>";
  if($cols>1 && (($i/$cols) == int($i/$cols))){
    $output .= "</ul>$ulTag";
  }
};
$output .= "</ul>";

# ******************************************************************************

cache_output("../../cache/tags--list-$ENV{\"QUERY_STRING\"}.shtml",$output);
