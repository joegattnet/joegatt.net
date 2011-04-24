NB.User = {
  id: 0,
  name: '',
  level: 0,
  _script: '/_etc/cgi/users/signupin.cgi',
  _script_fb: '/_etc/cgi/users/signupin_facebook.cgi',
  _script_tw: '/_etc/cgi/users/signupin_twitter.cgi',
  _container: '#signupin_container'
}

/******************************************************************************/

NB.loaded_scripts.add(function(){
	NB.Ajax.html(
    'post',
    NB.User._container,
    NB.User._script,
    'startup=true',
    false
  );
});
