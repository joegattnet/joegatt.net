#!/usr/bin/perl -T

require '../basics.pl';

$p = 1;
$static = 0;
$mode = 'latest';
$multipage = 1;

formRead("get");

if ($p > $p_max) {
  $p = $p_max;
}

my $dbh = connectDB();

$sql = "SELECT page FROM source_text WHERE book_id=? AND p=?";
my $sth = $dbh->prepare("$sql");
$sth->execute($b,$p);

my ($collate) = $sth->fetchrow_array();
$sth->finish();

$sql = qq{
  SELECT min(date_created) 
  FROM target_text 
  WHERE p>=? 
  AND book_id=? 
  GROUP BY p LIMIT ?
};

my $sth = $dbh->prepare("$sql");
$sth->execute($p, $b, ($collate * $multipage));

while (my ($latest) = $sth->fetchrow_array()) {
	 push(@dates,"'$latest'");
}
$sth->finish();

$allDates = join(",", @dates);

my $sth = $dbh->prepare(qq{
  SELECT text AS source,
         p
  FROM source_text
  WHERE p>=? 
    AND book_id=? 
  GROUP BY p 
  ORDER BY p 
  LIMIT $collate
});

$sth->execute($p, $b);

$output .= qq~
  <div class="grid_5 alpha text">
    <!-- google_ad_section_start -->
  ~;
  
while (my ($source, $found_p) = $sth->fetchrow_array()) {

$output .= qq~
    <div id="p\_$found_p" class="grid_5 alpha clearfix pair">
      <p class="extra extra_out">$found_p</p>
      <div class="grid_5 alpha text source">
					<p lang="de" class="notranslate">$source</p>
  	  </div>
    </div>
  ~;
}

$output .= qq~
    <!-- google_ad_section_end -->
  </div>
  <div class="grid_5 omega text target" style="background-color:red">
    xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx 
  </div>
~;

if ($found_p eq $p_max) {
  $output .= qq~
    <div class="grid_2 prefix_4 suffix_4 alpha omega ends"><div><!-- --></div></div>
  ~;
}

$sth->finish();

$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/enface--paragraphs_pecuniary-".$ENV{"QUERY_STRING"}.".html",$output);
