#!/usr/bin/perl -T

require '../_basics.cgi';
require '../_basics_email.cgi';


if(!$localhost){
  require '../_basics_email.cgi';
}

formRead("get");
formRead("post");

print ("Content-Type: text/html; charset=UTF-8\n\n");

print qq~
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" media="all" href="${root}_css/jg_admin.css" />
</head>
<body class="admin">
<h2>Email user(s)</h2>
~;

print "<p>Sending email.....</p>";
#send_email();#'webmaster\@joegatt.net','joe.gatt\@gmail.com','TEST<><><>',"Ehe\nEhe\n");

send_email('password_reset','TEST EMAIL','testing@joegatt.net','jgx@joegatt.net','melodynelson','999','ABC','/wutz/1');

print "<p>Email sent.</p>";

print qq~
</body>
</html>
~;
