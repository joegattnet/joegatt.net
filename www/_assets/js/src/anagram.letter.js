/*global NB: true, global Event: true, global $: true */
NB.Anagram.letter = function (e, k) {
  var before, j, key_colourised, letter, letter_bg, letter_cell, letter_panel, p, showcolor;
  j = $(e);
  if (NB.Enface.selectFlag || k  === NB.keycodes.DEL || k  === NB.keycodes.BAK) {
    NB.Nav.track(1, 'KEY...', k);
    NB.Enface.selectFlag = false;
    NB.Anagram.recalculate_paragraph(e);
    return;
  }
  if (k  === NB.keycodes.ENT) {
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
  key_colourised = NB.cache['_c' + j.data('p')];
  if (key_colourised !== undefined) {
    NB.Cache.remove(key_colourised);
  }
  p = j.data('p');
  before = NB.Anagram.anagram[letter];
  NB.Anagram.anagram[letter] += 1;
  showcolor = (Math.abs(before) < Math.abs(NB.Anagram.anagram[letter]) ? NB.S.color.error : NB.S.color.ok);
  NB.Anagram.origArray[p][NB.Anagram.origArray[p].length] =  NB.alphanumArray[letter];
  letter_panel = this.table[letter];
  letter_cell = $(letter_panel).find('td');
  letter_bg = ($(letter_panel).hasClass('even') ? NB.S.color.stripe_even : NB.S.color.stripe_odd);
  $(letter_cell).text(NB.Anagram.anagram[letter]);
  NB.Enface.indicating = $(letter_panel).effect('highlight', {color: showcolor}, NB.S.anagramometer.fade);
  NB.Anagram.total_update();
  $('#alert').html(NB.Enface.check_text(e));
// if ($.richarray.isin([32, 186, 188, 190, 221], k)) {
// What's this for?
// NB.Tools.colorize.colorize(e);
//  }
};
