#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

my $dbh = connectDB();

$sth = $dbh->prepare(qq{
    SELECT target_text.text AS target,
    DATE_FORMAT(target_text.date_created,'%Y-%m-%dT%H:%i:%sZ'),
    DATE_FORMAT(target_text.date_created,'%e %b %Y at %H:%i UTC'),
    target_text.Id,
    score,
    users.Id,
    username 
    FROM target_text,users 
    WHERE target_text.p=? AND target_text.version=? AND users.Id=target_text.user_id AND target_text.book_id=? 
    LIMIT 1
});

$sth->execute($p, $version, $b);

while (my ($target,$date_iso8601,$date_full,$target_id,$score,$u,$user_name) = $sth->fetchrow_array()) {
 	$output .= qq~
    NB.versions['p$target_id'] = {
      userId: $u,
      userName: '$user_name',
      score: $score,
      date_iso8601: '$date_iso8601',
      date_full: '$date_full',
      version: $version,
      isLatest: false
    }
    var target_element = NB.App.getTarget($p);
    \$(target_element).text("$target");
    NB.Versions.display('$target_id');
    \$(target_element).animate({color: NB.S.color.version_loaded},500);
	~;
}

$output = qq~<script>$output</script>~;

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/enface--version-$ENV{\"QUERY_STRING\"}.html",$output);
