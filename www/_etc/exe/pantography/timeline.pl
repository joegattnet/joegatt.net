#!/usr/bin/perl -T

require '../basics.pl';
require '../basics_pantography.pl';

$dbh = connectDBpantography();

#Get latest self-generated text
my $sth = $dbh->prepare(qq{
  SELECT text, 
  DATE_FORMAT(date_created,'%Y-%m-%dT%H:%i:%sZ'), 
  DATE_FORMAT(date_created,'%e %b %Y at %H:%i UTC'), 
  text_id, 
  twitter_username, 
  twitter_realname 
  FROM text, 
  contributors 
  WHERE contributor_id = contributors.Id 
  ORDER BY date_created DESC 
  LIMIT 5
});
$sth->execute();
my $statuses = $sth->fetchall_arrayref();

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
  pantographyUsername => "$pantographyUsername",
  statuses => $statuses
};

my $TTinput = "pantography.timeline.tmpl";

$TTtemplate->process($TTinput, $TTvars, \$output) || die $TTtemplate->error();

cache_output("../../cache/pantography--timeline-.html", $output);
