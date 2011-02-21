NB.Anagram.recalculate_paragraph = function(e) {
//NB.Nav.track(1,'Recalculate paragraph');
  var currentArray = NB.String.strip(e.innerHTML).toLowerCase().split('');
	NB.alphanumArray.each(function(i){
	var origCount = NB.Anagram.origArray[e.data('p')].findAll(function(c) {
					return c == item;
			});
			var currentCount = currentArray.findAll(function(c) {
					return c == item;
			});
			NB.Anagram.anagram[i] = (NB.Anagram.anagram[i] - origCount.size()) + currentCount.size();
	});
	NB.Anagram.update();
	NB.Anagram.origArray[e.data('p')] = currentArray;
  $('#alert').html(NB.Enface.Paragraphs.check_text(e));
}
