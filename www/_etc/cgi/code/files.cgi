#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$file =~ m/\~([a-z]*)$/;
$extension = $1;
$file =~ s/\|/\//g;
$file =~ s/\~/./g;
$fileNav = "$file";
$file = untaint("../../..$file");

open (SOURCE, "$file");
  my @lines = <SOURCE>;
  $file_content = "@lines";
close (SOURCE);

$file_content =~ s/</&lt;/g;
$file_content =~ s/>/&gt;/g;

$linkifiedPath = linkifyPath('www'.$fileNav, '/code');

$output = qq~<p>$linkifiedPath [<a href="http://github.com/joegattnet/joegatt.net/blob/master$fileNav">on github</a>]</p>~;

if($extension eq 'cgi'){
  $extension = 'perl5';
}elsif($extension eq 'php'){
  $extension = 'html';
}

if($extension =~ /gif|png|jpg|jpeg/){
  $output .= qq~<img src="$file" />~;
} else {
  $output .= qq~<pre class="syntax $extension">\n$file_content\n</pre>~;
}

cache_output("../../cache/code--files-$ENV{\"QUERY_STRING\"}.html",$output);
