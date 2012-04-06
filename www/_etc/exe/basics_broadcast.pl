#!/usr/bin/perl -T

sub broadcast_log {
  my $text = $_[0];
  my $url = $_[1];
  my $log = $_[2];
  my $all = $_[3];
  my $user = $_[4];
  
  $text = substr $text, 0, 138;
  $message = trim_message($text,$url,$user);
  log_message($message,0);

  return $message;
}

sub broadcast_transmit {

  $dbh = connectDB();

  $sql = "SELECT IF((broadcast=0),text,''),Id FROM log_broadcast ORDER BY date_created DESC LIMIT 1";
  $sth = $dbh->prepare("$sql");
  $sth->execute();

  my ($text,$Id) = $sth->fetchrow_array();

  if ($text ne '') {
    my $result = diffuse($text);
    $sql = "UPDATE log_broadcast SET broadcast=1 WHERE Id=?";
    $sth = $dbh->prepare("$sql");
    $sth->execute($Id);
  }
  
  $sth->finish();
  $dbh->disconnect();
  
  return $result;

}

sub broadcast {
  my $text = $_[0];
  my $url = $_[1];
  my $log = $_[2];
  my $all = $_[3];
  my $user = $_[4];
  
  $text = substr $text, 0, 138;
  $message = trim_message($text,$url,$user);
  my $throttle = broadcast_throttle(5);
  if ($all || $throttle) {
    $broadcast = 1;
  } else {
    $broadcast = 0;
  }
  diffuse($message,$broadcast);

  if ($log) {
    log_message($message,$broadcast);
  }

  return $message;
}


sub trim_message {
  my $text = $_[0];
  my $url = $_[1];
  my $user = $_[2];

  #check to replace user with their @twitter account
  
  if($url !~ /^http/) {
    $url = "http://$url";
  }
  
  #if($url !~ /joegatt\.net/)
  $url = get_bitly($url);
  
  $text = simplifyText($text);

  if(length("$text $url")>135) {
    $text = substr $text, 0, 125-length($url);
    $text = $text.'...'; 
  }

  $message = "$text $url";

  return $message;

}

sub log_message {
  my $message = $_[0];
  my $broadcast = $_[1];

  $dbh = connectDB();

  $sql = "INSERT INTO log_broadcast (text,date_created,broadcast) VALUES (?,UTC_TIMESTAMP(),?);";
  $sth = $dbh->prepare("$sql");
  $sth->execute($message,$broadcast);
  
  $sth->finish();
  $dbh->disconnect();
}

sub broadcast_throttle {
  $throttle = $_[0] + int(rand($_[0])); #prevents users second-guessing
  $dbh = connectDB();
  
  #check log_broadcast and any non-logged events
  #comments are not logged so as not to duplicate entries too much
  $sql = qq~
    SELECT 
      (SELECT TIMESTAMPDIFF(minUTE, date_created,UTC_TIMESTAMP())>? FROM log_broadcast WHERE broadcast=1 ORDER BY date_created DESC LIMIT 1) 
    AND 
      (SELECT TIMESTAMPDIFF(minUTE, date_created,UTC_TIMESTAMP())>? FROM comments WHERE type=0 ORDER BY date_created DESC LIMIT 1);
  ~;
  
  $sth = $dbh->prepare("$sql");
  $sth->execute($throttle,$throttle);
  ($result) = $sth->fetchrow_array();
  
  $sth->finish();
  $dbh->disconnect();

  return $result;
}


sub diffuse {
  my $message = $_[0];
  return diffuse_twitter($message);
}

sub diffuse_twitter {
  my $message = $_[0];
  
  my $twitter_consumersecret = get_password($twitter_consumersecretloc);
  my $twitter_accesstokensecret = get_password($twitter_accesstokensecretloc);
  
  use Net::Twitter;
  use Scalar::Util 'blessed';
  
  my $nt = Net::Twitter->new(
      traits              => [qw/API::REST OAuth/],
      consumer_key        => $twitter_consumerkey,
      consumer_secret     => $twitter_consumersecret,
      access_token        => $twitter_accesstoken,
      access_token_secret => $twitter_accesstokensecret
  );

  if($message !~ /errorMessage/){
    my $result = eval { $nt->update($message) };
  }
  
  warn "$@\n" if $@;
  
  return $result;
}

1;
