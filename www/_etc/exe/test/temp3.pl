#!/usr/bin/perl -T

require '../basics.pl';

print ("Content-Type: text/html; charset=UTF-8\n\n");

$text = qq~

[wutz|index|67]

~;

($section, $page, $p) = $text =~ /\[(.*?)\|(.*?)\|(.*?)\]/;

print "<hr>$section<hr>$page<hr>$p";