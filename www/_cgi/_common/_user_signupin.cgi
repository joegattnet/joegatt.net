#!/usr/bin/perl -T

require '../_basics.cgi';

if($localhost eq false){
  require '../_basics_email.cgi';
}

formRead("get");
formRead("post");

use CGI;
use Digest::SHA qw(sha256_hex);

if ($startup eq 'true') { # && $justreset ne 'true') {
  $query = new CGI;
  if($sent_user_id eq ''){
    $sent_user_id = $query->cookie('user_id');
  }

  $isClosed = ' closed';
  $confirmed = $query->cookie('confirmed');
  $rememberme = $query->cookie('rememberme');
  
   if ($confirmed eq '0') {
       $mode='unconfirmed';
       $sent_user_id = $query->cookie('user_id');
#      $('signupin').removeClassName('closed');
     } elsif ($rememberme eq '1') {
       $mode='signingin';
       $sent_rmcode = $query->cookie('rmcode');
       $sent_user_id = $query->cookie('user_id');
     } elsif ($confirmed eq '1') {
       $mode='signin';
     } else {
       $mode='signup';
     }
}

$sent_username = "\L$sent_username\E";

if ($sent_alert ne '' && $sent_alert ne 'undefined'){
  $is_alert = 'alert';
  $jsstring .= "NB.page.showScreenCover();";
}

if ($sent_confirmation_code ne ''){
  $salt = get_salt();
  $sent_confirmation_code = sha256_hex("$sent_confirmation_code$salt");
}

if ($sent_rmcode ne ''){
  $salt = get_salt();
  $sent_rmcode = sha256_hex("$sent_rmcode$salt");
}

if ($sent_password ne ''){
  $salt = get_salt();
  $sent_password = sha256_hex("$sent_password$salt");
}

$dbh = connectDB();

$confirmation_message = "<p>An email has been sent to you. Click on the link in the email or enter the confirmation code.</p>";

# ******************************************************************************

if ($mode eq 'confirming') {
  #if cookie is not present [e.g. user goes to another browser] this fails
  #is it safe just to use confirmation code only?
  $sql = "SELECT 1 AS result,username,Id FROM users WHERE confirmation_code=?;";
  $sth = $dbh->prepare("$sql");
  $sth->execute($sent_confirmation_code);
  ($found_result,$found_username,$found_user_id) = $sth->fetchrow_array();
  $sth->finish();

  if ($found_result eq '1') {

    $rmcode = rand(100000000);
    
    $sql = "UPDATE users SET confirmed=1,date_confirmed=UTC_TIMESTAMP(),rmcode=?,confirmation_code='0' WHERE Id=?;";
    $sth = $dbh->prepare("$sql");
    $salt = get_salt();
    $sth->execute(sha256_hex("$rmcode$salt"),$found_user_id);
    $sth->finish();

    $mode = 'signedin';
    $rememberme = '1';   
    $jsstring .= "NB.Cookie.write('rmcode','$rmcode');";  
    $jsstring .= "NB.Cookie.write('confirmed','1');";  
    $jsstring .= "NB.Cookie.write('rememberme','1');";  

  } else {

    $mode = 'coderror';
    $confirmation_message = "<span class='neg'>The code you entered is incorrect. If you need to receive a confirmation code again, click below.</span>";
    $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Confirmation error', $sent_confirmation_code]);";
  
  }

}

# ******************************************************************************

if ($mode eq 'signingup') {
  $confirmation_code = substr sha256_hex(rand(100000000)), 0, 7;
  $confirmation_code = "\U$confirmation_code\E";
  $salt = get_salt();
  $confirmation_code_write = sha256_hex("$confirmation_code$salt");
  $ip = $ENV{'REMOTE_ADDR'};
  $sql = "INSERT INTO users (username,email,password,confirmation_code,date_created,signup_url,ip) VALUES (?,?,?,?,UTC_TIMESTAMP(),?,?);";
  $sth = $dbh->prepare("$sql");
  $sth->execute($sent_username,$sent_email,$sent_password,$confirmation_code_write,$sent_signup_url,$ip);
  $found_user_id = $dbh->last_insert_id(undef, undef, $sent__[2], ID);
  $sth->finish();
  email_confirm_registration($sent_email,$sent_username,$found_user_id,$confirmation_code,$sent_signup_url);
  $jsstring .= "NB.Cookie.remove('confirmed');";
  $jsstring .= "NB.Cookie.write('user_id','$found_user_id');";
}

