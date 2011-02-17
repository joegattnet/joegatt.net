NB.Anagram.get = function(){
  if(NB.cache['_anagram']!=undefined){
      NB.Anagram.anagram = NB.cache['_anagram'].data;
      NB.Nav.track(1,"Retrieved from NB.cache: _anagram.");
  } else {
     $.getJSON('../_cgi/content/anagram_get.cgi?b='+NB.book.id+'&jsoncallback=?', function(data) {
  	  NB.Ajax._done('#anagramometer');
      NB.Anagram.anagram = data.anagram;
      NB.Cache.add('_anagram',NB.Anagram.anagram);    
      NB.Anagram.snap = NB.Anagram.total_calc();
      NB.Anagram.update();
  //    NB.Tools.colorize();
    });
    NB.Ajax._active('#anagramometer');
  }
}
    