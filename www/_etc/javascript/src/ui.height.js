NB.Ui.height = function(){
  if ($(window).height()<700){
    $('container').addClass('short-screen');
    NB.Cookie.write('short-screen','true');
    NB.Nav.track(2,'Window','short');
  } else {
    $('container').removeClass('short-screen');
    NB.Cookie.write('short-screen','false');
  }
}

/****************************************************************************/

$(document.body).bind('resize',function(){
  NB.Ui.height();
  NB.Nav.track(1,'Window','resize',document.viewport.getWidth()+'x'+$(window).height(),null);
});

$(NB.Ui.height);
