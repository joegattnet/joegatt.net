#!/usr/bin/perl -T

use WWW::TarPipe;

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
  $sth->finish();

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
  (SELECT TIMESTAMPDIFF(MINUTE, date_created,UTC_TIMESTAMP())>? FROM log_broadcast WHERE broadcast=1 ORDER BY date_created DESC LIMIT 1) 
  AND 
  (SELECT TIMESTAMPDIFF(MINUTE, date_created,UTC_TIMESTAMP())>? FROM comments WHERE type=0 ORDER BY date_created DESC LIMIT 1);
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
  
  my $password = get_password($twitter_pwfileloc);
  #This needs to catch the error if the connection fails
  
    use Net::Twitter;
    use Scalar::Util 'blessed';
  
    my $nt = Net::Twitter->new(
        traits   => [qw/API::REST/],
        username => 'joegattnet',
        password => $password
    );
  
    if($message !~ /errorMessage/){
      my $result = $nt->update($message);
    }
    return $result;
}

sub diffuse_tarpipe {
  my $message = $_[0];
  
  my $password = get_password($twitter_pwfileloc);
  #This needs to catch the error if the connection fails
  
#Not sure the tarpipe server is reliable
#    if ($serverName ne 'joegatt.net') {
#      $key = ''; # Dev
#    } elsif ($broadcast){
#      $key = ''; # All
#    } else {
#      $key = ''; # Throttled
#    }
    
#    my $tp = WWW::TarPipe->new( 
#      key => $key
#    );
    
#    $tp->upload(
#      title => $message
#    );
  
}

1;
