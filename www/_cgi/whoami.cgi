#!/usr/bin/perl -T

print ("Content-Type: text/html; charset=UTF-8\n\n");

foreach my $key (sort(keys(%ENV))) {
    print "$key = $ENV{$key}<br>\n";
}

#/var/repos/nembrot/_instances/_joegatt-net/_developers/_joegatt/_dropbox/www/_cgi
