#!/usr/bin/perl -T

require '../basics.pl';
$dsn = 'DBI:mysql:notes:localhost';

print ("Content-Type: text/html; charset=UTF-8\n\n");

print "<p>Working...</p>";

open ENEXPORT, ">amanuensis_evernote_export.enex";

print ENEXPORT qq~<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE en-export SYSTEM "http://xml.evernote.com/pub/evernote-export.dtd">
<en-export export-date="20091213T124207Z" application="Evernote/Windows" version="3.5">
~;

print "<p>&gt;&gt; Evernote</p>";

my $dbh = connectDB();

my $sth = $dbh->prepare(qq{
  SELECT title,text,url,tags,DATE_FORMAT(dateCreated,'%Y%m%dT%H%i%sZ'),DATE_FORMAT(dateModified,'%Y%m%dT%H%i%sZ')
  FROM evernote
});

$sth->execute();

while (my ($title,$text,$url,$tags,$dateCreated,$dateModified) = $sth->fetchrow_array()) {

$url =~ s/\&/&amp;/g;

$text  =~ s/([‘’])/'/g;
$text  =~ s/([“”])/"/g;
$text =~ s/\&/&amp;/g;
$text =~ s/\'/&apos;/g;
$text =~ s/\"/&quot;/g;
$text =~ s/\>/&gt;/g;
$text =~ s/\</&lt;/g;

$title =~ s/([‘’])/'/g;
$title =~ s/([“”])/"/g;
$title =~ s/\&/&amp;/g;
$title =~ s/\'/&apos;/g;
$title =~ s/\"/&quot;/g;
$title =~ s/\>/&gt;/g;
$title =~ s/\</&lt;/g;

  print ENEXPORT qq~
    <note>
      <title>$title</title>
      <content><![CDATA[<?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml.dtd">
      <en-note>
      <div>$text</div>
      </en-note>
      ]]>
      </content>
      <created>$dateCreated</created>
      <updated>$dateModified</updated>
      ~;
      
      @tags = split(/\|/,$tags);
      foreach $tag (@tags){
        print ENEXPORT "<tag>$tag</tag>\n"
      }
      
      print ENEXPORT qq~
      <note-attributes><author>Joe Gatt</author>
      ~;
      
      if ($url ne ''){
        print ENEXPORT qq~
          <source>web.clip</source>
          <source-url>$url</source-url>
        ~;      
      }
      
      print ENEXPORT qq~
      </note-attributes>

    </note>
  
  ~;
}

print ENEXPORT qq~
  </en-export>
~;

CLOSE export;

print "<h1>Done!</h1>";


$dbh->disconnect();
