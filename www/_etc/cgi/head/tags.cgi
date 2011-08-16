#!/usr/bin/perl -T

require '../basics.cgi';
require '../notes/basics.cgi';

formRead("get");

$tag = $p;
$tag =~ s/\_/%/g;
$tag = "%$tag%";

$dbh = connectDB();
my $sth = $dbh->prepare(qq{
  SELECT name
  FROM tags 
  WHERE name_simple LIKE ?
  LIMIT 1
});
$sth->execute($tag);

my ($tag_name) = $sth->fetchrow_array();

  $tag_name = tagName($tag_name);

  my $output = qq~
    <!--#set var="title" value="$tag_name" -->
    <!--#set var="title.window" value="Tag: $tag_name" -->
    <!--#set var="description" value="All items on joegatt.net tagged with $tag_name." -->
    <!--#set var="keywords" value="$tag_name" -->
    <!--#set var="subject" value="$tag_name" -->
  ~;

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/head--tags-$ENV{\"QUERY_STRING\"}.shtml",$output);
