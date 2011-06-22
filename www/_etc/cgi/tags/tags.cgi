#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

@all_tags = split(/\,/, $tags);
@tags = grep(!/^\_/, @all_tags);
@tags = sort(@tags);

$tagsCount = $#tags + 1;

#if($tagsCount > 0){
  $output = qq~
    <h4><a href="/tags/">Tags</a> <span id="tags_count">($tagsCount)</span></h4>
    <ul id="n_tags" class="nav_h tags" href="">
  ~;
  
  foreach $tag (@tags){
    $tagLink = tagLinkify($tag);
    $count++;
    $output .= qq~
      <li><a href="/tags/$tagLink" rel="tag">$tag</a></li>
    ~;
  }
  
  $output .= qq~</ul>~;
#}

# ******************************************************************************

cache_output("../../cache/tags--tags-$ENV{\"QUERY_STRING\"}.html",$output);
