#!/usr/bin/perl -T

require '../_basics.cgi';

formRead("get");

print ("Content-Type: text/html\n\n");

open (VERSION, "../../_admin/_includes/version.txt");
my @lines = <VERSION>;
$version = "@lines";
$version =~ s/\n//g;
close (VERSION);

open (VERSION, "../../../__live/_admin/_includes/version.txt");
my @lines = <VERSION>;
$liveversion = "@lines";
$liveversion =~ s/\n//g;
close (VERSION);

open (VERSION, "../../../__test/_admin/_includes/version.txt");
my @lines = <VERSION>;
$testversion = "@lines";
$testversion =~ s/\n//g;
close (VERSION);

open (VERSION, "../../../__previous/_admin/_includes/version.txt");
my @lines = <VERSION>;
$previousversion = "@lines";
$previousversion =~ s/\n//g;
close (VERSION);


$nextversion = $version + 1;

print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" media="all" href="${root}_css/jg_admin.css" />
</head>
<body class="admin">
<h2>Deploy</h2>
~;

if ($serverName ne 'localhost' and $serverName ne 'admin.joegatt.net') {
  print qq~
  <p class='neg'>Deploy can only be used from <a href='http://admin.joegatt.net/__dev/_admin/' target='_top'>admin.joegatt.net</a></p>.
  ~;
} else {

  print qq~
  <p>Current dev version: $version.</p>
  <p>Current test version: $testversion.</p>
  <p>Current live version: $liveversion.</p>
  <p>Current previous version: $previousversion.</p>
  ~;
  
  ($second, $minute, $hour, $dayOfMonth, $month, $yearOffset, $dayOfWeek, $dayOfYear, $daylightSavings) = localtime();
  $year = 1900 + $yearOffset;
  $timestamp = "$hour$minute$second-$dayOfMonth.$month.$year";
  $time = "$hour:$minute:$second";
  
  if ($mode eq 'test') {
    use File::Copy::Recursive qw(dircopy);
    #delete test?
    my $numoffiles = dircopy('../../../__dev','../../../__test');
    open (VERSION, ">../../_admin/_includes/version.txt");
    print VERSION $nextversion;
    close (VERSION);
  # This doesn't work for some reason
  #  rename("../../$version","../../$nextversion");
    print qq~
      <p>Deployed $numoffiles files to <a href="http://test.joegatt.net" target="_blank">test.joegatt.net</a> at $time.</p>
      <p>New dev version: $nextversion.</p>
    ~;
  } elsif ($mode eq 'live') {
    ($second, $minute, $hour, $dayOfMonth, $month, $yearOffset, $dayOfWeek, $dayOfYear, $daylightSavings) = localtime();
    $year = 1900 + $yearOffset;
    $timestamp = "$hour$minute$second-$dayOfMonth.$month.$year";
    use File::Copy;
    move('../../../__previous',"../../../__archive_$timestamp") or die print "<p class='neg'>Can't move previous to archive</p>";
    move('../../../__live','../../../__previous') or die print "<p class='neg'>Can't move live to previous</p>";
    move('../../../__test','../../../__live') or die print "<p class='neg'>Can't move test to live</p>";
    my $numoffiles = dircopy('../../../__dev','../../../__test');
    print qq~
      <p>Deployed site v$version to <a href="http://joegatt.net" target="_blank">joegatt.net</a> at $time.</p>
    ~;
  } elsif ($mode eq 'rollback') {
    move('../../../__live',"../../../__live_rolled_back_$timestamp");
    move('../../../__previous','../../../__live');
    my $numoffiles = dircopy('../../../__live','../../../__previous');
    print qq~
      <p>Rolled back <a href="http://joegatt.net" target="_blank">joegatt.net</a> to v$version at $time.</p>
    ~;
  } else {
    print qq~
      <p>Nothing deployed.</p>
    ~;
  }
  
  print qq~
  <form method="get">
    <label for="test"><input type="radio" name="mode" value="test" id="test"> dev => test</label><br/>
    <label for="live"><input type="radio" name="mode" value="live" id="live"> test = > live</label><br/>
    <label for="rollback"><input type="radio" name="mode" value="rollback" id="rollback"> previous => live (roll back)</label><br/>
    <br />
    <input type="submit" value="Deploy" />  
  </form>
  ~;
}

print qq~
</body></html>
~;
