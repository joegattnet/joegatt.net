NB.Enface.initialize = function(p){
  NB.Anagram.get();
  NB.Anagram.snap = NB.Anagram.total_calc();
  $('.app').each(function(i,e){
     NB.Editors.add(e);
     var j = $(e);
		 j.data('p',p+i);
		 j.data('alert','');
		 j.data('dirty',false);
		 j.data('error_status',0);
		 var value = j.attr('id').replace('paragraph_id_','');
		 j.data('id',value);
		 NB.Nav.track(0,'Enface initialising paragraph id ',value);
		 NB.Anagram.origArray[p+i] = j.text().toLowerCase().split('');
		});
  NB.Enface.get_target(p).focus();
}
