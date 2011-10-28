#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

print ("Content-Type: text/plain\n\n");

#This file still does not observe caching convention
#it should run save anagram
#cached json anagram is not being used
saveAnagram($b);

$location = untaint("../../../_etc/cache/enface--anagram-b=$b.json");
open (ANAGRAM, $location) or die warn "Can't open $location";
my @lines = <ANAGRAM>;
$load_anagram = "@lines";
$load_anagram =~ s/\n//g;
close (ANAGRAM);

print qq~{"anagram":$load_anagram}~;
