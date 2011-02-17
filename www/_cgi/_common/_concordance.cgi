#!/usr/bin/perl -T

require '../_basics.cgi';

$min = 2;
$max = 40;
$query = '';

formRead("get");

print ("Content-Type: text/html; charset=UTF-8\n\n");

# See
# http://code.google.com/apis/visualization/documentation/examples.html#tablequerywrapper

# Get data as json from API as recommended there
# Also do search for word (& search) - words in concordance are linkable - will need to adjust setting up paras

# ******************************************************************************
# ******************************************************************************
$sequence = 1;
$b = 1;
$collate = 82;

my $dbh = connectDB();

$sql = "SELECT MAX(date_created) AS latest FROM target_text WHERE sequence>=? AND book_id=? GROUP BY sequence LIMIT ?";
my $sth = $dbh->prepare("$sql");
$sth->execute($sequence, $b, $collate);

while (my ($latest) = $sth->fetchrow_array()) {
	 push(@dates,"'$latest'");
}

$allDates = join(",", @dates);

my $sth = $dbh->prepare(qq{
  SELECT target_text.text AS target  
  FROM target_text 
  WHERE target_text.book_id=? AND target_text.date_created IN ($allDates) 
  GROUP BY sequence 
});

$sth->execute($b);

my $showPage = 0;

while (my ($target) = $sth->fetchrow_array()) {
  $textENstring .= $target;
}

$sth->finish();
$dbh->disconnect();

# ******************************************************************************
# ******************************************************************************

$textENstring = cleanWordsOnly("\L$textENstring\E");

$textENstring =~ s/  / /g;
my @textwords = split(/ /,$textENstring);

#use Lingua::Stem;
#my $stemmer = Lingua::Stem->new(-locale => 'EN-UK');
#$stemmer->stem_caching({ -level => 2 });
#my $textwords = $stemmer->stem(@textwords);
#$textENstring = join(' ',@textwords);

my %seen; # lookup table

# build lookup table
@seen{@textwords} = ();

%seen = ();
@unique = grep { ! $seen{$_} ++ } @textwords;

@unique = sort(@unique);

$rowNumber = 0;
foreach $word (@unique) {
  #$tempScore = getWordScore($word);
  @thisFrequency = $textENstring =~ /\b$word\b/g;
  $wordFrequency = $#thisFrequency + 1;
#  $cumulative = $tempScore * $wordFrequency;
#  $totalCumulative += $cumulative;
#  $sortstring = 500000 + $cumulative;
#  push (@rows, "<li class=\"n-$wordFrequency\">$word <span style=\"float:right\">$wordFrequency</span></li>");
#  $word = "<a href='-' onclick='-'>$word</a>";
  if($word =~ m/$query/i && $wordFrequency>=$min && $wordFrequency<=$max){
    push (@rows, "data.setCell($rowNumber,0,'$word');data.setCell($rowNumber,1,$wordFrequency);");
    $rowNumber++;
  }
}

$tableSize = $rowNumber;

@rows = sort(@rows);

# ******************************************************************************
# ******************************************************************************

  print qq~
    <li id="concordance_handle" class="header"><a href="javascript:;">Concordance</a></li>
    <li id="concordance">
      <form id="concordanceform">
        <fieldset> 
          <input type="text" name="min" style="width:15%;text-align:center;float:left;" value="$min" onchange="this.form.submit();" />
          <input type="text" name="query" style="width:50%;float:left;" value="$query" onchange="this.form.submit();" />
          <input type="text" name="max" style="width:15%;text-align:center;float:left;" value="$max" onchange="this.form.submit();" />
        </fieldset>
        <input type="submit" />
      </form>
      <ul style="width:50%">
      <li>
        <div id="table_div"></div>
      
    <script type='text/javascript' src='http://www.google.com/jsapi'></script>
    <script type='text/javascript'>
      google.load('visualization', '1', {packages:['table']});
      google.setOnLoadCallback(drawTable);
      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Word');
        data.addColumn('number', 'Freq');
        data.addRows($tableSize);
  ~;

foreach $row (@rows) {
  print $row;
}


  print qq~
  var cssClassNames = {
    'headerRow': 'italic-darkblue-font large-font bold-font',
    'tableRow': '',
    'oddTableRow': 'beige-background',
    'selectedTableRow': 'orange-background large-font',
    'hoverTableRow': '',
    'headerCell': 'gold-border',
    'tableCell': '',
    'rowNumberCell': 'underline-blue-font'};

        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, {'showRowNumber': false, 'page': 'enable', 'pageSize': 20, 'allowHtml': true, 'cssClassNames': cssClassNames});
      }
    </script>
  ~;
  
  print qq~
        </li>
      </ul>
  </li>
  ~;

#debug_info();

# ******************************************************************************

sub cleanWordsOnly {
  my $text = $_[0];
  $text =~ s/[^a-z^A-Z]|\'s | \'|\' / /gi;
  return $text;
}
