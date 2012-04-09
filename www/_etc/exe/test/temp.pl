#!/usr/bin/perl -T

print ("Content-Type: text/html; charset=UTF-8\n\n");

require '../basics.pl';
require '../basics_broadcast.pl';

#diffuse_twitter("http://joegatt.net v2.0 now live...");

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

$high_water = 0;

eval {
      #since_id => $high_water
      #Parameters: since_id, max_id, count, page, skip_user, trim_user, include_entities, include_rts
      #http://search.cpan.org/~mmims/Net-Twitter-3.17001/lib/Net/Twitter.pod
      #https://dev.twitter.com/docs/api/1/get/statuses/friends_timeline
      #Try to minimise data set
      #since ... date
      #since_id ... id
      
      my $statuses = $nt->friends_timeline({ since_id => 31391872962273280, count => 800 });
          print "<table><tr><td>status</td><td>$status->{created_at}</td><td>$status->{user}{screen_name}</td><td>$status->{text}</td></tr>";
      for my $status ( @$statuses ) {
          print "<tr><td>$status->{id}</td><td>$status->{created_at}</td><td>$status->{user}{name}</td><td>$status->{user}{screen_name}</td><td>$status->{text}</td></tr>";
      }
          print "</table>";
  };
  if ( my $err = $@ ) {
      die $@ unless blessed $err && $err->isa('Net::Twitter::Error');

      warn "HTTP Response Code: ", $err->code, "\n",
           "HTTP Message......: ", $err->message, "\n",
           "Twitter error.....: ", $err->error, "\n";
  }

print qq~<hr>Anything...?~;
