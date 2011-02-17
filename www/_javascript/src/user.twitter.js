NB.User.twitter = {
  loggedin: function(user){
    NB.Cookie.write('twuser',true);
    $('#signupin_header_a').text('Logging in (Twitter)...');
    NB.Ajax.html(
      'post',
      NB.User._container,
      NB.User._script_tw,
      'tw_screen_name='+user.data('screen_name')+'&tw_full_name='+user.data('name')+'&sent_signup_url='+encodeURIComponent(NB.crumb.canonical),
      false
    );
  },
  signout: function(){
    //Twitter.signout throws an error
    twttr.anywhere.signOut();
    // try // Cookie.write('twuser',false);
    // try // location.reload();
  }
}

/******************************************************************************/

jQuery(function() {
  if(NB.external.twitter){
    twttr.anywhere(function (T) {
      if (T.isConnected()) {
        NB.User.twitter.loggedin(T.currentUser);    
      //Turn off twitter button if user follows me
      }
      T.bind('authComplete', function (e, user) {
        NB.User.twitter.loggedin(user);
      });
      T.bind('signOut', function () {
        NB.User.signout(false,true);
      });
    });
  }
});
