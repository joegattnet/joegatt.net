NB.Anagram.total_calc = function () {
  NB.Anagram.total = $.richArray.sumAbs(NB.Anagram.anagram);
  return NB.Anagram.total; 
}

NB.Anagram.total_update = function () {
  var total = NB.Anagram.total_calc();
  var score = Math.abs(this.total-this.snap);
  NB.Anagram.score = score;
  $('#total').text(NB.Number.commas(total));
	$('#change').html((total === NB.Anagram.snap?'':(total> NB.Anagram.snap?'&#x25bc;':'&#x25b2;') + score));
  $('#total').animate({color:(total === NB.Anagram.snap?NB.S.color.neutral:(total<NB.Anagram.snap?NB.S.color.ok:NB.S.color.error))}, 'fast');
  $('.version').text(NB.Anagram.total_version(total));
}

NB.Anagram.total_version = function (total) {
  return '0.' + (Math.pow(10, total.toString().length) - total);
}
