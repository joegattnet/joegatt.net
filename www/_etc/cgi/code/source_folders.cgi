#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$folder =~ s/\|/\//g;
$path = untaint("../../../../$folder");

#print ("Content-Type: text/html; charset=UTF-8\n\n");


opendir(DIR, $path);
  @files = grep(!/(\.git)/i,readdir(DIR));
closedir(DIR);

@files = sort(@files);

$output .= "<li>\/$folder</li>\n";

foreach $file (@files) {
  $output .= "<li><a href=\"\/code\/$folder\/$file\" class=\"source-file\">$file</a></li>\n";
}

#print $output;

# ******************************************************************************

cache_output("../../cache/code--source_folders-$ENV{\"QUERY_STRING\"}.html",$output);
