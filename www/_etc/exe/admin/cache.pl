#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

my $timestamp = POSIX::strftime("%m.%d.%Y %H:%M:%S", localtime);

if ($ARGV[0] eq '') {

  print ("Content-Type: text/html\n\n");
  
  print qq~
    <html>
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Cache manager</title>
        <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
        <link rel="stylesheet" type="text/css" media="all" href="/_assets/css/src/0.Admin.css" />
      </head>
      <body class="admin">
      <h2>Cache manager</h2>
      <h3>$timestamp</h3>
        <form>
          <input name="q" value="$q">
          <input type="hidden" name="t" value="$timestamp">
          <p><input type="checkbox" name="deleteOnly"> Delete only</p>
          <input type="Submit">
        </form>
        ~;
        
        if($q ne ''){
          print qq~
            $t: Refreshing '$q' from cache...
          ~;
          cache_refresh($q,1,($deleteOnly eq 'on'));
        }
        
        print qq~
      </body>
    </html>
  ~;

} else {
          cache_refresh($q,1,($deleteOnly eq 'on'));
}
