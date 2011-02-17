#!/usr/bin/perl -T

require '../basics.cgi';

print ("Content-Type: text/html; charset=UTF-8\n\n");

print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" media="all" href="${root}_css/src/Admin.css" />
</head>
<body class="admin">
<h2>Error log @
~;

#Send this to basics and re-use
@months = qw/Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec/;
@days = qw/Sun Mon Tue Wed Thu Fri Sat/;

($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)=localtime(time);

print "$days[$wday] $months[$mon]";
printf " %02d %02d:%02d:%02d %4d ",$mday,$hour,$min,$sec,$year+1900;

print qq~
</h2>
~;

$logfile = "/var/log/apache2/error-dev.log";

  open (ERRORLOG, untaint($logfile)) or die print "Can't open $f : $!";
  my @lines = <ERRORLOG>;
  @lines = reverse(@lines);
  splice(@lines,10);
  foreach $line (@lines) {
    $line =~ s/(\] \[)/<span style="color:gray">|<\/span>/g;
    $line =~ s/(\[|\])//g;
    print "<p>$line</p>";
  }
  close (ERRORLOG);

print qq~
</body>
</html>
~;
