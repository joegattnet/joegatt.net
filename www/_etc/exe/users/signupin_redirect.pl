#!/usr/bin/perl -T

require '../basics.pl';

formRead("get");

use Digest::SHA qw(sha256_hex);

if ($sent_confirmation_code ne ''){
  $salt = get_salt();
  $sent_confirmation_code = sha256_hex("$sent_confirmation_code$salt");
}

if ($sent_password ne ''){
  $salt = get_salt();
  $sent_password = sha256_hex("$sent_password$salt");
}

$dbh = connectDB();

# ******************************************************************************

if ($mode eq 'confirming') {

  $sql = "SELECT 1 AS result,username FROM users WHERE confirmation_code=? AND Id=?;";
  $sth = $dbh->prepare("$sql");
  $sth->execute($sent_confirmation_code,$sent_user_id);
  ($found_result,$found_username) = $sth->fetchrow_array();
  

  if ($found_result eq '1') {
    
    $rmcode = rand(100000000);
    
    $sql = "UPDATE users SET confirmed=1,date_confirmed=UTC_TIMESTAMP(),rmcode=?,confirmation_code='0' WHERE Id=?;";
    $sth = $dbh->prepare("$sql");
    $salt = get_salt();
    $sth->execute(sha256_hex("$rmcode$salt"),$sent_user_id);
    

    $sstring .= "NB_Cookie.write('user_id','$sent_user_id');";
    $sstring .= "NB_Cookie.write('rmcode','$rmcode');";  
    $sstring .= "NB_Cookie.write('confirmed','1');";  
    $sstring .= "NB_Cookie.write('rememberme','1');";  

  } else {
  
    $redirect = true;
    $redirect_url = '/error/1';
  
  }

}

# ******************************************************************************

if ($mode eq 'signingin') {

  $sql = "SELECT Id FROM users WHERE Id=? AND password=? AND confirmed=1;";
  $sth = $dbh->prepare("$sql");
  $sth->execute($sent_user_id,$sent_password);
  ($found_user_id) = $sth->fetchrow_array();
  

  if ($found_user_id) {

    $rmcode = rand(100000000);

    $sql = "UPDATE users SET rmcode=? WHERE Id=?;";
    $sth = $dbh->prepare("$sql");
    $salt = get_salt();
    $sth->execute(sha256_hex("$rmcode$salt"),$sent_user_id);
    
  
    $sstring .= "NB_Cookie.write('user_id','$sent_user_id');";
    $sstring .= "NB_Cookie.write('rmcode','$rmcode');";  
    $sstring .= "NB_Cookie.write('confirmed','1');";  
    $sstring .= "NB_Cookie.write('rememberme','1');";  
  
  } else {

    $redirect = true;
    $redirect_url = '/error/2';
  
  }
}

$dbh->disconnect();

# ******************************************************************************
# ******************************************************************************

print ("Content-Type: text/html; charset=UTF-8\n\n");

print qq~
<script type="text/javascript">
//<![CDATA[
~;

  if ($redirect) {
  
    print qq~
      location.href = "$redirect_url";
    ~;
  
  } else {
    
    #can these be written in the headers?
    if($sstring ne ''){
      print qq~
      
      var NB_Cookie = {
      	write: function (name,value,path) {
          var path = path || '/';
          var date = new Date();
          date.setTime(date.getTime()+(365*24*60*60*1000));
          var expires = "; expires="+date.toGMTString();
          document.cookie = name+"="+value+expires+"; path="+path;
      	}
      }
      $sstring
      ~;
      
    }  
  
  print qq~
    location.href = "$sent_url";
  ~;

  }
  
print qq~
  //]]>
  </script>
~;
