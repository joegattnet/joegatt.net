#!/usr/bin/perl -T

require '../basics.pl';

#formRead("get");

#/var/log/apache2 needs to be chmod rwxr-xr-x
#/var/log/apache2/access.log and error.log needs to be rw-r--r--

print ("Content-Type: text/html; charset=UTF-8\n\n");

print qq~<style>p {font-family:arial;font-size:12px}</style>~;

open (LOGFILE, "<$errorFile") or die print "Can't open $errorFile: $! .\n";
my @logs = <LOGFILE>;
close (LOGFILE);

#@foo = grep(!/^#/, @bar); - to show only for this user

@logs = reverse(@logs);
@logs = splice(@logs, 0, 100);

foreach $line (@logs){
  print "<p>$line</p>";
}
