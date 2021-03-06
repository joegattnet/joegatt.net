#!/usr/bin/perl -T

require '../basics.pl';
require '../basics_pantography.pl';

$dbh = connectDBpantography();

# Get latest 
# SELECT DATE_FORMAT(date_created, '%a %b %d %T +0000 %Y')
my $sthLatest = $dbh->prepare(qq{
  SELECT MAX(text_id)
  FROM text 
});

#Store texts
my $sthText = $dbh->prepare(qq{
  REPLACE INTO text 
  (text, date_created, text_id, contributor_id) values (?, ?, ?, ?)
});

#Store user id
my $sthMetaContributor = $dbh->prepare(qq{
  INSERT IGNORE INTO contributors 
  (Id) values (?)
});

#Store user information
my $sthMetaContributorFull = $dbh->prepare(qq{
  REPLACE INTO contributors 
  (Id, twitter_username, twitter_realname) values (?, ?, ?)
});

#Get users without real name 
my $sthMetaContributorNoRealName = $dbh->prepare(qq{
  SELECT Id
  FROM contributors 
  WHERE twitter_realname IS NULL
  LIMIT 100
});

$sthLatest->execute();
my $text_id_latest = $sthLatest->fetchrow_array();

if ($text_id_latest eq '') {
  $text_id_latest = '12345'; # Arbitrary valid number
}

my $nt = twitterPantographyObject();    
my $statuses = $nt->home_timeline({ 
  count => 800,
  since_id => $text_id_latest,
  trim_user => true,
  include_rts => true 
});
twitterErrors($@);

my $statuses2 = $nt->search({
  q => $pantographyTwitterQuery,
  since_id => $text_id_latest,
  result_type => recent,
  with_twitter_user_id => true,
  trim_user => true,
  include_rts => true
});
twitterErrors($@);

for my $status ( @$statuses ) {
  $sanitizedStatus = sanitiseTextPantography($status->text);
  $sthText->execute(
    $sanitizedStatus, 
    $status->created_at, 
    $status->id, 
    $status->user->id
  );
  $sthMetaContributor->execute(
    $status->user->id
  );
}

for my $status ( @{$statuses2->{results}} ) {
  $sthText->execute(
    sanitiseTextPantography($status->text), 
    $status->created_at, 
    $status->id, 
    $status->from_user_id
  );
  $sthMetaContributor->execute(
    $status->from_user_id
  );
}

# Consolidate user data
# See https://dev.twitter.com/issues/79
$sthMetaContributorNoRealName->execute();
if ($sthMetaContributorNoRealName->rows){
  while (my $user_id = $sthMetaContributorNoRealName->fetchrow_array()){
    push (@user_ids, $user_id);
  };
  
  my $users = $nt->lookup_users({
    user_id => \@user_ids
  });
  for my $user ( @$users ) {
    $sthMetaContributorFull->execute(
      $user->id, 
      $user->screen_name,
      $user->name
    );
  };
}

$newStatuses = $sthText->rows;
$sthLatest->finish();
$sthText->finish();
$sthMetaContributor->finish();
$sthMetaContributorFull->finish();
$sthMetaContributorNoRealName->finish();
$dbh->disconnect();

if ($newStatuses != 0){
  pantographyTimeline();
}
