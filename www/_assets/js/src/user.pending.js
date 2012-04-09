NB.User.pending = {
  //This hould be converted to localStorage
  //https://github.com/jas-/jQuery.handleStorage
  add: function (actions, duration) {
    var duration = duration || 60;
    var pending = NB.Cookie.read('pending_actions');    
    pending = (pending?pending + ';':'') + escape(actions);
    NB.Cookie.write('pending_actions', pending, '/', duration);
  }, 
  run: function () {
    var pending = NB.Cookie.read('pending_actions');
    if (pending) {
      NB.Nav.track(1, 'Evaluating pending actions...');
      pending = unescape(pending);
      pending.replace(/user_id=(\b|0)/, 'user_id=' + NB.User.id);
      eval(pending);
      NB.Cookie.remove('pending_actions');
    }
  }
}

/******************************************************************************/

$('body').bind('signedin.user', NB.User.pending.run);
