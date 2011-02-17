NB.Enface.reset = function(e,focus){
  var focus = focus || true;
  NB.Tools.colorize.undo(e);
  NB.Versions.unversion(e);
  NB.Editors.add(e);
  $('.app').data('dirty',false);
  if(NB.Anagram.score!=0){
    $('#total').animate({color:NB.S.color.neutral},NB.S.speed.fast);
    NB.Anagram.total_update();
    $('#change').text('');
    NB.Anagram.score = 0;
    NB.Anagram.dirty = false;
  }
  //if(focus){
  //  $(e).focus();
  //}
  return e;
}
