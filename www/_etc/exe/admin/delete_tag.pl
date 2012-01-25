#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

my $timestamp = POSIX::strftime("%m.%d.%Y %H:%M:%S", localtime);

  print ("Content-Type: text/html\n\n");
  
  print qq~
    <html>
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Delete tag</title>
        <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
        <link rel="stylesheet" type="text/css" media="all" href="/_assets/css/src/0.Admin.css" />
      </head>
      <body class="admin">
      <h2>Delete tag and lookup entries</h2>
      <h3>$timestamp</h3>
        <form>
          <input name="q" value="$q">
          <input type="hidden" name="t" value="$timestamp">
          <input type="Submit">
        </form>
        ~;
        
        if($q ne ''){
          print "<p>$t: Deleting...</p>";
          $dbh = connectDB();

          my $sth = $dbh->prepare(qq{
                  DELETE FROM FROM tags,_lookup 
                  WHERE check2 = tags.e_guid 
                  AND name_simple = ?
          });
          $sth->execute($q);

          $rows = $sth->rows + 1;
          print "<p>Lookup rows deleted: $rows</p>";
          $sth->finish();

          my $sth = $dbh->prepare(qq{
                  DELETE FROM tags 
                  WHERE name_simple = ?
          });
          $sth->execute($q);

          $rows = $sth->rows + 1;
          print "<p>Tag rows deleted: $rows</p>";
          $sth->finish();

          $dbh->disconnect();
          
          #A further clean-up would be required of old flat elements
          cache_refresh($q, 1, 1); #This leaves a lot of unprimed pages
          cache_refresh("latest=true|cloud", 1, 0);
          
          print "<p><b>Remember</b> to re-prime cache manually.</p>";
          
        }
        
        print qq~
      </body>
    </html>
  ~;
