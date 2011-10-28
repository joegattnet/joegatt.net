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


if ($mode eq 'oldest') {
  $sql = qq{
    SELECT min(date_created) 
    FROM target_text 
    WHERE p>=? 
    AND book_id=? 
    GROUP BY p LIMIT ?
  };
} else {
  $sql = qq{
    SELECT MAX(date_created) 
    FROM target_text 
    WHERE p >= ? 
    AND book_id = ? 
    GROUP BY p 
    LIMIT ?
    };
}
my $sth = $dbh->prepare("$sql");
$sth->execute($p, $b, ($collate * $multipage));

while (my ($latest) = $sth->fetchrow_array()) {
	 push(@dates,"'$latest'");
}

$allDates = join(",", @dates);

my $sth = $dbh->prepare(qq{
  SELECT source_text.text AS source,
  target_text.text AS target,
  target_text.p,
  version,
  DATE_FORMAT(target_text.date_created,'%Y-%m-%dT%H:%i:%sZ'),
  DATE_FORMAT(target_text.date_created,'%e %b %Y at %H:%i UTC'),
  target_text.Id,
  score,
  users.Id,
  username 
  FROM source_text,target_text,users 
  WHERE users.Id=target_text.user_id 
    AND target_text.date_created IN ($allDates) 
    AND source_text.p>=? 
    AND source_text.book_id=? 
    AND target_text.book_id=? 
    AND source_text.p=target_text.p 
  GROUP BY p 
  ORDER BY p 
  LIMIT $collate
});

$sth->execute($p,$b,$b);
  
if(!$static){
  $appClass = " class=\"app\"";
}

while (my ($source,$target,$found_p,$version,$date_iso8601,$date_full,$target_id,$score,$u,$user_name) = $sth->fetchrow_array()) {

 	$versions_info .= qq~
    NB.versions['p$target_id'] = {
      userId: $u,
      userName: '$user_name',
      score: $score,
      date_iso8601: '$date_iso8601',
      date_full: '$date_full',
      version: $version,
      isLatest: true
    }
	~;  
  
  #Tags are cached in an array so that when user selects a new paragraph
  #notes can be fetched
  my $sthTags = $dbh->prepare(qq{
    SELECT tags.name_simple
    FROM tags, notes, _lookup
    WHERE textonly =  ?
    AND NOT tags.name_simple LIKE '\\_%'
    AND _lookup.type =0
    AND _lookup.check1 = notes.e_guid
    AND _lookup.check2 = tags.e_guid
    ORDER BY tags.name_simple
  });
  $sthTags->execute("wutz|index|$found_p");
  $tags = join(",", $sthTags->fetchrow_array(), "_wutz_p${found_p}");
  #We accumulate an array for static page
  push(@allTags, $sthTags->fetchrow_array());
  push(@allTags, "_wutz_p${found_p}");
  $tags_array .= qq~
    NB.Cache.add('_tags_b${b}_p${found_p}', "$tags");
  ~;
  
  $flattenedText = flattenText($source);
  $length = length($flattenedText);

  $output .= qq~
      <div id="p\_$found_p" class="clearfix pair">
        <p class="extra extra_out">$found_p</p>
        <div class="grid_5 alpha text source">
  					<p lang="de" class="notranslate">$source</p>
    	  </div>
        <div class="grid_5 omega text target">
  					<p id="paragraph\_id\_$target_id"$appClass data-p="$found_p" data-id="$target_id" data-sourcelength="$length">$target</p>
    	  </div>
      ~;
  
      if ($found_p eq $p_max) {
        $output .= qq~
          <div class="grid_2 prefix_4 suffix_4 alpha omega ends"><div><!-- --></div></div>
        ~;
      }
  
  $output .= qq~</div>~;
    
}

if(!$static){
  $output .= qq~
  <script>
    NB.loaded_scripts.add(false, function(){
      $tags_array
      NB.meta.tags = NB.cache['\_tags\_b${b}\_p${p}'].data;
      NB.Nav.track(0,'Loaded enface content - p$p');
      $versions_info
    });
  </script>
  ~;
} else {
  $allTagsString = join(",", @allTags);
  $output .= qq~
  <script>
    NB.meta.tags = "$allTagsString";
  </script>
  ~;
}

$sth->finish();
$dbh->disconnect();

# ******************************************************************************

cache_output("../../cache/enface--paragraphs-".$ENV{"QUERY_STRING"}.".html",$output);
