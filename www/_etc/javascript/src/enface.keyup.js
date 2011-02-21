NB.Enface.keyup = function(event){
  if(event.which==NB.keycodes.ESC) {
    NB.Enface.reset(event.target);
    return false;
  } else {
    NB.Anagram.letter(event.target,event.which);
  }
}
