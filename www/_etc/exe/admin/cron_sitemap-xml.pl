#!/usr/bin/perl -T

require '../basics.pl';

use DBI;
use XML::Generator::DBI;
use XML::Handler::YAWriter;

parseDBcredentials();

$mapFile = "../../../sitemap.xml";
$mapFile = untaint($mapFile);

my $dbh = DBI->connect($dsn,$db_user_name,$db_password,{RaiseError => 1, PrintError => 0});
my $out = XML::Handler::YAWriter->new('Output' => new IO::File(">$mapFile"));

my $gen = XML::Generator::DBI->new(
  Handler => $out,
  dbh => $dbh,
#  RootElement => 'urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  RootElement => 'urlset',
  ByColumnName => 1,
  RowElement => 'url',
  QueryElement => undef,
  Indent => true
);

$sql1 = qq~
         SELECT CONCAT(?,target_text.p) AS loc,
         MAX(DATE_FORMAT(
           IF(target_text.date_created>(SELECT comments.date_created FROM comments ORDER BY comments.date_created DESC LIMIT 1),target_text.date_created,(SELECT comments.date_created FROM comments ORDER BY comments.date_created DESC LIMIT 1)),
           '%Y-%m-%d')) AS lastmod,
         ? AS changefreq,
         ? AS priority 
         FROM target_text,comments 
         WHERE target_text.book_id=? 
         GROUP BY target_text.p
        ~;

$sql2 = qq~
         SELECT CONCAT(?,name_simple) AS loc,
         DATE_FORMAT(NOW(), '%Y-%m-%d') AS lastmod,
         ? AS changefreq,
         ? AS priority 
         FROM tags
         WHERE NOT tags.name_simple LIKE '\\_%'
        ~;

$sql3 = qq~
         SELECT CONCAT(?,CONV(SUBSTRING(e_guid,1,4), 16, 10)) AS loc,
         DATE_FORMAT(date_modified, '%Y-%m-%d') AS lastmod,
         ? AS changefreq,
         ? AS priority 
         FROM notes 
         WHERE latest = 1
         AND publish >= 2
         AND deleted <> 1 
         AND type = ?
        ~;

$sql4 = qq~
         SELECT ? AS loc,
         DATE_FORMAT(NOW(), '%Y-%m-%d') AS lastmod,
         ? AS changefreq,
         ? AS priority 
        ~;

$gen->pre_execute();

$gen->execute_one($sql4, ['http://joegatt.net/', 'daily', '0.5']);

$gen->execute_one($sql4, ['http://joegatt.net/tags/', 'daily', '0.5']);
$gen->execute_one($sql2, ['http://joegatt.net/tags/', 'daily', '0.6']);

$gen->execute_one($sql4, ['http://joegatt.net/notes/', 'daily', '0.5']);
$gen->execute_one($sql3, ['http://joegatt.net/notes/', 'daily', '0.8', 1]);

$gen->execute_one($sql4, ['http://joegatt.net/bibliography/', 'daily', '0.5']);
$gen->execute_one($sql3, ['http://joegatt.net/bibliography/', 'daily', '0.7', 2]);

$gen->execute_one($sql4, ['http://joegatt.net/links/', 'daily', '0.5']);
$gen->execute_one($sql3, ['http://joegatt.net/links/', 'daily', '0.6', 3]);

$gen->execute_one($sql4, ['http://joegatt.net/topics/', 'daily', '0.5']);
$gen->execute_one($sql3, ['http://joegatt.net/topics/', 'daily', '0.6', 4]);

$gen->execute_one($sql4, ['http://joegatt.net/code/', '0.8', 'daily']);
$gen->execute_one($sql4, ['http://joegatt.net/colophon/', 'daily', '0.5']);

$gen->execute_one($sql4, ['http://joegatt.net/wutz/', 'daily', '0.8']);
$gen->execute_one($sql1, ['http://joegatt.net/wutz/', 'daily', '0.8', 1]);
$gen->execute_one($sql4, ['http://joegatt.net/wutz/rc', 'daily', '0.9']);
$gen->execute_one($sql1, ['http://joegatt.net/wutz/rc/', 'daily', '0.9', 1]);

$gen->post_execute();

$dbh->disconnect();

if($serverName){
  print ("Content-Type: text/html; charset=UTF-8\n\n");
}

# HACK TO FIX xmlns ************************************************************
# ******************************************************************************

open (SITEMAP, "$mapFile") or die print "Can't open sitemap.xml file (in)...\n";
my @currentMap = <SITEMAP>;
$output = "@currentMap";
close (SITEMAP);

$output =~ s/\<urlset\>/\<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"\>/;

open (SITEMAP, ">$mapFile") or die print "Can't open sitemap.xml (out)...\n";
print SITEMAP "$output";
close (SITEMAP);

# ******************************************************************************
# ******************************************************************************

print "Sitemap updated: " . int(($#currentMap - 1) / 6) . " urls.\n";