# ******************************************************************************

if ($mode eq 'resend') {
  #if cookie is not present [e.g. user goes to another browser] this fails
  #is it safe just to use confirmation code only?
  $sql = "SELECT 1,email,username,signup_url FROM users WHERE confirmed=0 AND Id=?;";
  $sth = $dbh->prepare("$sql");
  $sth->execute($sent_user_id);
  ($found_result,$found_email,$found_username,$found_signup_url) = $sth->fetchrow_array();
  $sth->finish();

  if ($found_result eq '1') {
  
    $confirmation_code = substr sha256_hex(rand(100000000)), 0, 7;
    $confirmation_code = "\U$confirmation_code\E";
    $salt = get_salt();
    $confirmation_code_write = sha256_hex("$confirmation_code$salt");
    $sql = "UPDATE users SET confirmation_code=? WHERE Id=?;";
    $sth = $dbh->prepare($sql);
    $sth->execute($confirmation_code_write,$sent_user_id);
    $sth->finish();
    email_confirm_registration($found_email,$found_username,$sent_user_id,$confirmation_code,$found_signup_url);
    $jsstring .= "NB.Cookie.remove('confirmed','0');";
    $jsstring .= "NB.Cookie.write('user_id','$found_user_id');";
    $confirmation_message = "<p>An email has been sent to you again. Click on the link in the email or enter the confirmation code.</p>";
    $mode = 'signingup';
  
  } else {

    $mode = 'coderror';
    $confirmation_message = "<span class='neg'>Your details can't be found. Please email <a href='mailto:register\@joegatt.net'>register\@joegatt.net</a></span>";
    $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Password request error', $sent_user_id]);";
  
  }

}

# ******************************************************************************

if ($mode eq 'signup') {

  $headerstring = 'Register';
  
  if ($sent_alert ne '' and $sent_alert ne 'undefined') {
  $formstring .= qq~
    <p class="alert">To $sent_alert you need to be registered. If you are already registered, <a href="javascript:;" onclick="NB.user.signin();">sign in</a>.</p>
    ~;
  } elsif ($sent_genalert) {
    $formstring .= qq~
    <p class="alert">To $sent_alert you need to be register. If you are already registered, <a href="javascript:;" onclick="NB.user.signin();">sign in</a>.</p>
    ~;
  }
  
  $formstring .= qq~
    <form id="signupinform" action="../_cgi/_common/_user_signupin.cgi" class="validate">
      <fieldset>
      <label><span id="sent_username_warning" class="warning"></span>Username</label><input type="text" name="sent_username" min="5" maxlength="12" />
      <label><span id="sent_email_warning" class="warning"></span>Email</label><input type="text" name="sent_email" min="5" maxlength="50" />
      <label><span id="sent_password_warning" class="warning"></span>Password</label><input type="password" name="sent_password"  min="7" maxlength="12" />
          <input type="hidden" name="sent_signup_url" id="signup_url" value="" />
          <input type="hidden" name="mode" value="signingup" />
          <input type="hidden" name="is_alert" value="$is_alert" />
          <input type="submit" value="Register" onclick="\$('signup_url').value=escape(NB.path);NB.page.submit(this,'signupin_container');return false;" />
      </fieldset>
    </form>
    <p><a href="javascript:;" onclick="NB.user.signin();">Already registered?</a></p>
  ~;
}

# ******************************************************************************

