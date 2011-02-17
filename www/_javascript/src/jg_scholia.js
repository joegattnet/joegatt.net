NB.Scholia = {
//paragraph & project should be generalised so this can be used for other projects
	get: function(q) {
	   //these would get scholia related to this version and allow user to edit their last comment
     var paragraph_id = ($('sequence_'+q)?NB.W.Paragraphs.get_target_element_from_sequence(q).id:false);
     var editable = NB.user.id != 0;
// This is ideal - it would allow only users who have contributed to addscholia
//	   var editable = NB.W.versions.info.any(function(n){
//        return n[0]==NB.user.id; // breaks IE
//        return true;
//     });
     var params = 'editable='+editable+'&page_id='+NB.crumb.page+'&u='+NB.user.id+'&sequence='+q+'&b='+NB.book_id+'&paragraph_id='+paragraph_id;
	   var relparams = 'editable='+editable+'&p='+q;
//this condition should be GENERICISED in ajax
     if ($('n_scholia').getAttribute('rel')!=relparams){
		  new NB.Ajax_html('get','n_scholia',true,NB.root+'_cgi/_common/_scholia.cgi',params,null,null);
      $('n_scholia').setAttribute('rel',relparams);
     }
	},
	save: function (q) {

    var note = $('n_scholia').down('textarea').getValue();
//		 if(note==''||note==NB.SETTINGS.prompt.add_scholia){
//        alert('Please add your note before saving.');
//     } else {
//this prevents users from deleting a note - do we want this?
		 if(note!=''&&note!=NB.SETTINGS.prompt.add_scholia){
  		 var pending = "NB.page.submit($('"+q.id+"'),'hidden','n_scholia');";
  		 if (NB.user.id==0&&NB.Cookie.read('status')=='confirmed'){
  		 	 NB.pending_signedin_action = pending;
  		   NB.user.signin('add scholia');
  		 } else if (NB.user.id==0){
  		 	 NB.pending_signedin_action = pending;
  		   NB.user.signup('add scholia');
  		 } else {
   		 	 NB.page.submit(q,'hidden','n_scholia');
  		 }
  		} else if (note==''){
        $('n_scholia').down('textarea').setValue(NB.SETTINGS.prompt.add_scholia);
      }
	}
}

//$('comments').down('li').insert("<li><p>xxx</p></li>",{position:'after'})