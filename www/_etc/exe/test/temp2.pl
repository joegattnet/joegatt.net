#!/usr/bin/perl -T

require '../basics.pl';

#formRead("get");

#/var/log/apache2 needs to be chmod rwxr-xr-x
#/var/log/apache2/access.log and error.log needs to be rw-r--r--

print ("Content-Type: text/html; charset=UTF-8\n\n");

print qq~EHE!!!<style>p {font-family:arial;font-size:12px}</style>~;

$accessFile = "/var/log/apache2/access.log";
$accessFile = untaint($accessFile);

open (LOGFILE, "<$accessFile") or die warn "Can't open $accessFile: $! .\n";
my @logs = <LOGFILE>;
close (LOGFILE);

#@foo = grep(!/^#/, @bar); - to show only for this user

@logs = reverse(@logs);
@logs = splice(@logs, 0, 100);

foreach $line (@logs){
  print "<p>$line</p>";
}

print "<hr>";

$errorFile = "/var/log/apache2/error.log";
$errorFile = untaint($errorFile);

open (LOGFILE, "<$errorFile") or die warn "Can't open $errorFile: $! .\n";
my @logs = <LOGFILE>;
close (LOGFILE);

#@foo = grep(!/^#/, @bar); - to show only for this user

@logs = reverse(@logs);
@logs = splice(@logs, 0, 100);

foreach $line (@logs){
  print "<p>$line</p>";
}
