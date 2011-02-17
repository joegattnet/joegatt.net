var tracker = 0;

NB.Nav.track = function(mode, category, action, optional_label, optional_value){
  tracker++;
  if(window.console){
    console.log(mode, tracker, category, (action||''), (optional_label||''), (optional_value||0));
  }
  if(mode>0){
    // Alert to /{code}
  }
  if(mode>1){
    if(category == '_trackPageview'){
      _gaq.push(['_trackPageview', action]);
    } else {
      _gaq.push(['_trackEvent', category, (action||''), (optional_label||''), (optional_value||'')]);
    }
  }
}

/*******************************************************************************

See http://getfirebug.com/logging

*/
