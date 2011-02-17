#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$output = qq~(<span title="This page has been clipped 5 times">5</span>)~; 

# ******************************************************************************

cache_output("../../_cache/common--clip_count-$ENV{\"QUERY_STRING\"}.html",$output);
