NB.User.password = function (user_id, username) {
  NB.Ajax.html(
    'post', 
    NB.User._container, 
    NB.User._script, 
    'mode=password' + '&is_alert=' + ($('#signupin').hasClass('alert')?'alert':''), 
    false
  );
}