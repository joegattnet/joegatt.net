#!/usr/bin/perl -T

my $r = rand();

opendir(DIR, "../../../_assets/js/lib/");
@lib = grep(/^[0-9a-zE\.\-]*\.js$/,readdir(DIR));
closedir(DIR);

@lib = sort(@lib);

opendir(DIR, "../../../_assets/js/src/");
@src = grep(/^[0-9a-z\.\-_]*\.js$/,readdir(DIR));
closedir(DIR);

@src = sort(@src);

print ("Content-Type: text/html; charset=UTF-8\n\n");

foreach $lib (@lib) {
print qq~<script type="text/javascript" src="/_assets/js/lib/$lib?r=$r"></script>
~;
}

foreach $src (@src) {
print qq~<script type="text/javascript" src="/_assets/js/src/$src?r=$r"></script>
~;
}

print qq~<!--

<!--
~;

foreach $lib (@lib) {
print qq~   '/_assets/js/lib/$lib',
~;
}

foreach $src (@src) {
print qq~   '/_assets/js/src/$src',
~;
}

print qq~

-->~;
