NB.User.clear = function (message) {
  NB.Ajax.html(
    'post', 
    NB.User._container, 
    NB.User._script, 
    'mode=signedin&found_username=' + NB.User.name + '&is_alert=' + ($('#signupin').hasClass('alert')?'alert':''), 
    false
  );
}