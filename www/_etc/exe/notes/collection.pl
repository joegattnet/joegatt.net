#!/usr/bin/perl -T

require '../basics.pl';
require '../notes/basics.pl';

formRead("get");

$dbh = connectDB();

$sth = $dbh->prepare(qq{
	SELECT CONV(SUBSTR(notes.e_guid, 1, 4), 16, 10), notes.title 
    FROM notes,tags,_lookup 
    WHERE latest = 1
    AND notes.publish >= ?
    AND notes.deleted <> 1 
    AND notes.type = 1
    AND check1=notes.e_guid 
    AND check2=tags.e_guid 
    AND tags.name_simple LIKE CONCAT('_collections_', ?, '_%')
    GROUP BY notes.e_guid 
    ORDER BY tags.name_simple
});

$sth->execute($notesThreshold, $collection);

my $collectionList = $sth->fetchall_arrayref();
  
$sth->finish();
$dbh->disconnect();
  
use Template;
  
my $TTconfig = {
    ENCODING => 'utf8',
    INCLUDE_PATH => '../../templates',
    POST_CHOMP   => 1
};
  
my $TTtemplate = Template->new($TTconfig);
  
my $TTvars = {
  collection => $collectionList,
  start => $start
};
  
my $TTinput = "collection.tmpl";
  
$TTtemplate->process($TTinput, $TTvars, \$output) || die $TTtemplate->error();

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/notes--collection-$ENV{\"QUERY_STRING\"}.html",$output);
