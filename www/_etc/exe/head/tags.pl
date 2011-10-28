#!/usr/bin/perl -T

require '../basics.pl';
require '../notes/basics.pl';

formRead("get");

$dbh = connectDB();
my $sth = $dbh->prepare(qq{
  SELECT name
  FROM tags 
  WHERE name_simple = ?
  LIMIT 1
});
$sth->execute($p);

my ($tag_name) = $sth->fetchrow_array();

  $tag_name = tagName($tag_name);

  my $output = qq~
    <!--#set var="title" value="$tag_name" -->
    <!--#set var="title.window" value="Tag: $tag_name" -->
    <!--#set var="description" value="All items on joegatt.net tagged with '$tag_name'." -->
    <!--#set var="keywords" value="$tag_name" -->
    <!--#set var="subject" value="$tag_name" -->
  ~;


$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/head--tags-$ENV{\"QUERY_STRING\"}.shtml",$output);
