#!/usr/bin/perl -T

require '../basics.pl';

$b = 1;
$enWutzLettersOnlyLength = 86593;

formRead("get");

@heads = ('Letter','DE','EN','EN Wutz');

@alphabet = split(//, 'abcdefghijklmnopqrstuvwxyz');

# http://en.wikipedia.org/wiki/Letter_frequency

$dbh = connectDB();

#DE Frequency ******************************************************************

  $sql = "SELECT text FROM source_text WHERE book_id=?";
  my $sth = $dbh->prepare("$sql");
  $sth->execute($b);
  
  while (my $text = $sth->fetchrow_array()) {
    $source_text .= "$text";
  }
  $sth->finish();
  
  $source_text = DEnormalize($source_text);
  $source_text = "\L$source_text\E";
  $source_text =~ s/[^a-z]//g;
  $source_text_length = length($source_text);
  
  #We can get the count from character_count (p=0)
  #And skip this step
  @character_source_text = split(//,$source_text);
  
  foreach $character (@character_source_text) {
  	$source_counter{$character}++;
  }
  
  foreach $character (sort keys %source_counter) {
  	push(@deFrequency, ($source_counter{$character} * 100) / $source_text_length);
  }

#EN Frequency ******************************************************************

  $sql = "SELECT text FROM target_text WHERE book_id=? AND version = 1";
  my $sth = $dbh->prepare("$sql");
  $sth->execute($b);
  
  while (my $text = $sth->fetchrow_array()) {
    $target_text .= "$text";
  }
  $sth->finish();
  
  $target_text = DEnormalize($target_text);
  $target_text = "\L$target_text\E";
  $target_text =~ s/[^a-z]//g;
  $target_text_length = length($target_text);
  
  @character_target_text = split(//,$target_text);
  
  foreach $character (@character_target_text) {
  	$target_counter{$character}++;
  }
  
  foreach $character (sort keys %target_counter) {
  	push(@enFrequency, ($target_counter{$character} * 100) / $target_text_length);
  }
  
#*******************************************************************************

$enWutzLettersOnlyLength = $target_text_length;
# Here we use the length of version 1 - not strictly correct but the difference 
# should be negligible

$sth = $dbh->prepare(qq{
  SELECT label,
  ROUND((SUM(count) * 100 / ?),2)
  FROM character_count 
  WHERE book_id = ? AND p > 0 
  AND label NOT IN ('0','1','2','3','4','5','6','7','8','9') 
  GROUP BY label
});

$sth->execute($enWutzLettersOnlyLength, $b);

$count = 0;
while (my ($letter, $percentage) = $sth->fetchrow_array()) {
  @row = ($alphabet[$count], (sprintf "%.2f",$deFrequency[$count]), (sprintf "%.2f", $enFrequency[$count]), (sprintf "%.2f", $percentage));
  push( @{$rows[$count] }, @row);
  $count++;
}

$sth->finish();
$dbh->disconnect();

use Template;

my $TTconfig = {
    ENCODING => 'utf8',
    INCLUDE_PATH => '../../templates',
    POST_CHOMP   => 1
};

my $TTtemplate = Template->new($TTconfig);

my $TTvars = {
    heads => \@heads,
    rows => \@rows
};

my $TTinput = "table.tmpl";

$TTtemplate->process($TTinput, $TTvars, \$output) || die $TTtemplate->error();

cache_output("../../cache/enface--stats_character_counts-b=$b.html",$output);
