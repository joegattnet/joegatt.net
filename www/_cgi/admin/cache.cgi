#!/usr/bin/perl -T

require '../basics.cgi';

formRead("get");

print ("Content-Type: text/html\n\n");

print qq~
  <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Cache manager</title>
      <link rel="stylesheet" type="text/css" media="all" href="${root}_css/src/Admin.css" />
    </head>
    <body class="admin">
    <h2>Cache manager</h2>
      <form>
        <input name="q" value="$q"/>
        <input type="Submit"/>
      </form>
      ~;
      
      if($q ne ''){
        print qq~
          Refreshing '$q' from cache...
        ~;
        cache_refresh($q,1);
      }
      
      print qq~
    </body>
  </html>
~;