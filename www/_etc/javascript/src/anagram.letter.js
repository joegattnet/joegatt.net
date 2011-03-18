var NB;
NB.Anagram.letter = function (e, k) {
  var j = $(e);
  var letter;
  if (NB.Enface.selectFlag || k === NB.keycodes.DEL || k === Event.KEY_BACKSPACE) {
    NB.Nav.track(1, 'KEY...', k);
    NB.Enface.selectFlag = false;
    NB.Anagram.recalculate_paragraph(e);
  }
  if (k === NB.keycodes.ENT) {
    return false;
  } else if (k >= 48 && k <= 57) {
    letter = k - 48;
  } else if (k >= 65 && k <= 90) {
    letter = k - 55;
  } else {
    return true;
  }
  NB.Anagram.dirty = true;
  j.data('dirty', true);
  var key_colourised = NB.cache['_c'+j.data('p')];
  if (key_colourised != undefined) {
    NB.Cache.remove();
  }
  var p = j.data('p');
  var before = NB.Anagram.anagram[letter];
  NB.Anagram.anagram[letter]++;
  var showcolor = (Math.abs(before) < Math.abs(NB.Anagram.anagram[letter]) ? NB.S.color.error : NB.S.color.ok);
  NB.Anagram.origArray[p][NB.Anagram.origArray[p].length] =  NB.alphanumArray[letter];
  var letter_panel = this.table[letter];
  var letter_cell = $(letter_panel).find('td');
  var letter_bg = ($(letter_panel).hasClass('even')?NB.S.color.stripe_even:NB.S.color.stripe_odd);
  $(letter_cell).text(NB.Anagram.anagram[letter]);
  NB.Enface.indicating = $(letter_panel).effect('highlight', {color: showcolor}, NB.S.anagramometer.fade);
  NB.Anagram.total_update();
  $('#alert').html(NB.Enface.check_text(e));
  if ($.richArray.in([32,186,188,190,221],k)) {
// What's this for?
// NB.Tools.colorize.do(e);
  }
}