if ($mode eq 'signingin') {

  $sql = "SELECT Id,confirmed,username,level,rmcode,rmcode2 FROM users WHERE (username=? AND password=?) OR (email=? AND password=?) OR (Id=? AND (rmcode=? OR rmcode2=? OR rmcode3=?))";# OR (Id=? AND password=?);";
  $sth = $dbh->prepare("$sql");
  $sth->execute($sent_username,$sent_password,$sent_username,$sent_password,$sent_user_id,$sent_rmcode,$sent_rmcode,$sent_rmcode);#,$sent_user_id,$sent_password);
  ($found_user_id,$confirmed,$found_username,$found_level,$found_rmcode,$found_rmcode2) = $sth->fetchrow_array();
  $sth->finish();

  if ($found_user_id && ($confirmed==1)) {

       $mode = 'signedin';
       $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Remember me - successful']);";
  
  } elsif ($found_user_id && ($confirmed==0)) {

       $mode = 'unconfirmed';

  } else {
        $mode = 'signinerror';
  
        $sql = "SELECT Id FROM users WHERE username=? OR email=?;";
    
        $sth = $dbh->prepare("$sql");
        $sth->execute($sent_username,$sent_username);
        ($found_exists) = $sth->fetchrow_array();
        $sth->finish();
              
        if ($found_exists) {
           $signinmessage = '<p class="error">Wrong password.</p>';
           $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Wrong password']);";
        } elsif ($sent_username ne '') {
           $signinmessage = "<p class='error'>$sent_username not found.</p>";
           $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Username not found']);";
        } elsif ($rememberme eq '1') {
          $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Remember me - failed', location.href]);";
        }
      
  }

}

# ******************************************************************************

if ($mode eq 'signingup' or $mode eq 'unconfirmed' or $mode eq 'coderror') {

if ($found_user_id eq '') {
     $found_user_id = $sent_user_id;
}

if ($found_username ne '') {
     $found_username_show = " $found_username";
}

$headerstring = "Registering$found_username_show...";
$isClosed = '';

$formstring .= qq~
      $confirmation_message
      <form id="signupinform" action="../_cgi/_common/_user_signupin.cgi">
        <fieldset>
        <label>Code <span id="email_code"></span></label><input type="text" name="sent_confirmation_code"  min="7" maxlength="20" />
            <input type="hidden" name="sent_user_id" value="$found_user_id" />
            <input type="hidden" name="mode" value="confirming" />
            <input type="hidden" name="is_alert" value="$is_alert" />
            <input type="submit" value="Confirm" onclick="NB.page.submit(this,'signupin_container');return false;" />
        <p><a href="javascript:;" onclick="NB.user.resend($found_user_id);">Send it again</a></p>
        </fieldset>
      </form>
  ~;

      $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Registering - waiting']);";


}

# ******************************************************************************

if ($mode eq 'resettingpassword') {

  $sql = "SELECT username,Id FROM users WHERE email=?;";
  
  $sth = $dbh->prepare("$sql");
  $sth->execute($sent_email);
  ($found_username,$found_user_id) = $sth->fetchrow_array();
  $sth->finish();
    
    if ($found_username) {

      $newpassword = substr sha256_hex(rand(100000000)), 0, 9;
      $salt = get_salt();
      $newpassword_write = sha256_hex("$newpassword$salt");
      
      $sql = "UPDATE users SET password=? WHERE Id=?;";
      $sth = $dbh->prepare($sql);
      $sth->execute($newpassword_write,$found_user_id);
      $sth->finish();
      
      #set showname to user's preference 
      
      email_password_reset($sent_email,$found_username,$found_user_id,$newpassword,$sent_url);
  
      $mode = 'signin';
      $signinmessage = "<p>Your new password has been sent to $sent_email.</p>";
      $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Reset password - sent']);";
    
    } else {

      $mode = 'password';
      $passwordmessage = "<p class=\"error\">No user registered with $sent_email.</p>";
      $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Reset password - email not found']);";


    }
    
}

# ******************************************************************************

