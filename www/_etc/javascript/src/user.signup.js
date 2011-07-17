NB.User.signup = function (message) {
  NB.Ajax.html(
    'post', 
    NB.User._container, 
    NB.User._script, 
    'mode=signup&sent_alert=' + message + '&is_alert=' + ($('#signupin').hasClass('alert')?'alert':''), 
    false
  );
}
