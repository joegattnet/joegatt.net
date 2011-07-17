#!/usr/bin/perl -T

print ("Content-Type: text/html; charset=UTF-8\n\n");

$text = qq~
  quote:How do we know this is happening?[Benjamin]
  tr:Frick, Grace
~;

if ($text =~ s/capt?i?o?n?\: *(.*?)$//i) {
  $caption = $1;
}

if ($text =~ s/\[(.*?)\] *$//mi) {
  $attribution = $1;
}

if ($text =~ s/quote\: *(.*?)$//mi) {
    $quote = $1;
}

if ($text =~ s/tra?n?s?l?a?t?o?r?\: *(.*)$//mi){
  $translator = $1;
}
$tag = "Yourcenar 1986: Memoirs of Hadrian";
$tag =~ s/(.*) *(\d{4}):.*/$1 $2/;

print qq~
  Text: $text
  <hr>
  Attribution: $attribution
  <hr>
  Quote: $quote
  <hr>
  Translator: $translator
  <hr>
  Tag: $tag
~;