if ($mode eq 'changingpassword') {

  $salt = get_salt();
  $sent_old_password = sha256_hex("$sent_old_password$salt");
  $sent_new_password = sha256_hex("$sent_new_password$salt");
  
  $sql = "SELECT username FROM users WHERE Id=? AND password=?;";
  
  $sth = $dbh->prepare("$sql");
  $sth->execute($sent_user_id,$sent_old_password);
  ($found_username) = $sth->fetchrow_array();
  $sth->finish();

    if ($found_username) {

      $sql = "UPDATE users SET password=?,rmcode=0 WHERE Id=?;";
      $sth = $dbh->prepare($sql);
      $sth->execute($sent_new_password,$sent_user_id);
      $sth->finish();

      $jsstring .= "NB.Cookie.remove('rememberme');";
 
      $mode = 'signin';
      $signinmessage = "<p>Your password has been changed. Please sign in with your new password.</p>";
      $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Changing password - successful']);";
    
    } else {

      $mode = 'changepassword';
      $passwordmessage = "<p class=\"error\">Wrong password.</p>";
      $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Changing password - wrong password']);";

    }
    
}

# ******************************************************************************

if ($mode eq 'password') {

  $headerstring = 'Reset password';
  $formstring .= qq~
  $passwordmessage
    <form id="signupinform" action="../_cgi/_common/_user_signupin.cgi">
      <fieldset>
      <label><span id="sent_email_warning" class="warning"></span>Email</label><input type="text" name="sent_email" value="$sent_email" min="5" maxlength="50" />
          <input type="hidden" name="mode" value="resettingpassword" />
          <input type="hidden" name="is_alert" value="$is_alert" />
          <input type="hidden" name="sent_url" id="sent_url" value="" />
          <input type="submit" value="Request" onclick="\$('sent_url').value=escape(NB.path);NB.page.submit(this,'signupin_container');return false;" />
      </fieldset>
    </form>
    <p><a href="javascript:;" onclick="NB.user.signin();">Just remembered it?</a></p>
    <p><a href="javascript:;" onclick="NB.user.signup();">Not yet registered?</a></p>
  ~;
      $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Reset password - viewed']);";

}


# ******************************************************************************

if ($mode eq 'changepassword') {

  $headerstring = 'Change password';
  $formstring .= qq~
  $passwordmessage
    <form id="signupinform" action="../_cgi/_common/_user_signupin.cgi" class="validate">
      <fieldset>
      <label><span id="sent_old_password_warning" class="warning"></span>Password</label>
          <input type="password" name="sent_old_password" maxlength="12" />
          <label><span id="sent_new_password_warning" class="warning"></span>New password</label>
          <input type="password" name="sent_new_password" maxlength="12" />
          <input type="hidden" name="mode" value="changingpassword" />
          <input type="hidden" name="sent_user_id" value="$sent_user_id" />
          <input type="hidden" name="is_alert" value="$is_alert" />
          <input type="submit" value="Change" onclick="NB.page.submit(this,'signupin_container');return false;" />
      </fieldset>
    </form>
    <p><a href="javascript:;" onclick="NB.user.clear();">Cancel</a></p>
  ~;
      $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Change password - viewed']);";

}

# ******************************************************************************

if ($mode eq 'signin' or $mode eq 'signinerror') {

  if ($sent_alert ne '' and $sent_alert ne 'undefined') {
    $signinmessage = "<p class='alert'>To $sent_alert you need to be signed in. If you are not yet registered, <a href='javascript:;' onclick='NB.user.signup();'>Register</a>.</p>";
  }
  
  $jsstring .= "NB.user.id = 0;NB.user.name = '';";
  
  $headerstring = 'Sign in';
  $formstring .= qq~
  $signinmessage
      <form id="signupinform" action="../_cgi/_common/_user_signupin.cgi">
        <fieldset>
        <label>Username or email</label><input type="text" name="sent_username" min="5" maxlength="50" />
        <label>Password</label><input type="password" name="sent_password" min="7" maxlength="12" />
        <input type="checkbox" name="rememberme" value="1" id="rememberme" checked="true" />
            <label style="display:inline;" for="rememberme">Remember me</label>
            <input type="hidden" name="mode" value="signingin" />
            <input type="hidden" name="is_alert" value="$is_alert" />
            <input type="submit" value="Sign in" onclick="NB.page.submit(this,'signupin_container');return false;" />
        </fieldset>
      </form>
      <p><a href="javascript:;" onclick="NB.user.password();">Forgot password?</a></p>
      <p><a href="javascript:;" onclick="NB.user.signup();">Not yet registered?</a></p>
  ~;
}

