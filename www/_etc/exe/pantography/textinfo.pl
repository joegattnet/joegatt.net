#!/usr/bin/perl -T

use URI::Escape;

require '../basics.pl';
require '../basics_pantography.pl';

formRead('get');

# Hashes are not handled properly by Apache, it seems
# even though encoded. AllowPathInfo ineffective in this case
$q =~ s/\|/\#/g;

$dbh = connectDBpantography();

#Get latest self-generated text
my $sth = $dbh->prepare(qq{
  SELECT DATE_FORMAT(date_created,'%Y-%m-%dT%H:%i:%sZ'), 
  DATE_FORMAT(date_created,'%e %b %Y at %H:%i UTC'), 
  text_id, 
  twitter_username, 
  twitter_realname 
  FROM text, 
  contributors 
  WHERE LCASE(text) = LCASE(?) 
  AND contributor_id = contributors.Id 
  ORDER BY date_created DESC 
  LIMIT 1
});
$sth->execute(uri_unescape($q));
my $status = $sth->fetchall_arrayref();

$sth->finish();
$dbh->disconnect();

use Template;

if ($sth->rows > 0){
  $exists = true;
} else {
  $exists = false;
}

my $TTconfig = {
    ENCODING => 'utf8',
    INCLUDE_PATH => '../../templates',
    POST_CHOMP   => 1
};

my $TTtemplate = Template->new($TTconfig);

my $TTvars = {
    jsoncallback => $jsoncallback,
    exists => $exists,
    status => $status
};

my $TTinput = "pantography.textinfo.tmpl";

$TTtemplate->process($TTinput, $TTvars, \$output) || die $TTtemplate->error();

print ("Content-Type: text/plain\n\n");
print qq~$output~;
