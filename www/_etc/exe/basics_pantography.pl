#!/usr/bin/perl -T

use Net::Twitter;
use Scalar::Util 'blessed';

# ******************************************************************************

  #require 'config/common.pl';

	$serverName = $ENV{"SERVER_NAME"};
	$uri = $ENV{"REQUEST_URI"};
 	$root = '/';
 	$debug = 1;
  
  $pantographyTwitterQuery = '#pantography|@pantography|joegatt.net/pantography';
  $pantographyAlphabet = "0123456789\.,;:_@!?/#()%'-+= abcdefghijklmnopqrstuvwxyz";

  $pantographyTwitterId = '394339242';
  $pantographyUsername = 'pantography';

  $twitter_pantography_consumerkey = 'LcP5KZsVECxlI7Z7aWz86g';
  $twitter_pantography_accesstoken = '237443494-Up97qun1nvHfxO79kWlGbt6lvQIFY71vWgMjyTR4';
  
  $twitter_pantography_consumersecretloc = '/home/admin/_db_passwords/joegatt-net/twitter_pantography_consumersecret-dev.txt';
  $twitter_pantography_accesstokensecretloc = '/home/admin/_db_passwords/joegatt-net/twitter_pantography_accesstokensecret-dev.txt';
  
  if ($serverName eq 'test.joegatt.org') {
  	$pantography_dsn = 'DBI:mysql:joegatt-net-test-pantography:localhost';
  }	elsif ($serverName =~ /joegatt\.org/) {
  	$pantography_dsn = 'DBI:mysql:joegatt-net-dev-pantography:localhost';
  } else {
    $pantography_dsn = 'DBI:mysql:joegatt-net-production-pantography:localhost';

    $twitter_pantography_consumerkey = 'pSOQzJ8EBTbrmg3JyFfuTA';
    $twitter_pantography_accesstoken = '394339242-z0wJ77ThaBLKC3etaXhkAoSRtvjwA8BevK6aEBRq';
    
    $twitter_pantography_consumersecretloc = '/home/admin/_db_passwords/joegatt-net/twitter_pantography_consumersecret.txt';
    $twitter_pantography_accesstokensecretloc = '/home/admin/_db_passwords/joegatt-net/twitter_pantography_accesstokensecret.txt';
  }

# ******************************************************************************

sub connectDBpantography {
  parseDBcredentials();
  use DBI;
	my $dbh = DBI->connect("$pantography_dsn", $db_user_name, $db_password)or die warn "<p class='error'>Can't connect to $dsn!</p>";#$DBI::errstr;
	return $dbh;
}

# ******************************************************************************

sub quickDBpantography {
  parseDBcredentials();
	my $dbh = connectDBpantography();
	$dbh->do($_[0]);
  my $id = $dbh->last_insert_id(undef, undef, $_[2], ID);
	$dbh->disconnect();
	return $id;
}

# ******************************************************************************

sub nextText {
  my $phrase = $_[0];
  my $alphabetString = $pantographyAlphabet;
  my @alphabet = split(//, $alphabetString);
  my $alphabetNoSpaceString = $alphabetString;
  $alphabetNoSpaceString =~ s/ //g;
  my @alphabetNoSpace = split(//, $alphabetNoSpaceString); 
  my $firstLetter = @alphabet[0];
  my $lastLetter = @alphabet[-1];
  my @letters = split(//, $phrase);
  my $solved = 0;
  my $position = $#letters;

  if($phrase eq '') {
    return $firstLetter;
  } else {
    while (! $solved) {
       if(@letters[$position] eq $lastLetter) {
         @letters[$position] = $firstLetter;
         if($position > 0){
           $position--;
         } else {
           unshift(@letters, $firstLetter);
           $solved = 1;
         }
       } else {
         #Condition to avoid leading, trailing and multiple spaces
         if ($position == 0 || $position == $#letters || @letters[$position - 1] eq '') {
          @letters[$position] = @alphabetNoSpace[index($alphabetNoSpaceString, @letters[$position]) + 1];
         } else {
          @letters[$position] = @alphabet[index($alphabetString, @letters[$position]) + 1];
         }
         $solved = 1;
       }
    }
    return join('', @letters);
  }            
}

# ******************************************************************************

sub pantographyLatest {
  #Get latest self-generated text
  my $sth = $dbh->prepare(qq{
    SELECT text 
    FROM `text` 
    WHERE contributor_id IS NULL
    OR contributor_id = ? 
    ORDER BY date_created 
    DESC LIMIT 1
  });
  $sth->execute($pantographyTwitterId);
  my $latestText = $sth->fetchrow_array();
  return $latestText;
}

# ******************************************************************************

sub twitterPantographyObject {
  my $twitter_pantography_consumersecret = get_password($twitter_pantography_consumersecretloc);
  my $twitter_pantography_accesstokensecret = get_password($twitter_pantography_accesstokensecretloc);
  my $nt = Net::Twitter->new(
      traits              => [qw/API::REST API::Search OAuth InflateObjects/],
      consumer_key        => $twitter_pantography_consumerkey,
      consumer_secret     => $twitter_pantography_consumersecret,
      access_token        => $twitter_pantography_accesstoken,
      access_token_secret => $twitter_pantography_accesstokensecret
  );
  return $nt;
}

# ******************************************************************************

sub diffuse_twitter_pantography {
  my $message = $_[0];
  my $nt = twitterPantographyObject;
  if($message !~ /errorMessage/){
    my $result = eval { $nt->update($message) };
  }
  twitterErrors($@);
  return $result;
}

# ******************************************************************************

sub twitterErrors {
  if ( my $err = $_[0] ) {
    die $@ unless blessed $err && $err->isa('Net::Twitter::Error');
    warn "HTTP Response Code: ", $err->code, "\n",
         "HTTP Message......: ", $err->message, "\n",
         "Twitter error.....: ", $err->error, "\n";
  }
}

# ******************************************************************************

sub sanitiseTextPantography {
  use utf8;
  use Text::Unidecode;
  use XML::Entities;

  my $text = $_[0];
  $text = XML::Entities::decode('all', $text);
  $text =~ s/"|“|”|\‘|\’/'/g;
  $text =~ s/\&/+/g;
  $text =~ s/\[\{/(/g;
  $text =~ s/\]\}/)/g;
  $text = lc($text);
  $text = unidecode($text);
  $text =~ s/[^$pantographyAlphabet]//g;
  return $text;    
}

1;
