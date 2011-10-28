NB.User.signedin = function (this_user_id, username, level, mode) {
  NB.User.id = this_user_id;
  NB.User.name = username;
  NB.User.level = level || 0;
  if (!$('#signupin').hasClass('panel_closed')) {
    $('#signupin_panel').effect('highlight', NB.S.speed.slower);
  }
  var hide = setTimeout(function () {
      $('#signupin').addClass('panel_closed');
    }, NB.S.speed.slower);
  NB.Ui.screencover.hide();
  $(window).scrollTop(0);
  $('body').trigger('signedin.user');
  NB.Cookie.write('user_id', this_user_id);
  NB.Nav.track(2, 'Signupin', 'Signed in', mode, 0);
};
