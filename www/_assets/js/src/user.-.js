NB.User = {
  id: 0, 
  name: '', 
  level: 0, 
  _script: '/_etc/exe/users/signupin.pl', 
  _script_fb: '/_etc/exe/users/signupin_facebook.pl', 
  _script_tw: '/_etc/exe/users/signupin_twitter.pl', 
  _container: '#signupin_container'
}

/******************************************************************************/

NB.loaded_scripts.add(false, function () {
	NB.Ajax.html(
    'post', 
    NB.User._container, 
    NB.User._script, 
    'startup=true', 
    false
  );
});
