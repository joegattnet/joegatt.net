NB.Ui.debug = function(event) {
  $('body').toggleClass('debug');
  NB.Cookie.write('debug',$('body').hasClass('debug'),'/');
  return false;
}

/******************************************************************************/

$(window).keydown(function(event){
  if(NB.debug && event.which==NB.keycodes.F10) {
    NB.Ui.debug();
  }
});
