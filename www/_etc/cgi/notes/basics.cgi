#!/usr/bin/perl -T

sub printNote {

  my $note_e_guid = $_[0];
  my $template = $_[1];
  my $images = "";
  my $video = "";
  my $tags_limit = 5;

  my $noteRef = hex(substr($note_e_guid,0,4));

  if ($template eq 'standalone'){
    $imageFileSpecs = "16_9-wb-6-0-0-0";
    $vimeoWidth = 460;
    $vimeoHeight= 260;
    $youtubeWidth = 460;
    $youtubeHeight = 346;
    $truncateAt = 0;
  } elsif ($template eq 'fragment'){
    $imageFileSpecs = "16_9-wb-6-0-0-0";
    $vimeoWidth = 460;
    $vimeoHeight= 260;
    $youtubeWidth = 460;
    $youtubeHeight = 346;
    $truncateAt = 0;
  } elsif ($template eq 'compact'){
    $imageFileSpecs = "16_9-wb-3-0-0-0";
    $vimeoWidth = 220;
    $vimeoHeight= 120;
    $youtubeWidth = 220;
    $youtubeHeight = 165;
    $truncateAt = 300;
  } else {
    $imageFileSpecs = "16_9-wb-3-0-0-0";
    $vimeoWidth = 300;
    $vimeoHeight= 168;
    $youtubeWidth = 300;
    $youtubeHeight = 200;
    $truncateAt = 750;
  }

  my $sthNote = $dbh->prepare(qq{
    SELECT DISTINCT Id,(SELECT COUNT(*) FROM notes WHERE e_guid=?) AS version,title,text,source,source_url,longitude,latitude,DATE_FORMAT(date_modified,'%Y-%m-%dT%H:%i:%sZ'),DATE_FORMAT(date_modified,'%e %b %Y at %H:%i UTC') 
    FROM notes
    WHERE e_guid = ? 
    ORDER BY date_modified DESC
    LIMIT 1
  });
  $sthNote->execute($note_e_guid,$note_e_guid);
  my ($Id,$version,$title,$text,$source,$source_url,$note_longitude,$note_latitude,$date_iso8601,$date_full) = $sthNote->fetchrow_array();
  
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

  #IF MORE THAN 1 IMAGE EXISTS, PREPARE FOR SLIDESHOW

  my $sthTags = $dbh->prepare(qq{
    SELECT DISTINCT tags.name
    FROM tags, notes, _lookup
    WHERE notes.e_guid = ?
    AND _lookup.type = 0
    AND NOT tags.name LIKE '\\_%'
    AND _lookup.check1 = notes.e_guid
    AND _lookup.check2 = tags.e_guid
    ORDER BY tags.name
    LIMIT ?
  });
  $sthTags->execute($note_e_guid,$tags_limit);

  my $sthInstructionTags = $dbh->prepare(qq{
    SELECT DISTINCT tags.name
    FROM tags, notes, _lookup
    WHERE notes.e_guid = ?
    AND _lookup.type = 0
    AND tags.name LIKE '\\_%'
    AND _lookup.check1 = notes.e_guid
    AND _lookup.check2 = tags.e_guid
  });
  $sthInstructionTags->execute($note_e_guid);

  while (my ($tag_name) = $sthInstructionTags->fetchrow_array()) {
    if($tag_name eq '__SHOWMAPS'){
      $show_maps = 1;
    }
  }
  
  # Resources (images & binary files) ******************************************
  
  while (my ($resource_title,$rnd,$ext,$resource_longitude,$resource_latitude) = $sthResources->fetchrow_array()) {
    $imageFileLocation = "../../_etc/resources/cut/$resource_title-$rnd-$imageFileSpecs.$ext";
    $imageFileLocationFull = $imageFileLocation;
    $imageFileLocationFull =~ s/wb\-[0-9]+\-/wb-12-/;
    
    $images = qq~<a href="$imageFileLocationFull"><img src="$imageFileLocation"></a>~;
     
    if ($show_maps && ($resource_longitude != 0 && $resource_latitude != 0)){
      $resource_lat_lang = qq~
          var resource_latlng = new google.maps.LatLng($resource_latitude, $resource_longitude);
      ~;
      $resource_map_marker = qq~
          resource_marker = new google.maps.Marker({
            map:map,
            draggable:false,
            clickable:false,
            title:'Image',
            position: resource_latlng
          });
        bounds.extend(resource_latlng);
        map.fitBounds(bounds);
      ~;
      $resource_geo_tag = qq~
        <div class="geo">
         <span class="latitude">$resource_latitude</span>,  
         <span class="longitude">$resource_longitude</span>
        </div>
      ~;
      $map_center = 'resource_latlng';
     }      
  }

  # Video **********************************************************************

   if ($text=~s/http.*vimeo\.com.*?([0-9]+)// || $source_url=~s/http.*vimeo\.com.*?([0-9]+)//) {
     #This is buggy: http://vimeo.com/forums/topic:28447#comment_3658475 to check whether it's been resolved
     #$video .= qq~
     #  <iframe src="http://player.vimeo.com/video/$1?title=0&amp;byline=0&amp;color=c9ff23" width="$vimeoWidth" height="$vimeoHeight"></iframe>
     #~;
     $video .= qq~
      <object width="$vimeoWidth" height="$vimeoHeight">
        <param name="allowfullscreen" value="true" />
        <param name="allowscriptaccess" value="always" />
        <param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=$1&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=ffffff&amp;fullscreen=1" />
        <embed src="http://vimeo.com/moogaloop.swf?clip_id=$1&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=ffffff&amp;fullscreen=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="$vimeoWidth" height="$vimeoHeight"></embed>
      </object>
     ~;
    }
   if ($text=~s/http.*youtube\.com\/watch\?v\=(\w+)// || $source_url=~s/http.*youtube\.com\/watch\?v\=(\w+)//) {
     $video .= qq~
      <iframe title="YouTube video player" class="youtube-player" type="text/html" width="$youtubeWidth" height="$youtubeHeight" src="http://www.youtube.com/embed/$1?hd=1"></iframe>
     ~;
   }

  # Map ************************************************************************

  if ($show_maps && ($note_longitude != 0 && $note_latitude != 0)){
    $note_lat_lang = qq~
        var note_latlng = new google.maps.LatLng($note_latitude, $note_longitude);
    ~;
    $note_map_marker = qq~
        note_marker = new google.maps.Marker({
          map:map,
          draggable:false,
          clickable:false,
          title:'Note',
          position: note_latlng
        });
        bounds.extend(note_latlng);
        map.fitBounds(bounds);
     ~;
    $note_geo_tag = qq~
      <div class="geo">
       <span class="latitude">$note_latitude</span>,  
       <span class="longitude">$note_longitude</span>
      </div>
    ~;
    $map_center = 'note_latlng';
   }
    
  if ($note_lat_lang ne '' || $resource_lat_lang ne '') {
    $map = qq~
      <div id="map" class="wb-4-16_9"><!-- --></div>
      <script type="text/javascript">
        $note_lat_lang
        $resource_lat_lang
        var myOptions = {
          zoom: 14,
          center: $map_center,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        var bounds = new google.maps.LatLngBounds();
        $note_map_marker
        $resource_map_marker
        $map_extend
      </script>
      $note_geo_tag
      $resource_geo_tag
    ~;
  }

  # Text & Title ***************************************************************

  #HTML::Strip does not allow exceptions
  $text =~ s/\&nbsp\;/ /g;
  $text =~ s/style=\"[^\"]*\"//g;
  $text =~ s/<a /XXaXX/g;
  $text =~ s/<\/a>/YYaYY/g;

  use HTML::Strip;
  my $hs = HTML::Strip->new();
  $text = $hs->parse($text);
  $hs->eof;  
  $text =~ s/  / /g;
  $text =~ s/\n\n/\n/g;
  $text =~ s/^\s+//;
  $text =~ s/\s+$//;

  #HTML::Strip does not allow exceptions
  $text =~ s/XXaXX/<a /g;
  $text =~ s/YYaYY/<\/a>/g;

  $text =~ s/^\s+|\s+$//g;
#  $text =~ s/^\W+|\W+$//g; #This removes punctuation

  if ($text =~ s/capt?i?o?n?\: *(.*?)$//i) {
    $caption = "<p class=\"caption\">$1</p>";
  }

  if($truncateAt != 0) {
   $text = textTruncateLink($text,$truncateAt,false,"/notes/$noteRef",'More');
  }

  $text =~ s/\n/<\/p><p>/g;
  $text = "<p class=\"first\">$text</p>";
  
  if($title ne '' && $title ne 'Note Title' && $title ne 'Untitled Note' && $text !~ /$title/i){
    $title =~ s/[^\w]$//;
    if($mode eq 'standalone'){
     $pageTitle = "<h3 class=\"inserted\" rel=\"subtitle\">$title</h3>";
    } else {
     $pageTitle = "";
     $text = "<h6><a href=\"/notes/$noteRef\">$title</a></h6>$text";
    }
  }
  
  $tagsFound = "";
  $started = 0;
  
  # Meta ***********************************************************************

  while (my ($tag_title) = $sthTags->fetchrow_array()) {
    if($started == 1){
      $tagsUrl .= ',';
    }
    $tagLink = lc($tag_title);
    $tagLink =~ s/ /_/g;
    $tagsFound .= qq~<li><a href="/tags/$tagLink">$tag_title</a></li>~;
    $tagsUrl .= $tag_title;
    $started = 1;
  }   
     
	 $meta = qq~      
        <ul class="meta nav_h"><li><a href=\"/notes/$noteRef\">#$noteRef</a></li>$tagsFound</ul>
     ~;
    
    $sthResources->finish();
    $sthTags->finish();

  # Output *********************************************************************
    
    if ($template eq 'standalone'){
      $note_output = qq~
        $pageTitle
        <div class="grid_5 alpha">
          <div class="text">
            $text
          </div>
          <div id="versions" class="meta">
            <p>Version $version (<abbr class="timeago" title="$date_iso8601">$date_full</abbr>)</p>
          </div>
          <div class="apparatus">
            <!--#include virtual="../../_etc/layouts/apparatus_left.shtml" -->
          </div>
        </div>
        <div class="grid_5 prefix_1 suffix_1 omega">
          $images
          $map
          $caption
          $video
          <div class="apparatus">
            <div id="tags">
              <!--#include virtual="../../_etc/cache/tags--tags-tags=$tagsUrl.html" -->
            </div>
            <div id="notes" class="grid_5 alpha omega">
              <!--#include virtual="../../_etc/cache/notes--list-tags=$tagsUrl&exclude=$noteRef.html" -->
            </div>
          </div>
        </div>
      ~;
    } elsif($template eq 'fragment') {
      if(!$textonly){
        $note_output = qq~
          $images
          $video
        ~;
      }
      $note_output .= qq~
        $text
      ~;
    } elsif($template eq 'compact') {
      $note_output = qq~
        $images
        $video
        $text
        $meta  
      ~;
    } else {
      $note_output = qq~
        $images
        $video
        $text
        $meta  
      ~;
    }
    
  return $note_output;

}

1;
