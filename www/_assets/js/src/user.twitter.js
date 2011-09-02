NB.User.twitter = {
  loggedin: function (user) {
    NB.Cookie.write('twuser', true);
    $('#signupin_header_a').text('Twitter...');
    NB.Ajax.html(
      'post', 
      NB.User._container, 
      NB.User._script_tw, 
      'tw_screen_name=' + user.data('screen_name') + '&tw_full_name=' + user.data('name') + '&sent_signup_url=' + encodeURIComponent(NB.crumb.canonical), 
      false
    );
  }, 
  signout: function () {
    //Twitter.signout throws an error
    twttr.anywhere.signOut();
    // try // Cookie.write('twuser', false);
    // try // location.reload();
  }, 
  button: function () {
    if (NB.external.twitter) {
      twttr.anywhere(function (T) {
        T("#twitter-button:empty").connectButton({size:'small'});
      });
    }
  }
}

/******************************************************************************/

NB.loaded_scripts.add(true, function () {
  if (NB.external.twitter) {
    twttr.anywhere.config({callbackURL: 'http://' + location.host + '/twitter-signedin.html'});
    twttr.anywhere(function (T) {
      if (T.isConnected()) {
        NB.User.twitter.loggedin(T.currentUser);    
      //Turn off twitter follow button if user follows me
      }
      T.bind('authComplete', function (e, user) {
        NB.User.twitter.loggedin(user);
      });
      T.bind('signOut', function () {
        NB.User.signout(false, true);
      });
    });
  }
  //Is this the best way?
  NB.User.twitter.button();
  $('body').bind('minor.loaded', NB.User.twitter.button);
});
