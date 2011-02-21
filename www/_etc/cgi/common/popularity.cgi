#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");
 
print ("Content-Type: text/html; charset=UTF-8\n\n");

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
    SELECT count+1 FROM popularity WHERE type=? AND page_id=? AND external=? AND url=?
});

$sth->execute($type,$page_id,$external,$url);

my $new_count = $sth->fetchrow_array();

$sth->finish();

if ($new_count eq ''){
  $new_count = 1;
}

my $sth = $dbh->prepare(qq{
  REPLACE INTO popularity (type,page_id,external,url,count) 
  VALUES (?,?,?,?,$new_count)
});

$sth->execute($type,$page_id,$external,$url);

$sth->finish();

my $sth = $dbh->prepare(qq{
    SELECT SUM(count) FROM popularity WHERE type=? AND page_id=?
});

$sth->execute($type,$page_id);

my $total = $sth->fetchrow_array();
$total = OOOcomma($total);

$sth->finish();

$dbh->disconnect();

if ($total == 1) {
  $counter = 'once';
} else {
  $counter = "$total times";
}

$shared_string = qq{
  (<span title="This page has been shared $counter">$total</span>)
};

print $shared_string;

my $cached_file = untaint("../../_etc/cache/${section}--shared_${page_id}.html");

open SHARED, ">$cached_file" or print "<p class='neg'>Can't open file: $cached_file.</p>";
print SHARED $shared_string;
close SHARED;
