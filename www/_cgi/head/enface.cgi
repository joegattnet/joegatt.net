#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

  if ($p eq ''){
      $p = 1;
  }
  $extra = " - paragraph $p"; 

  #replace by search in sitemap table
  #also get book id?
  if($page eq 'index'){
    $title= "Jean Paul: Schulmeisterlein Wutz";
  } else {
    $title= "joegatt.net";
  }

	$dbh = connectDB();
  my $sth = $dbh->prepare(qq{
    SELECT text,DATE_FORMAT(date_created,'%Y/%m/%d %T') 
    FROM target_text 
    WHERE p=? AND book_id=1 
    ORDER BY date_created 
    DESC LIMIT 1
  });
  $sth->execute($p);
  ($description,$page_last_modified) = $sth->fetchrow_array();
  $sth->finish();
  $description = textTruncate($description,500);
	$dbh->disconnect();

  $prevParagraph = $p - 1;
  $nextParagraph = $p + 1;
  
  if ($prevParagraph<1){
    $prevParagraph = 1;
  } elsif ($nextParagraph>82) {
    $nextParagraph = 82;
  }

#82 and index.shtml should not be hardcoded

  if ($p==1) {
    $canonical = "http://joegatt.net/wutz/";  
  } else {
    $canonical = "http://joegatt.net/wutz/$p";  
  }

  $firstLink = "${root}wutz/1";
  $firstTitle = "$title - paragraph 1";
    
  $prevLink = "${root}wutz/$prevParagraph";
  $prevTitle = "$title - paragraph $prevParagraph";

  $nextLink = "${root}wutz/$nextParagraph";
  $nextTitle = "$title - paragraph $nextParagraph";

  $lastLink = "${root}wutz/82";
  $lastTitle = "$title - paragraph 82";
  
  $description = textTruncate($description,200);

  my $output = qq~
    <title>$title$extra</title>
    <meta name="description" content="$description" />
    <meta name="OriginalPublicationDate" content="$page_last_modified" />
    <meta name="author" content="Joe Gatt" />
    <meta name="keywords" content="" /> 
    <meta property="og:title" content="$title$extra" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="$canonical" />
    <meta property="og:image" content="" />
    <link rel="canonical" href="$canonical" />
    <link rel="first" href="$firstLink" title="$firstTitle" />
    <link rel="prev" href="$prevLink" title="$prevTitle" />
    <link rel="last" href="$lastLink" title="$lastTitle" />
  ~;

#Prefetching is registering double visits, upseting rememberme code
#Maybe this can be done more intelligently, using htaccess to cache only the index element [but how would that work in 'accessible' browsers]
#<link rel="next" href="$nextLink" title="$nextTitle" />
#<link rel="prefetch" href="${root}_cgi/wutz/get_page_index.cgi?b=1&p=$nextParagraph" />

# ******************************************************************************

cache_output("../../_cache/head--enface-".$ENV{"QUERY_STRING"}.".html",$output);
