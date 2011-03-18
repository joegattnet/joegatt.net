#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$file =~ s/\|/\//g;
$file =~ s/\~/./g;
$file = untaint("../../..$file");

open (SOURCE, "$file");
  my @lines = <SOURCE>;
  $file_content = "@lines";
close (SOURCE);

$file_content =~ s/</&lt;/g;
$file_content =~ s/>/&gt;/g;

$output = $file_content;

cache_output("../../cache/code--source_browse-$ENV{\"QUERY_STRING\"}.html",$output);
