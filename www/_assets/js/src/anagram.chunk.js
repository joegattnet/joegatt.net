NB.Anagram.recalculate_paragraph = function (e) {
  var j = $(e);
  NB.Nav.track(1, 'Recalculate paragraph');
  var currentArray = NB.String.strip(e.innerHTML).toLowerCase().split('');
	$.each(NB.alphanumArray, function (index, value) {
      var origCount = $.richArray.filter(NB.Anagram.origArray[j.data('p')], function (c) {
          return c === value;
      });
      var currentCount = $.richArray.filter(currentArray, function (c) {
      		return c === value;
      });
			NB.Anagram.anagram[index] = (NB.Anagram.anagram[index] - origCount.length) + currentCount.length;
	});
	NB.Anagram.update();
	NB.Anagram.origArray[j.data('p')] = currentArray;
  $('#alert').html(NB.Enface.check_text(e));
}
