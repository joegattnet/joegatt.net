#!/usr/bin/perl -T

#This will only run on live
#We could change directory in the cron job first (tried but failed)
#Also, remember that $server is null since we're not running this through Apache
#- Move to cron folder
# cd /var/www/joegatt-net/production/www/cgi _cron_broadcast.cgi
#Same for sitemap location

require '/var/www/joegatt-net/production/www/_cgi/basics.cgi';

use DBI;
use XML::Generator::DBI;
use XML::Handler::YAWriter;

parseDBcredentials();

$mapFile = "/var/www/joegatt-net/production/www/sitemap.xml";
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
         'daily' AS changefreq,
         '0.9' AS priority 
         FROM target_text,comments WHERE target_text.book_id=? GROUP BY target_text.p;
        ~;

$gen->pre_execute();

$gen->execute_one($sql1,['http://joegatt.net/wutz/',1]);

$gen->post_execute();

$dbh->disconnect();

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

print "Sitemap updated.\n";
