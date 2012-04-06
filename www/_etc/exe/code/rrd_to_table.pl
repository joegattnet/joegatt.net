#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

# ******************************************************************************
# https://itarch-dev.stanford.edu/confluence/display/MMR/Converting+RRD+to+an+HTML+Table

use RRDs;
use CGI qw/:standard/;

$rrd_dir = '/var/lib/munin/localdomain/';

#
# Get RRD data from the file $rrd for the $cf Consolidation Function
# with resolution $res seconds, for the day up to $end
#
sub getRRData($$$$) {
    my ($rrd, $cf, $res, $end) = @_;

    return RRDs::fetch $rrd, $cf, "--resolution", $res, "--end", $end, "--start", "end-1d";
}

#
# Dump the RRD data as JSON
# start is the start time (Unix time)
# stepsize is the interval between entries (in seconds)
# dsnames is an array of the names of the data sources
# numpoints is the number of entries in the data array
# data is an array of arrays; each array represents the data source values at a point in time
#
sub makeJSON($$$$) {
    my ($start,$step,$names,$data) = @_;
    my $dsnames = '"' . join ('", "', @$names) . '"';
    my $numpoints = $#$data + 1;
    print <<JSON
Content-type: application/json

{
    "start" : ${start}, 
    "stepsize" : ${step},
    "dsnames" :  [ ${dsnames} ],
    "numpoints" : ${numpoints},
    "data": \[
JSON
;
    #
    # map the RRD data into a JSON array of arrays
    #
    foreach my $line (@$data) {
        print "        [" . join(", ", map { (!defined($_) || $_ eq '') ? 'null' : sprintf("%.1f", $_); } @$line) . "],\n";
    }
    print "    \]\n}\n";
}

#
# Dump the RRD as an HTML table
#
sub makeHTML($$$$) {
    my @days = qw(Sun Mon Tue Wed Thu Fri Sat);
    my ($start,$step,$names,$data) = @_;
    my $headers = "<th scope='col'>" . join("</th><th scope='col'>", @$names) . "</th>";

    print <<PAGE_TOP
Content-type: text/html

<html>
    <head>
        <title>Test Data</title>
    </head>
    <body>
        <table>
            <caption>Test Data</caption>
            <thead>
                <tr>
                    <td></td>${headers}
                </tr>
            </thead>
            <tbody>
PAGE_TOP
;
    foreach my $line (@$data) {
        @l = localtime($start);
        $ts = '';
        if ($l[1] == 0 && ($l[2] % 6 == 0)) {
            $ts = $days[$l[6]] . ' ' . $l[2] . ':00';
        }

        #
        # map the RRD data into table rows and columns
        #
        print "                <tr><th scope='row'>${ts}</th><td>"
          . join("</td><td>", map { (!defined($_) || $_ eq '') ? '0.0' : sprintf("%.1f", $_); } @$line)
          . "</td></tr>\n";
        $start += $res;
    }

    printf <<PAGE_END
            </tbody>
        </table>
    </body>
</html>
PAGE_END

}

#
# default to rendering HTML
#
$type = 'html';
$rrd = undef;

#
# Basic content negotiation to switch to JSON
#
$type = 'json'
    if (Accept('application/json') > Accept('text/html'));
	
if (param()) {
    $type = param('type')
    if (param('type') && (param('type') eq 'json' || param('type') eq 'html'));
		
    # only allow bare filenames to be passed in - no path
    if (param('rrd') =~ /\//) {
        print "Content-type: text/plain\n";
        print "Status: 403 FORBIDDEN\n\n";
        print "Naughty, Naughty!\n";
        exit;
    } else {
        $rrd = $rrd_dir . param('rrd') . ".rrd";
    }
}

$cf = "AVERAGE";
$res = 1800;
$ctime = time();
$end = int($ctime/$res)*$res;

my ($start, $step, $names, $data) = getRRData($rrd, $cf, $res, $end);
if ($type eq 'json') {
    makeJSON($start, $step, $names, $data);
} else {
    makeHTML($start, $step, $names, $data);
}
