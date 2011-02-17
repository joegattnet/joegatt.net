#!/usr/bin/perl -T

open (ANAGRAM, "../../_cache/wutz/_anagram_table.json");
my @lines = <ANAGRAM>;
$load_anagram = "@lines";
$load_anagram =~ s/\n//g;
close (ANAGRAM);

print "X-JSON:({'anagram':$load_anagram})\n\n";
