#!/usr/bin/perl -T

require '../_basics.cgi';

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
if ($next>$p_count) {
  $next = $p_count;
}

# removed to avoid prefetching
#  			 <li class="nav-li al_right"><a href="$next" rel="next" class="refresh_ignore next" title="Next $pChunk">Next $pChunk</a></li>

my $output = qq~
<div class="navigator by-$pChunk clearfix">
  <div>
			<ul class="nav_h">
  			 <li class="nav-li"><a href="1" rel="start" class="refresh_ignore first" title="First $pChunk">First $pChunk</a></li>
  			 <li class="nav-li"><a href="$previous" rel="prev" class="refresh_ignore previous" title="Previous $pChunk">Previous $pChunk</a></li>
         <li class="nav-li li-info"><form><input type="text" class="info goto" value="$p" name="p"/></form></li>
  			 <li class="nav-li al_right"><a href="$next" class="refresh_ignore next" title="Next $pChunk">Next $pChunk</a></li>
  			 <li class="nav-li al_right"><a href="$p_count" rel="last" class="refresh_ignore last" title="Last $pChunk">Last $pChunk</a></li>
      </ul>
  </div>
</div>
~;

print $output;