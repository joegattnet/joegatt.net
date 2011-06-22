#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

print ("Content-Type: text/plain\n\n");

#This file still does not observe caching conveention
#it should run save anagram
#cached json anagram is not being used
#my $dbh = connectDB();
#saveAnagram($b);
#$dbh->disconnect();

$location = untaint("../../../_etc/cache/enface--anagram-b=$b.json");
open (ANAGRAM, $location) or die print "Can't open $location";
my @lines = <ANAGRAM>;
$load_anagram = "@lines";
$load_anagram =~ s/\n//g;
close (ANAGRAM);

print qq~$jsoncallback({"anagram":$load_anagram})~;
