#!/usr/bin/perl -T

require '../basics.pl';
require '../basics_pantography.pl';

$dbh = connectDBpantography();

my $latestText = pantographyLatest();
  
do {
  #Get next text
  $nextText = nextText($latestText);
  
  #Check if next text has already been generated (by a contributor)
  my $sth = $dbh->prepare(qq{
    SELECT text 
    FROM `text` 
    WHERE text = ? 
  });
  $sth->execute($nextText);
  $exists = $sth->fetchrow_array();
  
  $latestText = $nextText;
  
} until ($exists eq '');

#Store text
my $sth = $dbh->prepare(qq{
  INSERT INTO text 
  (text, date_created) values (?, UTC_TIMESTAMP())
});
$sth->execute($nextText);
$sth->finish();
$dbh->disconnect();

#Tweet text
diffuse_twitter_pantography($nextText);

#Cache furthest
$output = qq{<!--#set var="p_furthest" value="$nextText" -->};
cache_output("../../cache/pantography--furthest-.shtml", $output);

pantographyTimeline();
