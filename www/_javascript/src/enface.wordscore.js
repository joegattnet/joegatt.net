NB.Enface.word_score = function(word){
  var letterValues = $.map(word.toLowerCase().split(''),function(letter){
    return NB.Anagram.anagram[$.inArray(letter,NB.alphanumArray)];
  });
  var acc = 0;
  var score = $.map(letterValues,function(letter){
    return acc + letter*-1/Math.abs(letter*-1);
  });
  return $.richArray.sum(score);
}
