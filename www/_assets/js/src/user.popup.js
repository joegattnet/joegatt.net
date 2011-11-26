NB.User.popup = function (message) {
  if (message) {
    var full_message = "To " + message + "  you need to be registered and logged in.";
    if ($('#signupin p.alert').length === 0) {
      $('#signupin_panel >  div').prepend('<p class="alert"> ' + full_message + '</p> ');
    } else {
      $('#signupin p.alert').html(full_message);
    }
  }
  NB.Ui.screencover.show();
  $('#signupin').addClass('alert');
  $('#signupin').removeClass('panel_closed');
  if (NB.external.twitter) {
    NB.loaded_scripts.add(true, function () {
      twttr.anywhere(function (T) {
        T("#twitter-button:empty").connectButton({size:'small'});
      });
      //Hack - twitter hides buttons for some reason
      $("#twitter-button iframe").css({display:'inline'});
    });
  }
}
