NB.User.pending = {
  add: function(actions,duration) {
    var duration = duration || 60;
    var pending = NB.Cookie.read('pending_actions');    
    pending = (pending?pending+';':'') + escape(actions);
    NB.Cookie.write('pending_actions',pending,'/',duration);
  },
  run: function(){
    var pending = NB.Cookie.read('pending_actions');
    if(pending){
      NB.Nav.track(1,'Evaluating pending actions...');
      pending.replace(/user_id=(\b|0)/,'user_id='+NB.User.id);
      eval(unescape(pending));
      NB.Cookie.remove('pending_actions');
    }
  }
}

/******************************************************************************/

$('body').bind('signedin.user',NB.User.pending.run);
