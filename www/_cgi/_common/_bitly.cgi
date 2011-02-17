#!/usr/bin/perl -T

require '../_basics.cgi';

$url = $ENV{'QUERY_STRING'};
#$url =~ s/\|/?/;
#should first decode
#this should cache

print ("Content-Type: text/html; charset=UTF-8\n\n");print get_bitly($url);