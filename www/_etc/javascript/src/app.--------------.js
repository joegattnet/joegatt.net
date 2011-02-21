NB.App = {
  idling: function(){
    NB.App.focus = function(){return true;}, 
    NB.Appblur = function(){return true;},
    NB.Appkeyup = function(){return true;},
    NB.Appreset = function(){return true;}
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

$('body').bind('content.loaded',function(){
  if(NB.crumb.page_type == 'enface'){
    NB.Enface.invoke();
  } else {
    NB.Enface.invoked = false;
    NB.App.idling();
  }
});
