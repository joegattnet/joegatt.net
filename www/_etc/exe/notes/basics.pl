#!/usr/bin/perl -T

#These functions should be moved to a MySQL stored procedure

sub printNote {

  my $note_e_guid = $_[0];
  my $template = $_[1];
  my $wrapper = $_[2];
  my $images;
  my $video;
  my $caption;
  my $text;
  my $textBriefLinked;
  my $textBriefClean;
  my $quote;
  my $quoteBriefLinked;
  my $attribution;
  my $youtubeId;
  my $vimeoId;
  my $dailymotionId;
  my $authorFullName;
  my $authorSurname;
  my $authorFirstName;
  my $translatorFullName;
  my $translatorSurname;
  my $translatorFirstName;
  my @resources;
  my @tags;
  my @tagsFetch;
  my @tagsFetchLinks;
  my $tagsUrl;
  my $noteoutput;
  my $isFragment;
  my $isBook;
  my $isLink;
  my $location;
  my $isTopic;
  my $isAlias;
  my $blurbLength = 250;
  my $templateType = 'default';
  my $location = 'notes';
  my $noteRef = hex(substr($note_e_guid,0,4));

  my $sthNote = $dbh->prepare(qq{
    SELECT DISTINCT Id,
      (SELECT COUNT(*) FROM notes WHERE e_guid=?) AS version,
      type,title,text,source,source_url,longitude,latitude,
      DATE_FORMAT(date_modified,'%Y-%m-%dT%H:%i:%sZ'),
      DATE_FORMAT(date_modified,'%e %b %Y at %H:%i UTC') 
    FROM notes
    WHERE e_guid = ?
    AND latest = 1 
    LIMIT 1
  });
  $sthNote->execute($note_e_guid,$note_e_guid);
  my ($Id,$version,$type,$title,$text,$source,$source_url,$note_longitude,$note_latitude,$date_iso8601,$date_full) = $sthNote->fetchrow_array();
  
  my $sthResources = $dbh->prepare(qq{
    SELECT DISTINCT resources.title, resources.rnd, resources.ext, resources.longitude, resources.latitude,
      DATE_FORMAT(resources.date_created,'%Y-%m-%dT%H:%i:%sZ'),
      DATE_FORMAT(resources.date_created,'%e %b %Y at %H:%i UTC') 
    FROM resources, notes, _lookup
    WHERE notes.e_guid = ?
    AND _lookup.type = 1
    AND _lookup.check1 = notes.e_guid
    AND _lookup.check2 = resources.e_guid
    ORDER BY _lookup.Id DESC
    LIMIT 1
  });
  $sthResources->execute($note_e_guid);

  my $sthTags = $dbh->prepare(qq{
    SELECT DISTINCT tags.name, tags.name_simple  
    FROM tags, notes, _lookup
    WHERE notes.e_guid = ?
    AND _lookup.type = 0
    AND _lookup.check1 = notes.e_guid
    AND _lookup.check2 = tags.e_guid
    ORDER BY tags.name_simple
  });
  $sthTags->execute($note_e_guid);

  while (my ($tagName, $tagLink) = $sthTags->fetchrow_array()) {
    if ($tagName eq '__SHOWMAPS') {
      $showMaps = 1;
    } elsif ($tagName eq '__FIXRATIO') {
      $imageFileSpecs = $imageFileSpecsForcedWidth;
    } elsif ($tagName !~ /_/) {
      push @tagsFetch, $tagName;
#      push @tagsFetchLinks, tagLinkify($tagName);
      push @tagsFetchLinks, $tagLink;
      push @tags, {
        listItem => tagListItem($tagName, $tagLink)
      }
    }    
  }
  
  #Type
  use Switch;
  switch ($type){
    case 0 {
      $isFragment = 1;
    }
    case 2 {
      $isBook = 1;
      $templateType = 'book';
      $location = 'bibliography';
    } 
    case 3 {
      $isLink = 1;
      $templateType = 'link';
      $location = 'links';
    }
    case 4 {
      $isTopic = 1;
      $templateType = 'topic';
      $location = 'topics';
    }
    case 5 {
      $isAlias = 1;
      $templateType = 'alias';
      #$location = 'alias';
    }
  }

  push @tagsFetchLinks, '_notes_p'.$noteRef;
  $tagsUrl = join(',', @tagsFetchLinks);
  
  #Resources (images & binary files)
  while (my ($resource_title,$rnd,$ext,$resource_longitude,$resource_latitude,$date_iso8601,$date_full) = $sthResources->fetchrow_array()) {
    push @resources, {
      title => $resource_title,
      rnd => $rnd,
      ext => $ext,
      longitude => $resource_longitude,
      latitude => $resource_latitude,
      date_iso8601 => $date_iso8601,
      date_full => $date_full
    };
  }
    
  #Videos
   if ($template ne 'head') {
     if ($source_url =~ s/http.*vimeo\.com.*?([0-9]+)// || $text =~ s/http.*vimeo\.com.*?([0-9]+)//) {
       $vimeoId = $1;
      }
     if ($source_url =~ s/http.*youtube\.co..?.?\/watch\?v\=(.+)// || $text =~ s/http.*youtube\.co..?.?\/watch\?v\=([^\"]+)//) {
       $youtubeId = $1;
     }
     if ($source_url =~ s/http.*dailymotion\.com\/video\/([^\_]+?)\_// || $text =~ s/http.*dailymotion\.com\/video\/([^\_]+?)\_//) {
       $dailymotionId = $1;
     }
   }

  #Text
  $title =~ s/(\[|\").*$//g;
  $title =~ s/ ?\([^)]*$//g;
  $title = sanitiseText($title, 1);
  $title =~ s/ ?\- Wikipedia\,.*//i;
  $text = sanitiseText($text, 0);

  if ($text =~ s/capt?i?o?n?\: *(.*?)$//i) {
    #$caption = textTruncate($1, 80);
    $caption = $1;
  }

  if ($text =~ s/attr?\: *(.*?)$//i) {
    #$attribution = textTruncate($1, 80);
    $attribution = $1;
  }

  if ($text =~ s/quote\: *\{ *(.*?) *\} *$//i || $text =~ s/quote\: *(.*?)$//i) {
      $quote = $1;
      $quoteBriefLinked = textTruncateLink($quote, 350, false, "/$location/$noteRef", 'More');;
  }

  $text =~ s/\&nbsp\;/ /g;
  if ($isBook) {
     #Add City
     ($authorFullName, $bookTitle, $publisherName, $publishedDate, $isbn) = $text =~ /([^:]+?): ?(.+) ?\( ?(.+?)\, ([\d\/]{4,9}) ?\) ?isbn ?([\w]+)/mi;
     
     if($authorFullName =~ /(.*?)\, *(.*?)$/){
       $authorSurname = $1;
       $authorFirstName = $2;
     } else {
       $authorSurname = $authorFullName;
     }
     
     if($publishedDate =~ /([\d]{4})\/([\d]{4})$/){
       $publishedDateOriginal = $1;
       $publishedDate = $2;
     } else {
       $publishedDateOriginal = $publishedDate;
     }

     if($text =~ s/tra?n?s?l?a?t?o?r?\: *(.*)$//i){
       $translatorFullName = $1;
       if($translatorFullName =~ /(.*?)\, *(.*?)$/){
        $translatorSurname = $1;
        $translatorFirstName = $2;
       }
     } else {
        $translatorSurname = $translatorFullName;
     }

     if ($source_url !~ /gutenberg/ && $source_url !~ /wikisource\.org/ && $source_url !~ /archive\.org/) {
       undef($source_url);
      }


  } elsif ($isAlias) {
  
    #This needs to be more flexible - to return description if book_id is null, etc. 
    #Also, to handle all url forms.
    
    #chunk_paragraph
    
    ($section, $page, $p) = $text =~ /\[(.*?)\|(.*?)\|(.*?)\]/;
    
    #It would be better to do the condition in MySQL but couldn't get it to work
    my $sthAlias = $dbh->prepare(qq{
		SELECT chunk FROM pages WHERE section = ?
    });
    $sthAlias->execute($section);
    ($chunk) = $sthAlias->fetchrow_array();
    
    if($chunk){
	    my $sthAlias = $dbh->prepare(qq{
    	  SELECT text, title
    	  FROM pages, target_text
     	  WHERE section = ?
      	  AND p = ? 
          AND version = 1
          AND pages.book_id = target_text.book_id
          LIMIT 1
    	});
    	$sthAlias->execute($section, $p);
    	($text, $title) = $sthAlias->fetchrow_array();   
    } else {
    	my $sthAlias = $dbh->prepare(qq{
      	  SELECT description, title
      	  FROM pages
      	  WHERE section = ?
      	  LIMIT 1
    	});
    	$sthAlias->execute($section);
    	($text, $title) = $sthAlias->fetchrow_array();    
    }
        
    $location = $section;
    $blurbLength = 120;
    $noteRef = $p;
  
  } elsif ($title && $title ne '' && $isTopic && $text eq '' && $quote eq '') {
    use WWW::Wikipedia;
    my $wiki = WWW::Wikipedia->new();
    my $entry = $wiki->search($title);
    if($entry){
      $text .= $entry->text_basic();
      #$textBriefLinked = textTruncateLink($text, 250, false, "$source_url", 'More');
    }
  }

  $textBriefClean = textTruncate(sanitiseText($text, 1), $blurbLength);
  $textBriefClean =~ s/\"/\'/g;
  $text =~ s/\n\n/\n/g;
  $text =~ s/\n/<\/p><p>/g;
  $text =~ s/http\:\/\/joegatt\.net\/?/\//g;
  if($text ne ''){
    $text = "<p>$text</p>";
  }
  $textBriefLinked = textTruncateLink($text, $blurbLength, false, "/$location/$noteRef", 'More');

  if($title ne '' && $text ne '' && $title !~ /(quote|cap|caption)\:/i && $title !~ /untitled|Note Title/i && $textBriefClean !~ /^($title)/i){
    $title =~ s/^\s+|\s+$//g;
  } elsif (!$isTopic && !$isLink && !$isBook && !$isAlias) {
    $title = '';
  }

  $version = "0.$version";

  $source_url =~ /([a-z0-9]*\.[\.a-z]*)/;
  $source_url_domain = $1;
  $source_url_domain =~ s/^www\.|^en\.//g;
    
  #Process
    use Template;

    my $TTconfig = {
        ENCODING => 'utf8',
        INCLUDE_PATH => '../../templates',
        POST_CHOMP   => 1
    };

    my $TTtemplate = Template->new($TTconfig);
    
    my $TTvars = {
        p => $noteRef,
        version => $version,
        title => $title,
        location => $location,
        section => $section,
        chunk => $chunk,

        text => $text,
        textBriefClean => $textBriefClean,
        textBriefLinked => $textBriefLinked,
        caption => $caption,
        quote => $quote,
        quoteBriefLinked => $quoteBriefLinked,
        attribution => $attribution,

        bookTitle => $bookTitle,
        publisherName => $publisherName,
        publishedDate => $publishedDate,
        publishedDateOriginal => $publishedDateOriginal,
        isbn => $isbn,
        authorFullName => $authorFullName,
        authorSurname => $authorSurname,
        authorFirstName => $authorFirstName,
        translatorFullName => $translatorFullName,
        translatorSurname => $translatorSurname,
        translatorFirstName => $translatorFirstName,
        
        source => $source,
        sourceUrl => $source_url,
        sourceUrlDomain => $source_url_domain,
        longitude => $note_longitude,
        latitude => $note_latitude,
        date_iso8601 => $date_iso8601,
        date_full => $date_full,

        showMaps => $showMaps,
        vimeoId => $vimeoId,
        youtubeId => $youtubeId,
        dailymotionId => $dailymotionId,
                
        resources => \@resources,
        tags => \@tags,
        tagsUrl => $tagsUrl,
        imageServer => $imageServer,
        wrapper => $wrapper
    };
    
    my $TTinput = "notes.item.$template.$templateType.tmpl";

    $TTtemplate->process($TTinput, $TTvars, \$noteoutput) || die $TTtemplate->error();
    
    if($template eq 'list' or $template eq 'compact'){
      $noteoutput = "<li about=\"/$location/$noteRef\">$noteoutput</li>";
    }
    
  return $noteoutput;

}

sub sanitiseText {

  my $text = $_[0];
  my $totally = $_[1];

  if($text ne ''){
    $text =~ s/\&nbsp\;|\n/ /g;
    $text =~ s/style=\"[^\"]*\"//g;
    $text =~ s/  / /g;
    if($totally){
      use HTML::Strip;
      my $hs = HTML::Strip->new();
      $text = $hs->parse($text);
      $hs->eof;  
    } else {
      #HTML::Strip does not allow exceptions
      $text =~ s/<div><b>/<h3>/g;
      $text =~ s/<\/b><\/div>/<\/h3>/g;
      $text =~ s/<\/div>/<\/div>\n/g;
      $text =~ s/<a /XXaXX/g;
      $text =~ s/<\/a>/YYaYY/g;
      $text =~ s/<ul/XXulXX/g;
      $text =~ s/<\/ul>/YYulYY/g;
      $text =~ s/<ol/XXolXX/g;
      $text =~ s/<\/ol>/YYolYY/g;
      $text =~ s/<li/XXliXX/g;
      $text =~ s/<\/li>/YYliYY/g;
      $text =~ s/<h3/XXh3XX/g;
      $text =~ s/<\/h3>/YYh3YY/g;
    
      use HTML::Strip;
      my $hs = HTML::Strip->new();
      $text = $hs->parse($text);
      $hs->eof;  
    
      $text =~ s/XXaXX/<a /g;
      $text =~ s/YYaYY/<\/a>/g;
      $text =~ s/XXulXX/<ul/g;
      $text =~ s/YYulYY/<\/ul>/g;
      $text =~ s/XXolXX/<ol/g;
      $text =~ s/YYolYY/<\/ol>/g;
      $text =~ s/XXliXX/<li/g;
      $text =~ s/YYliYY/<\/li>/g;
      $text =~ s/XXh3XX/<h3/g;
      $text =~ s/YYh3YY/<\/h3>/g;
      $text =~ s/<p><\/p>//g;
      $text =~ s/<p><h3>/<h3>/g;
      $text =~ s/<\/h3><\/p>/<\/h3>/g;
    }

    #$text =~ s/\n\n/ /g;
    $text =~ s/  / /g;
    $text =~ s/^\s+//;
    $text =~ s/\s+$//;  
  
    $text =~ s/^\s+|\s+$//g;
    
    #convert exponents
    $text =~ s/\^([\d]*)/<sup>$1<\/sup>/g;
    #  $text =~ s/^\W+|\W+$//g; #This removes punctuation
  }

  return $text;

}

1;
