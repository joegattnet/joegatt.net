#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");
print ("Content-Type: text/html\n\n");
print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" media="all" href="${root}_assets/css/src/0.Admin.css" />
</head>
<body class="admin">
<h2>Calculate anagram</h2>
~;

$dbh = connectDB();

# calculate letter count of source
# only an aggregate is stored
# ******************************************************************************

if ($mode eq 'all' or $mode eq 'source') {

  $sql = "SELECT text FROM source_text WHERE book_id=?";
  my $sth = $dbh->prepare("$sql");
  $sth->execute($b);
  
  while (my $text = $sth->fetchrow_array()) {
    $source_text .= "$text";
  }
  
  
  $source_text = DEnormalize($source_text);
  $source_text =~ s/\W//g;
  $source_text = "\L$source_text\E";
  
  @character_source_text = split(//,$source_text);
  
  foreach $character (@character_source_text) {
  	$source_counter{$character}++;
  }
  
  foreach $character (keys %source_counter) {
  	push(@values, "($b,0,'$character',-$source_counter{$character})");
  }
  
  $values_string = join(',', @values);
  
  $sql = "REPLACE INTO character_count (book_id,p,label,count) VALUES $values_string;";
  
  my $sth = $dbh->prepare("$sql");
  $sth->execute();
  

  print "<p>Source text (id $b) counted.</p>";

}

# calculate letter count of target
# ******************************************************************************

if ($mode eq 'all' or $mode eq 'target') {

# MySQL 4.0 (as used by FutureQuest) does not support subqueries so we have to do two queries

$sql = "SELECT MAX(date_created) AS latest,p FROM target_text GROUP BY p";
my $sth = $dbh->prepare("$sql");
$sth->execute();

while (my ($latest) = $sth->fetchrow_array()) {
	 push(@dates,"'$latest'");
}

$allDates = join(",", @dates);

$sql = "SELECT target_text.text AS target,target_text.p FROM source_text,target_text,users WHERE users.Id=target_text.user_id AND target_text.date_created IN ($allDates) AND source_text.book_id=$b AND target_text.book_id=$b AND source_text.p=target_text.p GROUP BY p ORDER BY p";
#  $sql = "SELECT target_text.text,target_text.p FROM ($allDates) X LEFT JOIN target_text ON date_created=latest AND x.p=target_text.p WHERE target_text.book_id=$b GROUP BY p;";
  my $sth = $dbh->prepare("$sql");
  $sth->execute() or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";
  
  while (my ($text,$p) = $sth->fetchrow_array()) {
    $target_text = "$text";

    $target_text = DEnormalize($target_text);
    $target_text =~ s/\W//g;
    $target_text = "\L$target_text\E";
    
    @character_target_text = split(//,$target_text);
    
		undef %target_counter;
    foreach $character (@character_target_text) {
    	$target_counter{$character}++;
    }
    
    foreach $character (keys %target_counter) {
    	push(@values, "($b,$p,'$character',$target_counter{$character})");
    }
		
  }
  
  
  $values_string = join(',', @values);
  
  $sql = "REPLACE INTO character_count (book_id,p,label,count) VALUES $values_string;";
  
  my $sth = $dbh->prepare("$sql");
  $sth->execute();
	
  
  print "<p>Target text (id $b) counted.</p><body></html>";

}

# ******************************************************************************

$dbh->disconnect();

