#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$folder =~ s/\|/\//g;
if($folder eq '/' or $folder eq ''){
  $folder = 'www';
}
$path = untaint("../../../../$folder");
$path =~ s/\/\//\/www\//g;

opendir(DIR, $path);
  @objects = grep(!/^(\.|\.git)$/i,readdir(DIR));
closedir(DIR);

@folders = sort(grep(!/\.[^\.]+/i,@objects));
@files = sort(grep(/^[^\.]*\.?[^\.]*\.[^\.]+/i,@objects));

#Hackkky!
use Cwd;
$originalLoc = cwd;
chdir untaint($path);
$now = cwd;
$fullPath = $now;
$fullPath2 = $now;
$fullPath =~ s/.*joegatt\.net\/www/www/;
chdir untaint($originalLoc);

$linkifiedPath = linkifyPath($fullPath, '/code');

$output .= "<li class=\"path\">$linkifiedPath</li>\n";

foreach $object (@folders) {
  if(!($object eq '..' and $folder eq 'www')){
    $output .= "<li><a href=\"\/code\/$fullPath\/$object\" class=\"source-file\">/$object</a></li>\n";
  }
}

foreach $object (@files) {
  $output .= "<li><a href=\"\/code\/$fullPath\/$object\" class=\"source-file\">$object</a></li>\n";
}

# ******************************************************************************

cache_output("../../cache/code--folders-$ENV{\"QUERY_STRING\"}.html",$output);
