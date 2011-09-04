NB.Ui.caret = {
  store: function () {
//    cursorPos=document.selection.createRange().duplicate();
//    NB.Ui.caret._x = cursorPos.getBoundingClientRect().left;
//    NB.Ui.caret._y = cursorPos.getBoundingClientRect().top;
  }, 
  restore: function () {
//    cursorPos = document.body.createTextRange();
//    cursorPos.moveToPoint(NB.Ui.caret._x, NB.Ui.caret._y);
//    cursorPos.select();
  }, 
  _x: 0, 
  _y: 0
}
