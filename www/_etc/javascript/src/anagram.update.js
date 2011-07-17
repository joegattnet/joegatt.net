NB.Anagram.update = function () {
  $(NB.Anagram.table).each(function (i, e) {
    $(this).find('td').text(NB.Anagram.anagram[i]);
  });
  NB.Anagram.total_update();
};
