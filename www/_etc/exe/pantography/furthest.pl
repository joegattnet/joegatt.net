#!/usr/bin/perl -T

require '../basics.pl';
require '../basics_pantography.pl';

$dbh = connectDBpantography();

my $latestText = pantographyLatest();

$dbh->disconnect();

#Cache latest
$output = qq{<!--#set var="p_furthest" value="$latestText" -->};
cache_output("../../cache/pantography--furthest-.shtml", $output);
