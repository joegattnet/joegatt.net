var tracker = 0;

NB.Nav.track = function(mode, category, action, optional_label, optional_value){
  if(window.console){
    console.log(mode, category, (action||''), (optional_label||''), (optional_value||0));
  }
  if(mode>0){
    $('#track li:first').show();
    $('#track li:first').before('<li style="display:none;">'+ (category||'') + (action||'') + (optional_label||'') + (optional_value||'') + '</li>');
    $('#track li:first').show('blind');
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
