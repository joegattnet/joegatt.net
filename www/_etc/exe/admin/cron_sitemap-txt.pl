#!/usr/bin/perl -T

require '../basics.pl';

$mapFile = "../../../sitemap.txt";
$mapFile = untaint($mapFile);

$dbh = connectDB();

$sql1 = qq~
         SELECT CONCAT(?,target_text.p)
         FROM target_text,comments 
         WHERE target_text.book_id=? 
         GROUP BY target_text.p
        ~;

$sql2 = qq~
          SELECT CONCAT(?,name_simple)
          FROM tags,notes,_lookup 
          WHERE latest=1 
          AND NOT name LIKE '\\_%' 
          AND notes.publish >= 2
          AND notes.deleted <> 1
          AND notes.type > ?
          AND check1=notes.e_guid 
          AND check2=tags.e_guid 
        ~;

$sql3 = qq~
         SELECT CONCAT(?,CONV(SUBSTRING(e_guid,1,4), 16, 10))
         FROM notes 
         WHERE latest = 1
         AND publish >= 2
         AND deleted <> 1 
         AND type = ?
        ~;

$count = 10;

sub getLinks {
  my $links = '';
  $sth = $dbh->prepare($_[0]);
  $sth->execute($_[1], $_[2]);
  while (my ($location) = $sth->fetchrow_array()) {
    $links .= "$location\n";
    $count++;
  }
  return $links;
}

$output .= "http://joegatt.net/\n";

$output .= "http://joegatt.net/tags/\n";
$output .= getLinks($sql2, "http://joegatt.net/tags/", 0);

$output .= "http://joegatt.net/notes/\n";
$output .= getLinks($sql3, "http://joegatt.net/notes/", 1);

$output .= "http://joegatt.net/bibliography/\n";
$output .= getLinks($sql3, "http://joegatt.net/bibliography/", 2);

$output .= "http://joegatt.net/links/\n";
$output .= getLinks($sql3, "http://joegatt.net/links/", 3);

$output .= "http://joegatt.net/topics/\n";
$output .= getLinks($sql3, "http://joegatt.net/topics/", 4);

$output .= "http://joegatt.net/wutz/\n";
$output .= getLinks($sql1, "http://joegatt.net/wutz/", 1);
$output .= "http://joegatt.net/wutz/rc\n";
$output .= getLinks($sql1, "http://joegatt.net/wutz/rc/", 1);
$output .= "http://joegatt.net/wutz/statistics\n";

$output .= "http://joegatt.net/code/\n";
$output .= "http://joegatt.net/colophon/";

$dbh->disconnect();

if($serverName){
  print ("Content-Type: text/html; charset=UTF-8\n\n");
}

open (SITEMAP, ">$mapFile") or die print "Can't open sitemap.txt.\n";
  print SITEMAP $output;
close (SITEMAP);

print "Sitemap updated: $count urls.\n";
