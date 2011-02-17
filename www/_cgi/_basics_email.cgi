#!/usr/bin/perl -T

sub email_confirm_registration {
  my $to_email = $_[0];
  my $username = $_[1];
  my $user_id = $_[2];
  my $code = $_[3];
  my $url = $_[4];
  $url =~ s/\/$//;
  my $template = 'confirm_registration';
  my $subject = 'Confirm email';
  my $from_email = "$serverName <register@joegatt.net>";
  
  send_email($template,$subject,$from_email,$to_email,$username,$user_id,$code,$url);
}

sub email_password_reset {
  my $to_email = $_[0];
  my $username = $_[1];
  my $user_id = $_[2];
  my $code = $_[3];
  my $url = $_[4];
  $url =~ s/\/$//;
  my $template = 'password_reset';
  my $subject = 'Password reset';
  my $from_email = "$serverName <register@joegatt.net>";
  
  send_email($template,$subject,$from_email,$to_email,$username,$user_id,$code,$url);
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
   $params{url}  = $_[7];
   $params{url_server}  = $serverName;
     
   use MIME::Lite::TT; 
   
   $template_txt = $template.'.txt';

   my %options; 
   $options{INCLUDE_PATH} = '../../_admin/_templates'; 
  
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
   $params{url_server}  = $serverName;
   
   use MIME::Lite::TT::HTML; 
   
   $template_txt = $template.'.txt';
   $template_html = $template.'.html';
   
   my %options; 
   $options{INCLUDE_PATH} = '../../_admin/_templates'; 
  
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

1;
