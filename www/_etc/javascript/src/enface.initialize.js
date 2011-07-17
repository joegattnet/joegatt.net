NB.Enface.initialize = function (p) {
  NB.Anagram.get();
  NB.Anagram.snap = NB.Anagram.total_calc();
  $('.app').each(function (i, e) {
     NB.Editors.add(e);
     var j = $(e);
		 j.data('alert', '');
		 j.data('dirty', false);
		 j.data('error_status', 0);
		 NB.Anagram.origArray[p + i] = j.text().toLowerCase().split('');
		});
  NB.Enface.get_target(p).focus();
}
