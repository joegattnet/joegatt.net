#!/usr/bin/perl -T

my $r = rand();

opendir(DIR, "../../../_assets/css/lib/");
@lib = grep(/^[0-9a-z_]*\.css$/,readdir(DIR));
closedir(DIR);

@lib = sort(@lib);

opendir(DIR, "../../../_assets/css/src/");
@src = grep(/^[0-9a-z_]*\.css$/,readdir(DIR));
closedir(DIR);

@src = sort(@src);

print ("Content-Type: text/html; charset=UTF-8\n\n");

foreach $lib (@lib) {
print qq~<link rel="stylesheet" type="text/css" media="all" href="/_assets/css/lib/$lib?r=$r" />
~;
}

foreach $src (@src) {
print qq~<link rel="stylesheet" type="text/css" media="all" href="/_assets/css/src/$src?r=$r" />
~;
}

print qq~<!--
~;

foreach $lib (@lib) {
print qq~   '../../../_assets/css/lib/$lib',
~;
}

foreach $src (@src) {
print qq~   '../../../_assets/css/src/$src',
~;
}

print qq~
-->~;
