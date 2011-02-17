#!/usr/bin/perl -T

require '../basics.cgi';

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

if($mode eq 'oldest'){
  $sql = "SELECT MIN(date_created) FROM target_text WHERE p>=? AND book_id=? GROUP BY p LIMIT ?";
}else{
  $sql = "SELECT MAX(date_created) FROM target_text WHERE p>=? AND book_id=? GROUP BY p LIMIT ?";
}
my $sth = $dbh->prepare("$sql");
$sth->execute($p, $b, ($collate * $multipage));

while (my ($latest) = $sth->fetchrow_array()) {
	 push(@dates,"'$latest'");
}

$allDates = join(",", @dates);

$date_format = "DATE_FORMAT(target_text.date_created,' %e %b %H:%i')";

my $sth = $dbh->prepare(qq{
  SELECT source_text.text AS source,target_text.text AS target,target_text.p,version,$date_format,DATE_FORMAT(target_text.date_created,'%e %b %Y at %H:%i UTC'),target_text.Id,score,users.Id,username 
  FROM source_text,target_text,users 
  WHERE users.Id=target_text.user_id AND target_text.date_created IN ($allDates) AND source_text.p>=? AND source_text.book_id=? AND target_text.book_id=? AND source_text.p=target_text.p 
  GROUP BY p 
  ORDER BY p 
  LIMIT $collate
});

$sth->execute($p,$b,$b);
  
if(!$static){
  $appClass = " class=\"app\"";
}

while (my ($source,$target,$found_p,$version,$date_string,$date,$target_id,$score,$u,$user_name) = $sth->fetchrow_array()) {

  $versions_info .= "NB.versions['p$target_id'] = [$u,'$user_name',$score,'$date_string','$date',$version,true];";
  $flattenedText = flattenText($source);
  $length = length($flattenedText);

  $output .= qq~
      <div id="p\_$found_p" class="clearfix pair">
        <p class="extra extra_out">$found_p</p>
        <div class="grid_5 alpha text source">
  					<p lang="de" sourceLength="$length" class="notranslate">$source</p>
    	  </div>
        <div class="grid_5 omega text target">
  					<p id="paragraph\_id\_$target_id"$appClass sourcelength="$length">$target</p>
    	  </div>
      ~;
  
      if ($found_p eq $p_max) {
        $output .= qq~
          <div class="grid_2 prefix_4 suffix_4 alpha omega ends_section"><div><!-- --></div></div>
          <div class="grid_6 prefix_2 suffix_2 alpha omega ends_epigraph">
            <div>
            ~;
              open (EPIGRAPH, "../../_content/wutz/epigraph_1corinthians.html");
              my @lines = <EPIGRAPH>;
              $output .= "@lines";
              close (EPIGRAPH);
              $output .= qq~
            </div>
          </div>
          <div class="grid_2 prefix_4 suffix_4 alpha omega ends"><div><!-- --></div></div>
        ~;
      }
  
  $output .= qq~</div>~;
    
}

if(!$static){
  $output .= qq~
  <script type="text/javascript">
  //<![CDATA[
    NB.loaded_scripts.add(function(){
      NB.Nav.track(0,'Loaded enface content - p$p');
      $versions_info
    });
  //]]>
  </script>
  ~;
}

$sth->finish();
$dbh->disconnect();

$output .= debug_info();

# ******************************************************************************

cache_output("../../_cache/content--enface-".$ENV{"QUERY_STRING"}.".html",$output);
