#!/usr/bin/perl -T

sub printNote {

  my $note_e_guid = $_[0];
  my $template = $_[1];
  my $images;
  my $video;
  my $caption;
  my $quote;
  my $attribution;
  my $youtubeId;
  my $vimeoId;
  my $dailymotionId;
  my @resources;
  my @tags;
  my $tagsUrl;
  my $noteoutput;
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
    ORDER BY date_modified DESC
    LIMIT 1
  });
  $sthNote->execute($note_e_guid,$note_e_guid);
  my ($Id,$version,$type,$title,$text,$source,$source_url,$note_longitude,$note_latitude,$date_iso8601,$date_full) = $sthNote->fetchrow_array();
  
  my $sthResources = $dbh->prepare(qq{
    SELECT DISTINCT resources.title, resources.rnd, resources.ext, resources.longitude, resources.latitude
    FROM resources, notes, _lookup
    WHERE notes.e_guid = ?
    AND _lookup.type = 1
    AND _lookup.check1 = notes.e_guid
    AND _lookup.check2 = resources.e_guid
    LIMIT 1
  });
  $sthResources->execute($note_e_guid);

  my $sthTags = $dbh->prepare(qq{
    SELECT DISTINCT tags.name  
    FROM tags, notes, _lookup
    WHERE notes.e_guid = ?
    AND _lookup.type = 0
    AND _lookup.check1 = notes.e_guid
    AND _lookup.check2 = tags.e_guid
    ORDER BY tags.name
  });
  $sthTags->execute($note_e_guid);

  while (my ($tagName) = $sthTags->fetchrow_array()) {
    if ($tagName eq '__SHOWMAPS') {
      $showMaps = 1;
    } elsif ($tagName eq '__FIXRATIO') {
      $imageFileSpecs = $imageFileSpecsForcedWidth;
    } elsif ($tagName !~ /_/) {
      $tagLink = lc($tagName);
      $tagLink =~ s/\W+|__/_/g;
      push @tagsFetch, $tagName;
      push @tags, {
        title => $tagName,
        link => $tagLink
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
      $isFragment = 1;
    }
  }

  push @tagsFetch, '_notes_p'.$notesRef;
  $tagsUrl = join(',', @tagsFetch);
  
  #Resources (images & binary files)
  while (my ($resource_title,$rnd,$ext,$resource_longitude,$resource_latitude) = $sthResources->fetchrow_array()) {
    push @resources, {
      title => $resource_title,
      rnd => $rnd,
      ext => $ext,
      longitude => $resource_longitude,
      latitude => $resource_latitude
    };
  }
    
  #Videos
   if ($template ne 'head') {
     if ($text =~ s/http.*vimeo\.com.*?([0-9]+)// || $source_url =~ s/http.*vimeo\.com.*?([0-9]+)//) {
       $vimeoId = $1;
      }
     if ($text =~ s/http.*youtube\.com\/watch\?v\=(\w+)// || $source_url =~ s/http.*youtube\.com\/watch\?v\=(\w+)//) {
       $youtubeId = $1;
     }
     if ($text =~ s/http.*dailymotion\.com\/video\/(\w+?)_// || $source_url =~ s/http.*dailymotion\.com\/video\/(\w+?)_//) {
       $dailymotionId = $1;
     }
   }

  #Text
  $title = sanitiseText($title, 1);
  $title =~ s/ \- Wikipedia\,.*//i;
  $title =~ s/\[.*$//;
  $text = sanitiseText($text, 0);

  if($title ne '' && $title ne 'Note Title' && $title =~ /quote\:/i && $title =~ /untitled/i && $textBriefClean !~ /$title/i){
    $title =~ s/[^\w]$//;
  } elsif (!$isTopic && !$isLink && !$isBook) {
    $title = '';
  }

  if ($text =~ s/capt?i?o?n?\: *(.*?)$//i) {
    $caption = textTruncate($1, 80);
  }

  if ($text =~ s/\[(.*?)\] *$//i) {
    $attribution = textTruncate($1, 80);
  }

  if ($text =~ s/quote\: *(.*?)$//i) {
      $quote = $1;
  }

  if ($isBook) {
     $text =~ /([^:]+): ?(.*?) \((.*?), ([\d]{4})\) ?isbn ?([\w]*)/mi;
     $authorFullName = $1;
     $bookTitle = $2;
     $publisherName = $3;
     $publishedDate = $4;
     $isbn = $5;
     $authorFullName =~ /(.*?), ?(.*?)/;
     $authorSurname = $1;
     $authorFirstName = $2;
  } elsif ($isTopic) {
    use WWW::Wikipedia;
    my $wiki = WWW::Wikipedia->new();
    my $entry = $wiki->search($title);
    $text .= $entry->text_basic();
    $textBriefLinked = textTruncateLink($text, 200, false, "$source_url", 'More');
  }

  $textBriefClean = textTruncate(sanitiseText($text, 1), 350);
  $text =~ s/\n\n/\n/g;
  $text =~ s/\n/<\/p><p>/g;
  $text = "<p class=\"first\">$text</p>";
  $textBriefLinked = textTruncateLink($text, 350, false, "/$location/$noteRef", 'More');
    
  $sthNote->finish();
  $sthResources->finish();
  $sthTags->finish();

  $version = "0.$version";

  $source_url =~ /(http\:\/\/)([^\/]*)(.*)/;
  $source_url_domain = $2;
  $source_url_domain =~ s/^www\.|^en\.//g;
    
  #Process
    use Template;

    my $TTconfig = {
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

        text => $text,
        textBriefClean => $textBriefClean,
        textBriefLinked => $textBriefLinked,
        caption => $caption,
        quote => $quote,
        attribution => $attribution,

        bookTitle => $bookTitle,
        publisherName => $publisherName,
        publishedDate => $publishedDate,
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
        tagsUrl => $tagsUrl
    };
    
    my $TTinput = "notes.item.$template.$templateType.tmpl";

    $TTtemplate->process($TTinput, $TTvars, \$noteoutput) || die $TTtemplate->error();

  return $noteoutput;

}

sub sanitiseText {

  my $text = $_[0];
  my $totally = $_[1];
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
    $text =~ s/<\/div>/<\/div>\n/g;
    $text =~ s/<a /XXaXX/g;
    $text =~ s/<\/a>/YYaYY/g;
    $text =~ s/<ul/XXulXX/g;
    $text =~ s/<\/ul>/YYulYY/g;
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
    $text =~ s/XXliXX/<li/g;
    $text =~ s/YYliYY/<\/li>/g;
    $text =~ s/XXh3XX/<h3/g;
    $text =~ s/YYh3YY/<\/h3>/g;
  }

  #$text =~ s/\n\n/ /g;
  $text =~ s/  / /g;
  $text =~ s/^\s+//;
  $text =~ s/\s+$//;  

  $text =~ s/^\s+|\s+$//g;
#  $text =~ s/^\W+|\W+$//g; #This removes punctuation
  return $text;

}

1;
