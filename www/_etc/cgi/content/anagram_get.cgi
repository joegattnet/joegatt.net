#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$location = untaint("../../_etc/cache/enface--anagram_table-b=$b.json");
open (ANAGRAM, $location);
my @lines = <ANAGRAM>;
$load_anagram = "@lines";
$load_anagram =~ s/\n//g;
close (ANAGRAM);

print ("Content-Type: text/plain\n\n");
print qq~$jsoncallback({"anagram":$load_anagram})~;
