NB.User.password = {
  reset: function (user_id, username) {
    NB.Ajax.html(
      'post', 
      NB.User._container, 
      NB.User._script, 
      'mode=password&sent_user_id=' + NB.User.id + '&is_alert=' + ($('#signupin').hasClass('alert')?'alert':''), 
      false
    );
  },
  change: function (user_id, username) {
    NB.Ajax.html(
      'post', 
      NB.User._container, 
      NB.User._script, 
      'mode=changepassword&sent_user_id=' + NB.User.id + '&is_alert=' + ($('#signupin').hasClass('alert')?'alert':''), 
      false
    );
  }
}