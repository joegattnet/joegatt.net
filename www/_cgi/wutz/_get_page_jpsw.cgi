#!/usr/bin/perl -T

require '../_basics.cgi';

formRead("get");

#change all sequence to p
$paragraph_count = 82;

if ($sequence eq '') {
  if ($p ne '') {
    $sequence = $p;
  }
}

if ($sequence eq '') {
  $sequence = 1;
}

print ("Content-Type: text/html; charset=UTF-8\n\n");

my $dbh = connectDB();

$sql = "SELECT page FROM source_text WHERE book_id=? AND sequence=?";
my $sth = $dbh->prepare("$sql");
$sth->execute($b,$sequence);

my ($collate) = $sth->fetchrow_array();
$sth->finish();

$sql = "SELECT MAX(date_created) AS latest FROM target_text WHERE sequence>=? AND book_id=? GROUP BY sequence LIMIT ?";
my $sth = $dbh->prepare("$sql");
$sth->execute($sequence, $b, $collate);

while (my ($latest) = $sth->fetchrow_array()) {
	 push(@dates,"'$latest'");
}

$allDates = join(",", @dates);

$date_format = "DATE_FORMAT(target_text.date_created,' %e %b %H:%i')";

my $sth = $dbh->prepare(qq{
  SELECT source_text.text AS source,target_text.text AS target,target_text.sequence,version,$date_format,DATE_FORMAT(target_text.date_created,'%e %b %Y at %H:%i UTC'),target_text.Id,score,users.Id,username 
  FROM source_text,target_text,users 
  WHERE users.Id=target_text.user_id AND target_text.date_created IN ($allDates) AND source_text.sequence>=? AND source_text.book_id=? AND target_text.book_id=? AND source_text.sequence=target_text.sequence 
  GROUP BY sequence 
  ORDER BY sequence 
  LIMIT $collate
});

$sth->execute($sequence,$b,$b);

my $showPage = 0;

while (my ($source,$target,$found_sequence,$version,$date_string,$date,$target_id,$score,$u,$user_name) = $sth->fetchrow_array()) {

  $versions_info .= "NB.W.versions.info[$target_id] = [$u,'$user_name',$score,'$date_string','$date',$version,true];";
  $flattenedText = flattenText($source);
  $length = length($flattenedText);
  
  print qq~<div id="sequence\_$found_sequence" class="clearfix pair">~;
  
      print qq~
        <p class="extra extra_out">$found_sequence</p>
        <div class="grid_5 alpha text source">
  					<p lang="de" sourceLength="$length">$source</p>
    	  </div>
        <div class="grid_5 omega text target">
  					<p id="paragraph\_id\_$target_id" sourcelength="$length">$target</p>
    	  </div>
      ~;
  
      if ($found_sequence eq $paragraph_count) {
        print qq~
          <div class="grid_2 prefix_4 suffix_4 alpha omega ends_section"><div><!-- --></div></div>
          <div class="grid_6 prefix_2 suffix_2 alpha omega ends_epigraph">
            <div>
            ~;
              open (EPIGRAPH, "../../wutz/_content/_epigraph_1corinthians.html");
              my @lines = <EPIGRAPH>;
              print "@lines";
              close (EPIGRAPH);
              print qq~
            </div>
          </div>
          <div class="grid_2 prefix_4 suffix_4 alpha omega ends"><div><!-- --></div></div>
        ~;
      }
  
  print qq~</div>~;
    
}

$previousParagraph = $sequence-1;
if ($previousParagraph<1) {
  $previousParagraph = 1;
}
$nextParagraph = $sequence+1;
if ($nextParagraph>$paragraph_count) {
  $nextParagraph = $paragraph_count;
}
$nextPage = $sequence+$collate;
if ($nextPage>$paragraph_count) {
  $nextPage = $paragraph_count;
}

#TODO: these need to return false
#removed due to prefetching
#  			 <li><a href="$nextParagraph" rel="next" class="refresh_ignore next" title="Next paragraph">Next paragraph</a></li>
print qq~
<div class="navigator clearfix">
  <div class="grid_5 prefix_5 alpha omega al_right">
  		<ul class="nav_h">
  			 <li><a href="1" rel="start" class="refresh_ignore first" title="First paragraph">First paragraph</a></li>
  			 <li><a href="$previousParagraph" rel="prev" class="refresh_ignore previous" title="Previous paragraph">Previous paragraph</a></li>
  			 <li><a href="$nextParagraph" class="refresh_ignore next" title="Next paragraph">Next paragraph</a></li>
  			 <li><a href="$nextPage" class="refresh_ignore next_page goto" rel="$nextPage" title="Next page">Next page</a></li>
  			 <li><a href="$paragraph_count" rel="last" class="refresh_ignore last" title="Last paragraph">Last paragraph</a></li>
      </ul>
  </div>
</div>
<script type="text/javascript">
//<![CDATA[
window.scroll(0,0);
~;
if($startup eq 'true'){
  
  #open (ANAGRAM, "../_cache/_anagram_table.json");
  #my @lines = <ANAGRAM>;
  #close (ANAGRAM);
  #why is this opening above and what is the reference to load_anagram below???
  
  print qq~
    NB.deferred += "$versions_info";
    NB.deferred += "NB.W.slider = new NB.W.Slider($sequence);"
    NB.deferred += "NB.W.navigator.update($sequence,$paragraph_count);";
    NB.deferred += "NB.Cookie.write('v_wutz_jpsw','true',NB.crumb.path);"
    NB.deferred += "NB.Cookie.write('p',$sequence,NB.crumb.path);"
    NB.deferred += "new NB.W.Enface($sequence);"
    NB.deferred += "$load_anagram;";
    NB.deferred += "NB.p.top = $sequence;";
	~;
	#do above & below need to be so different???
} else {
  print qq~
  $versions_info
  NB.W.navigator.update($sequence,$paragraph_count);
	new NB.W.Enface($sequence);
  NB.Cookie.write('v_wutz_jpsw','true',NB.crumb.path);
  NB.Cookie.write('p',$sequence,NB.crumb.path);
	~;

  #This needs to move to jg_refresh
  print qq~
    _gaq.push(['_trackPageview','/wutz/$sequence']);
    NB.p.top = $sequence;
  ~;



}
print qq~
//]]>
</script>
~;

debug_info();

$sth->finish();
$dbh->disconnect();
