#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");
print ("Content-Type: text/html; charset=UTF-8\n\n");
print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" media="all" href="${root}_etc/css/src/0.Admin.css" />
</head>
<body class="admin">
<h2>Collate paragraphs</h2>
~;

$charactersPerPage = $wordsPerPage * 5;

$sql = "SELECT Id,LENGTH(text) AS length FROM source_text WHERE book_id=? ORDER BY p";

my $dbh = connectDB();

my $sth = $dbh->prepare("$sql");
$sth->execute($b) or die print "<p class=\"neg\">Can't execute SQL.</p><p class=\"neg\">$sql</p>";;

while (my ($Id,$length) = $sth->fetchrow_array()) {
					$paragraphsTotal++;
					push(@results, [$Id,$length]);
			}

			$i = 0;
			while ($i<$paragraphsTotal) {
						$Id = $results[$i][0];
						$paragraphCount = 2;
						$characterCount = $results[$i][1] + $results[$i+1][1];
						$=2;
						while ($characterCount <= $charactersPerPage and $i+$<$paragraphsTotal) {
						  $paragraphCount++;
						  $characterCount += $results[$i+$][1];
							$++;
						}
						
    				$sql2 = "UPDATE source_text SET page=? WHERE Id=?;";
    				my $sth = $dbh->prepare("$sql2");
            $sth->execute($paragraphCount,$Id);
						
						$i++;
			}			

$sth->finish();
$dbh->disconnect();

print qq~
<p><b>$paragraphsTotal</b> paragraphs assigned ($wordsPerPage words per page).</p>
<form>
<label>Words per page:</label>
<input type="text" name="wordsPerPage" value="$wordsPerPage"/>
<input type="submit" value="Submit"/>
</form>
</body>
</html>
~;
