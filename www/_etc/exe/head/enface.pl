#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

  if ($p eq ''){
      $p = 1;
  }
  $extra = " - paragraph $p"; 

  #replace by search in sitemap table
  #also get book id?
  if($page eq 'index'){
    $title = "Jean Paul: Schulmeisterlein Wutz";
    $orderSql = "ORDER BY date_created DESC";
  } else {
    $title = "Jean Paul: Schulmeisterlein Wutz v0.7rc1";
    $orderSql = "ORDER BY date_created";
    $prefix = "$page/";
  }

	$dbh = connectDB();
  my $sth = $dbh->prepare(qq{
    SELECT text,DATE_FORMAT(date_created,'%Y/%m/%d %T') 
    FROM target_text 
    WHERE p=? AND book_id=1 
    $orderSql 
    LIMIT 1
  });
  $sth->execute($p);
  ($description,$page_last_modified) = $sth->fetchrow_array();
  
  $description = textTruncate($description,500);
	$dbh->disconnect();

  $prevParagraph = $p - 1;
  $nextParagraph = $p + 1;
  
  if ($prevParagraph<1){
    $prevParagraph = 1;
  } elsif ($nextParagraph>$p_max) {
    $nextParagraph = $p_max;
  }

  $canonical = "http://joegatt.net/wutz/$prefix";

  if ($p != 1) {
    $canonical = "$canonical$p/";  
  }

  $firstLink = "${root}wutz/${prefix}1";
  $firstTitle = "$title - paragraph 1";
    
  $prevLink = "${root}wutz/${prefix}${prevParagraph}";
  $prevTitle = "$title - paragraph ${prevParagraph}";

  $nextLink = "${root}wutz/${prefix}${nextParagraph}";
  $nextTitle = "$title - paragraph ${nextParagraph}";

  $lastLink = "${root}wutz/${prefix}82";
  $lastTitle = "$title - paragraph 82";
  
  $description = textTruncate($description,200);

  my $output = qq~
    <!--#set var="title.window" value="$title$extra" -->
    <!--#set var="description" value="$description" -->
    <!--#set var="date_published" value="$page_last_modified" -->
    <!--#set var="canonical" value="$canonical" -->
    <!--#set var="nav_first" value="$firstLink" -->
    <!--#set var="nav_first_title" value="$firstTitle" -->
    <!--#set var="nav_prev" value="$prevLink" -->
    <!--#set var="nav_prev_title" value="$prevTitle" -->
    <!--#set var="nav_last" value="$lastLink" -->
    <!--#set var="nav_last_title" value="$lastTitle" -->
  ~;

#Prefetching is registering double visits, upseting rememberme code
#Maybe this can be done more intelligently, using htaccess to cache only the index element [but how would that work in 'accessible' browsers]
#<link rel="next" href="$nextLink" title="$nextTitle" />
#<link rel="prefetch" href="${root}_etc/exe/wutz/get_page_index.pl?b=1&p=$nextParagraph" />

# ******************************************************************************

cache_output("../../cache/head--enface-$ENV{\"QUERY_STRING\"}.shtml",$output);
