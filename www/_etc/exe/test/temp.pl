#!/usr/bin/perl -T

print ("Content-Type: text/html; charset=UTF-8\n\n");

$text = qq~Flaubert, Gustave: Bouvard and Pécuchet with The Dictionary of Received Ideas (Penguin Classics, London, 1880/1976) ISBN 0140443207
translator:Krailsheimer, AJ~;

($authorFullName, $bookTitle, $publisherName, $publishedDate, $isbn) = $text =~ /([^:]+?): ?(.+) ?\( ?(.+?)\, ([\d\/]{4,9}) ?\) ?isbn ?([\w]+)$/mi;

print qq~<p>$authorFullName</p><p>$bookTitle</p><p>$publisherName</p><p>$publishedDate</p><p>$isbn</p>~;
