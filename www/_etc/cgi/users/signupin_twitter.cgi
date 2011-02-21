#!/usr/bin/perl -T

require '../basics.cgi';

formRead("post");

use CGI;
use Digest::SHA1 qw(sha1_hex);

print ("Content-Type: text/html; charset=UTF-8\n\n");

$query = new CGI;
$useridsig = $query->cookie('twitter_anywhere_identity');
($id_twitter,$sig) = split(/:/,$useridsig);

my $secret = get_password($twitter_apisecretloc);

my $autheticated = (sha1_hex("$id_twitter$secret") eq $sig);

if ($autheticated == 1){

  # ****************************************************************************
  
  $dbh = connectDB();
  
  $sql = "SELECT Id FROM users WHERE id_twitter=?";
  $sth = $dbh->prepare("$sql");
  $sth->execute($id_twitter);
  ($found_user_id) = $sth->fetchrow_array();
  $sth->finish();
  
  if ($found_user_id) {
    $sql = "UPDATE users SET visits=visits+1,date_last_visit=UTC_TIMESTAMP(),username=?,tw_full_name=?,tw_screen_name=? WHERE id_twitter=?;";
    $sth = $dbh->prepare("$sql");
    $sth->execute($tw_full_name,$tw_full_name,$tw_screen_name,$id_twitter);
  } else {
    $sql = "INSERT INTO users (id_twitter,username,tw_full_name,tw_screen_name,date_created,signup_url,visits,date_last_visit,confirmed,date_confirmed) VALUES (?,?,?,?,UTC_TIMESTAMP(),?,1,UTC_TIMESTAMP(),1,UTC_TIMESTAMP());";
    $sth = $dbh->prepare("$sql");
    $sth->execute($id_twitter,$tw_full_name,$tw_full_name,$tw_screen_name,$sent_signup_url);
    $found_user_id = $dbh->last_insert_id(undef, undef, $_[2], ID);
    $follow = 1;
  }
  
  $sth->finish();
  $dbh->disconnect();

# Automatically start following user
  
  # ****************************************************************************

}

print qq~
  <div id="signupin" class="panel escapable-panel panel_closed">
    <p class="close panel_handle"><a href="javascript:;" onclick="NB.Ui.screencover.dismiss();">close</a></p>
~;

if ($autheticated == 1){
      print qq~
      <p id="signupin_header" class="fb-name"><a href="javascript:;" id="signupin_header_a" class="panel_handle">$tw_full_name</a></p>
      <div id="signupin_panel" class="a_arrows panel_body">
        <div>
          <p class="separator">You are logged in using your Twitter account.</p>
          <p id="twitter-button-signout" class="separator"><button type="button" onclick="NB.User.twitter.signout();">Sign out</button></p>
          ~;
          } else {
          print qq~
      <p id="signupin_header"><a href="javascript:;" id="signupin_header_a" class="panel_handle error">$autheticated Twitter Error</a></p>
      <div id="signupin_panel" class="a_arrows panel_body">
        <div>
          <p class="separator error">An error has occurred while trying to log into your Twitter account.</p>
          <p>Please try again.</p>
          <p id="twitter-button"></p>
          <script type="text/javascript">
            twttr.anywhere(function (T) {
              T("#twitter-button").connectButton({size:'small'});
            });
            NB.Nav.track(2,'Signupin', 'Signed in', 'Twitter error',0);
          </script>
          ~;
}

print qq~
        </div>
      </div>
  </div>
  <script type="text/javascript">
        NB.User.signedin($found_user_id,"$tw_full_name");
  </script>
~;

if ($follow == 1){
  my $password = get_password($twitter_pwfileloc);
  
  use Net::Twitter;

  my $nt = Net::Twitter->new(
      traits   => [qw/API::REST/],
      username => 'joegattnet',
      password => $password
  );

  my $result = $nt->follow_new($id_twitter);
}
