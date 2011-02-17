#!/usr/bin/perl -T

require '../_basics.cgi';

formRead("post");
formRead("get");

$text = cleanText($text);

$paragraph_id =~ s/paragraph\_id\_//;
  
print ("Content-Type: text/html; charset=UTF-8\n\n");

if ($text ne ''){

  my $dbh = connectDB();
  
  my $sth = $dbh->prepare(qq{
    REPLACE INTO comments (text,date_created,user_id,book_id,paragraph_id,sequence,unique_id,type,page_id) VALUES (?,UTC_TIMESTAMP(),?,?,?,?,?,1,?)
  });
  $sth->execute($text, $user_id, $book_id, $paragraph_id, $sequence, $unique_id, $page_id);
  
  $sth->finish();
  
  $dbh->disconnect();

}
