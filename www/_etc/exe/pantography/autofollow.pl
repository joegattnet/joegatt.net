#!/usr/bin/perl -T

require '../basics.pl';
require '../basics_pantography.pl';

my $nt = twitterPantographyObject();

my @followers = $nt->followers_ids({});
my @friends = $nt->friends_ids({});

@notfolloweds{ @$followers } = @$followers;
delete @notfolloweds{ @$friends };

my $followingNew = 0;
for $notfollowed (keys %notfolloweds) {
  my $friends = $nt->follow_new({
    user_id => $notfolloweds{$notfollowed}
  });
  print "Now following: " . $notfolloweds{$notfollowed} . "\n";
  $followingNew++;
}

if ($followingNew > 0) {
  print "\nFollowing new: $followingNew\n";
}

twitterErrors($@);
