NB.Anagram = function () {
  this.anagram = []; 
  this.total = 0; 
  this.snap = 0; 
  this.score = 0; 
  this.dirty = false; 
  this.origArray = []; 
  this.table = $('#anagramometer tr');
};

NB.Anagram.prototype.recalculate_paragraph = function (e) {
  var j = $(e),
    anagram = this;
  NB.Nav.track(1, 'Recalculate paragraph');
  var currentArray = NB.String.strip(e.innerHTML).toLowerCase().split('');
	$.each(NB.alphanumArray, function (index, value) {
      var origCount = $.richArray.filter(this.origArray[j.data('p')], function (c) {
          return c === value;
      });
      var currentCount = $.richArray.filter(currentArray, function (c) {
      		return c === value;
      });
			anagram.anagram[index] = (anagram.anagram[index] - origCount.length) + currentCount.length;
	});
	this.update();
	this.origArray[j.data('p')] = currentArray;
  $('#alert').html(NB.App.check_text(e));
};

NB.Anagram.prototype.get = function () {
  if (NB.cache['_anagram']!=undefined) {
      this.anagram = NB.cache['_anagram'].data;
      NB.Nav.track(1, "Retrieved from NB.cache: _anagram.");
  } else {
     $.getJSON('/_etc/cache/enface--anagram-b=' + NB.book.id + '.json', function (data) {
  	  NB.Ajax._done('#anagramometer');
      this.anagram = data.anagram;
      NB.Cache.add('_anagram', this.anagram);    
      this.snap = this.total_calc();
      this.update();
  //    NB.Tools.colorize();
    });
    NB.Ajax._active('#anagramometer');
  }
};

/*global NB: true, global Event: true, global $: true */
NB.Anagram.prototype.letter = function (e, k) {
  var before, j, key_colourised, letter, letter_bg, letter_cell, letter_panel, p, showcolor;
  j = $(e);
  if (NB.App.selectFlag || k  === NB.keycodes.DEL || k  === NB.keycodes.BAK) {
    NB.Nav.track(1, 'KEY...', k);
    NB.App.selectFlag = false;
    this.recalculate_paragraph(e);
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
  this.dirty = true;
  j.data('dirty', true);
  key_colourised = NB.cache['_c' + j.data('p')];
  if (key_colourised !== undefined) {
    NB.Cache.remove(key_colourised);
  }
  p = j.data('p');
  before = this.anagram[letter];
  this.anagram[letter] += 1;
  showcolor = (Math.abs(before) < Math.abs(this.anagram[letter]) ? NB.S.color.error : NB.S.color.ok);
  this.origArray[p][this.origArray[p].length] =  NB.alphanumArray[letter];
  letter_panel = this.table[letter];
  letter_cell = $(letter_panel).find('td');
  letter_bg = ($(letter_panel).hasClass('even') ? NB.S.color.stripe_even : NB.S.color.stripe_odd);
  $(letter_cell).text(this.anagram[letter]);
  NB.App.indicating = $(letter_panel).effect('highlight', {color: showcolor}, NB.S.anagramometer.fade);
  this.total_update();
  $('#alert').html(NB.App.check_text(e));
// if ($.richarray.isin([32, 186, 188, 190, 221], k)) {
// What's this for?
// NB.Tools.colorize.colorize(e);
//  }
};

NB.Anagram.prototype.total_calc = function () {
  this.total = $.richArray.sumAbs(this.anagram);
  return this.total; 
};

NB.Anagram.prototype.total_update = function () {
  var total = this.total_calc();
  var score = Math.abs(this.total-this.snap);
  this.score = score;
  $('#total').text(NB.Number.commas(total));
	$('#change').html((total === this.snap?'':(total> this.snap?'&#x25bc;':'&#x25b2;') + score));
  $('#total').animate({color:(total === this.snap?NB.S.color.neutral:(total<this.snap?NB.S.color.ok:NB.S.color.error))}, 'fast');
  $('.version').text(this.total_version(total));
};

NB.Anagram.prototype.total_version = function (total) {
  return '0.' + (Math.pow(10, total.toString().length) - total);
};

NB.Anagram.prototype.update = function () {
  var anagram = this;
  $(this.table).each(function (i, e) {
    $(this).find('td').text(anagram.anagram[i]);
  });
  this.total_update();
};
