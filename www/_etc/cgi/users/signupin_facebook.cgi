#!/usr/bin/perl -T

require '../basics.cgi';

formRead("post");

use CGI;
use Digest::MD5 qw(md5_hex);

print ("Content-Type: text/html; charset=UTF-8\n\n");

my $secret = get_password($facebooksecretloc);

my $authenticated = (md5_hex("$authstring$secret") eq $sig);

if ($authenticated == 1){

  # ****************************************************************************
  
  $dbh = connectDB();
  
  $sql = "SELECT Id FROM users WHERE id_facebook=?";
  $sth = $dbh->prepare("$sql");
  $sth->execute($fbuid);
  ($found_user_id) = $sth->fetchrow_array();
  $sth->finish();
  
  if ($found_user_id) {
    $sql = "UPDATE users SET visits=visits+1,date_last_visit=UTC_TIMESTAMP(),username=?,fb_first_name=?,fb_last_name=?,fb_link=? WHERE Id=?;";
    $sth = $dbh->prepare("$sql");
    $sth->execute("$fb_first_name $fb_last_name",$fb_first_name,$fb_last_name,$fb_link,$found_user_id);
  } else {
    $sql = "INSERT INTO users (id_facebook,username,fb_first_name,fb_last_name,fb_link,date_created,signup_url,visits,date_last_visit,confirmed,date_confirmed) VALUES (?,?,?,?,?,UTC_TIMESTAMP(),?,1,UTC_TIMESTAMP(),1,UTC_TIMESTAMP());";
    $sth = $dbh->prepare("$sql");
    $sth->execute($fbuid,"$fb_first_name $fb_last_name",$fb_first_name,$fb_last_name,$fb_link,$sent_signup_url);
    $found_user_id = $dbh->last_insert_id(undef, undef, $_[2], ID);
  }
  
  $sth->finish();
  $dbh->disconnect();
  
  # ****************************************************************************

}

print qq~
  <div id="signupin" class="panel escapable-panel panel_closed">
    <p class="close panel_handle"><a href="javascript:;" onclick="NB.Ui.screencover.dismiss();">close</a></p>
~;

if ($authenticated == 1){
      print qq~
      <p id="signupin_header" class="fb-name"><a href="javascript:;" id="signupin_header_a" class="panel_handle">$fb_first_name $fb_last_name</a></p>
      <div id="signupin_panel" class="a_arrows panel_body">
        <div>
          <p class="separator">You are logged in using your Facebook account.</p>
          <p><a href="javascript:;" class="fb-button fb-logout"><span class="fb_button_text">Log out</span></a></p>
          ~;
          } else {
          print qq~
      <p id="signupin_header"><a href="javascript:;" id="signupin_header_a" class="panel_handle error">$authenticated Facebook Error</a></p>
      <div id="signupin_panel" class="a_arrows panel_body">
        <div>
          <p class="separator error">An error has occurred while trying to log into your Facebook account.</p>
          <p>Please try again.</p>
          <p><a href="javascript:;" class="fb-button fb-login"><span class="fb_button_text">Log in</span></a></p>
          ~;
}

print qq~
        </div>
      </div>
  </div>
  <script type="text/javascript">
      NB.User.signedin($found_user_id,"$fb_first_name $fb_last_name","Facebook");
      NB.Nav.track(2,'Signupin', 'Signed in', 'Facebook');
  </script>
~;
