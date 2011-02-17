#!/usr/bin/perl -T

require '../_basics.cgi';

formRead("get");

print ("Content-Type: text/html; charset=UTF-8\n\n");

$title = "joegatt.net";
$description = "";
$page_last_modified = "";

my $output = qq~
<title>$title$extra</title>
<meta name="description" content="$description" />
<meta name="OriginalPublicationDate" content="$page_last_modified" />
<link rel="canonical" href="$canonical" />
~;

print $output;

my $file = untaint("../../_cache/_common/_head__page=$page&p=$p.html");

open CACHE, ">$file";
print CACHE $output;
close CACHE;

