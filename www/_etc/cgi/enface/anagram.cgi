#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

print ("Content-Type: text/plain\n\n");

$location = untaint("../../../_etc/cache/enface--anagram-b=$b.json");
open (ANAGRAM, $location) or die print "Can't open $location";
my @lines = <ANAGRAM>;
$load_anagram = "@lines";
$load_anagram =~ s/\n//g;
close (ANAGRAM);

print qq~$jsoncallback({"anagram":$load_anagram})~;
