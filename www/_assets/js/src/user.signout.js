NB.User.signout = function (fbuser, twuser) {
  $('#signupin').addClass('panel_closed');
  NB.User.id = 0;
  NB.User.name = '';
  NB.User.level = 0;
  NB.Cookie.remove('rememberme');
  NB.Cookie.remove('user_id');
  NB.Cookie.remove('rmcode');
  NB.Cookie.remove('twuser');
  NB.Cookie.remove('fbuser');
  NB.Ajax.html(
    'get', 
    NB.User._container, 
    NB.User._script, 
    'mode=signin&is_alert=' + ($('#signupin').hasClass('alert')?'alert':'') + '&fbuser=' + fbuser + '&twuser=' + twuser, 
    false
  );
  $(window).scrollTop(0);
  $('body').trigger('signedout.user');
  NB.Nav.track(2, 'Signupin', 'Signed out');
}
