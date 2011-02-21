#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

$output = qq~(<span title="This page has been shared 5 times">5</span>)~; 

# ******************************************************************************

cache_output("../../cache/common--share_count-$ENV{\"QUERY_STRING\"}.html",$output);
