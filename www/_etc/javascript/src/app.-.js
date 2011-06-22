NB.App = {
  idling: function(){
    NB.App.focus = function(){return true;}, 
    NB.App.blur = function(){return true;},
    NB.App.keyup = function(){return true;},
    NB.App.reset = function(){return true;}
    NB.Nav.track(1,'NB.App idling.');
  },
  events: function(){
    $('.app','#content').unbind('focus.app',NB.App.focus);
    $('.app','#content').unbind('blur.app',NB.App.blur);
    $('.app','#content').unbind('keyup.app',NB.App.keyup);
    $('.app','#content').bind('focus.app',NB.App.focus);
    $('.app','#content').bind('blur.app',NB.App.blur);
    $('.app','#content').bind('keyup.app',NB.App.keyup);
  }
}

/******************************************************************************/

$('body').bind('content.loaded', function(){
  if(NB.crumb.page_app == 'enface'){
    NB.Enface.invoke();
  } else {
    NB.Enface.invoked = false;
    NB.App.idling();
  }
});
