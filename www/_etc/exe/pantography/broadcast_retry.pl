#!/usr/bin/perl -T

#This must be run at least 1 minute after broadcast
#Otherwise texts get retweeted

require '../basics.pl';
require '../basics_pantography.pl';

$dbh = connectDBpantography();

my $sth = $dbh->prepare(qq{
  SELECT text 
  FROM `text` 
  WHERE text_id IS NULL
  ORDER BY date_created
  LIMIT 1 
});
$sth->execute();

if ($sth->rows > 0) {
  $text = $sth->fetchrow_array();
  diffuse_twitter_pantography($text);
}

$sth->finish();
$dbh->disconnect();

cache_refresh('pantography--timeline');