# ******************************************************************************

if ($mode eq 'signedin') {

#  if ($found_user_id) {
    $user_id = $found_user_id;
#  } else {
#    $user_id = $sent_user_id;
#  }

  $ip = $ENV{'REMOTE_ADDR'};

  if ($rememberme eq '1') {

#rewriting rmcode every time is more secure but does not allow user to remain signed in in more than one location  
    $rmcode = rand(100000000);
    $jsstring .= "NB.Cookie.write('rmcode','$rmcode');";  
    $jsstring .= "NB.Cookie.write('rememberme','1');";  

  } else {
    $jsstring .= "NB.Cookie.remove('rememberme');";  
    $rmcode = 0;
    $jsstring .= "NB.Cookie.remove('rmcode');";  
  }

  $jsstring .= "NB.Cookie.write('confirmed','1');";  
  $jsstring .= "NB.Cookie.write('user_id','$user_id');";
  $jsstring .= "_gaq.push(['_trackEvent','Signupin', 'Signed in']);";

  #Rmcodes are alternated
  if($sent_rmcode eq $found_rmcode) {      
    $sql = "UPDATE users SET rmcode2=?,ip=?,visits=visits+1,date_last_visit=UTC_TIMESTAMP() WHERE Id=?;";
  } elsif($sent_rmcode eq $found_rmcode2) {
    $sql = "UPDATE users SET rmcode3=?,ip=?,visits=visits+1,date_last_visit=UTC_TIMESTAMP() WHERE Id=?;";
  } else {
    $sql = "UPDATE users SET rmcode=?,ip=?,visits=visits+1,date_last_visit=UTC_TIMESTAMP() WHERE Id=?;";
  }
  $sth = $dbh->prepare("$sql");
  
  $salt = get_salt();
  $sth->execute(sha256_hex("$rmcode$salt"),$ip,$user_id);
  $sth->finish();
  
  $is_alert = '';
  $headerstring = $found_username;
  $formstring .= qq~
     $signedinextramessage
     <p>You are signed in as <strong>$found_username</strong>.</p>
     <p><a href="javascript:;" onclick="NB.user.changepassword();">Change password</a></p>
     <p><a href="javascript:;" onclick="NB.user.signout();">Sign out</a></p>
  ~;
  
#  if ($found_user_id ne ''){
#    $user_id = $found_user_id;
#  } else {
#    $user_id = $sent_user_id;
#  }
  $jsstring .= "NB.user.signedin($user_id,'$found_username',$found_level);";

}

$dbh->disconnect();

# ******************************************************************************
# ******************************************************************************

print ("Content-Type: text/html; charset=UTF-8\n\n");

print qq~
<script type="text/javascript">
//<![CDATA[
~;
    if($startup eq 'true'){
      print qq~NB.deferred += "$jsstring";~;
        } else {
      print $jsstring;
    }
print qq~
//]]>
</script>
    <div id="signupin" class="$is_alert toggle">
    <p class="close"><a href="javascript:;" onclick="NB.page.dismissScreenCover();">close</a></p>
      <p id="signupin_header"><a href="javascript:;" onclick="NB.page.dismissScreenCover();NB.page.toggle(\$('signupin_panel'));" id="signupin_header_a">$headerstring</a></p>
      <div id="signupin_panel" class="a_arrows${isClosed}">
        <div>
          $formstring
        </div>
      </div>
    </div>
~;

$focus = "if(\$('signupinform')&&!\$('signupin_panel').hasClassName('closed')){\$('signupinform').focusFirstElement();}";
if($startup eq 'true'){
  print qq~
    <script type="text/javascript">
    //<![CDATA[
      NB.deferred += "$focus";
    //]]>
    </script>
  ~;
} else {  
  print qq~
    <script type="text/javascript">
    //<![CDATA[
      $focus
    //]]>
    </script>
  ~;
}

if ($sent_alert ne '' and ($mode eq 'signingup' or $mode eq 'signingin')) {
  print qq~
  <script type="text/javascript">
  //<![CDATA[
    \$('signupin_panel').removeClassName('closed');
  //]]>
  </script>
  ~;
}
