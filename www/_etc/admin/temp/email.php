<?php
$to = "Joe Gatt <joe.gatt@gmail.com>";
$subject = "Hi!";
$body = "Hi,\n\nHow are you?";
$headers = "From: Ehe <joe@joegatt.net>";
if (mail($to, $subject, $body, $headers)) {
  echo("<p>Message successfully sent!</p>");
 } else {
  echo("<p>Message delivery failed...</p>");
 }
?>