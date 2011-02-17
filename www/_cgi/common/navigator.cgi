#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

  if ($p !~ /[0-9]+/){
      $p = 1;
  }


print ("Content-Type: text/html; charset=UTF-8\n\n");

$pChunk = 'paragraph'; # or page

$previous = $p-1;
if ($previous<1) {
  $previous = 1;
}
$next = $p+1;
if ($next>$p_max) {
  $next = $p_max;
}

if ($id ne '') {
  $idString = qq~ id="$id"~; 
}

# removed to avoid prefetching
#  			 <li class="nav-li al_right"><a href="$next" rel="next" class="refresh_ignore next" title="Next $pChunk">Next $pChunk</a></li>

my $output = qq~
  <div$idString class="navigator by-$pChunk clearfix">
    <div>
  			<ul class="nav_h">
    			 <li class="nav-li"><a href="1" rel="first" class="first" title="First $pChunk">First $pChunk</a></li>
    			 <li class="nav-li"><a href="$previous" rel="prev" class="previous" title="Previous $pChunk">Previous $pChunk</a></li>
           ~;
           if($goto ne 'false'){
             $output .= qq~
              <li class="nav-li li-info"><form><input type="text" class="goto" value="$p" name="p"/></form></li>
    			   ~;
           }
           $output .= qq~
              <li class="nav-li al_right"><a href="$next" class="next" title="Next $pChunk">Next $pChunk</a></li>
           ~;
           if($pagefull ne 'false'){
             $output .= qq~
              <li><a href="$nextPage" class="next_page" rel="$nextPage" title="Next page">Next page</a></li>
    			   ~;
           }
           $output .= qq~
    			 <li class="nav-li al_right"><a href="$p_max" rel="last" class="last" title="Last $pChunk">Last $pChunk</a></li>
        </ul>
    </div>
  </div>
~;

#*******************************************************************************

cache_output("../../_cache/common--navigator-".$ENV{"QUERY_STRING"}.".html",$output);
