NB.User.resend = function(u) {
	NB.Ajax.html(
    'post',
    NB.User._container,
    NB.User._script,
    'mode=resend&sent_user_id='+u,true
  );
}