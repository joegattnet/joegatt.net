#!/usr/bin/perl -T
require '../_cgi/_basics.cgi';

use lib '/home/joegatt1/perl/usr/local/lib/perl5/site_perl/5.8.8';

print ("Content-Type: text/html; charset=UTF-8\n\n");

email_confirm_registration('joe.gatt@gmail.com','belinda','197','AXJ9WP');

sub email_confirm_registration {
  my $to_email = $_[0];
  my $username = $_[1];
  my $user_id = $_[2];
  my $code = $_[3];

  send_email('confirm_registration','Please confirm your email address','joegatt.net <info@joegatt.net>',$to_email,$username,$user_id,$code);
}

sub send_email {
   my $template = $_[0];
   my $subject = $_[1];
   my $from_email = $_[2];
   my $to_email = $_[3];

   my %params; 
   $params{show_name} = $_[4]; 
   $params{user_id}  = $_[5];
   $params{code}  = $_[6];
     
   use MIME::Lite::TT; 
   
   $template_txt = $template.'.txt';

   my %options; 
   $options{INCLUDE_PATH} = '../_admin/_templates'; 
  
   my $msg = MIME::Lite::TT->new( 
              From        =>  $from_email,
              To          =>  $to_email,
              Bcc         =>  'archive@joegatt.net',
              Subject     =>  $subject, 
              Template    =>  $template_txt,
              TmplOptions =>  \%options, 
              TmplParams  =>  \%params,
   ); 

  $ENV{'PATH'} = untaint($ENV{'PATH'});
  $msg->send();
}

sub send_email_html {
   my $template = $_[0];
   my $subject = $_[1];
   my $from_email = $_[2];
   my $to_email = $_[3];

   my %params; 
   $params{show_name} = $_[4]; 
   $params{user_id}  = $_[5];
   $params{code}  = $_[6];
   
   use MIME::Lite::TT::HTML; 
   
   $template_txt = $template.'.txt';
   $template_html = $template.'.html';
   
   my %options; 
   $options{INCLUDE_PATH} = '../_admin/_templates'; 
  
   my $msg = MIME::Lite::TT::HTML->new( 
              From        =>  $from_email,
              To          =>  $to_email, 
              Bcc         =>  'archive@joegatt.net',
              Subject     =>  $subject, 
              Template    =>  {
                                  text    =>  $template_txt,
                                  html    =>  $template_html,
                              },
              TmplOptions =>  \%options, 
              TmplParams  =>  \%params,
   ); 

  $ENV{'PATH'} = untaint($ENV{'PATH'});
  $msg->send();
}
