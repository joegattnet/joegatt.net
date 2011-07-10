#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

if ($p !~ /[0-9]+/){
    $p = 1;
}

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

$path = "/$section/";
if($page ne 'index'){
  $path .= "$page/";
}

my $output = qq~
  <div$idString class="navigator by-$pChunk clearfix">
    <div>
  			<ul class="nav_h">
    			 <li class="nav-li"><a href="${path}1" rel="first" class="first" title="First $pChunk">First $pChunk</a></li>
    			 <li class="nav-li"><a href="${path}$previous" rel="prev" class="previous" title="Previous $pChunk">Previous $pChunk</a></li>
           ~;
           if($goto ne 'false'){
             $output .= qq~
              <li class="nav-li li-info"><form><input type="text" class="goto" value="$p" name="p"/></form></li>
    			   ~;
           }
           $output .= qq~
              <li class="nav-li al_right"><a href="${path}$next" class="next" title="Next $pChunk">Next $pChunk</a></li>
           ~;
           if($pagefull ne 'false'){
             $output .= qq~
              <li><a href="${path}$nextPage" class="next_page" rel="$nextPage" title="Next page">Next page</a></li>
    			   ~;
           }
           $output .= qq~
    			 <li class="nav-li al_right"><a href="${path}$p_max" rel="last" class="last" title="Last $pChunk">Last $pChunk</a></li>
        </ul>
    </div>
  </div>
~;

#*******************************************************************************

cache_output("../../cache/common--navigator-".$ENV{"QUERY_STRING"}.".html",$output);
