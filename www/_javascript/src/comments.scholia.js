NB.Comments.scholia = {
	get: function(p) {
	   NB.Nav.track(0,'Getting Scholia',p);
     var paragraph_id = ($('#p_'+p).length?NB.Enface.get_target(NB.p.current).data('id'):false);
     var editable = NB.User.id != 0 && $.assArray.join(NB.versions,'').indexOf('='+NB.User.id+',')!=-1;
     var params = 'editable='+editable+'&u='+NB.User.id+'&b='+NB.book.id+'&p='+p+'&page_id='+NB.crumb.page_id;
	   NB.Ajax.html(
        'get',
        '#scholia',
        NB.root+'_cache/common--scholia-'+params+'.html',
        '',
        true
      );
	},
	save: function () {
    var note = $('textarea','#scholia').val();
//		 if(note==''||note==NB.TEXT.prompt.add_scholia){
//        alert('Please add your note before saving.');
//     } else {
//this prevents users from deleting a note - do we want this?
     $('#scholia form [name=paragraph_id]').val(NB.Enface.get_target(NB.p.current).data('id'));
		 if(note!=''&&note!=NB.TEXT.prompt.add_scholia){
  		 var pending = "var form = $('#scholia form');NB.Ajax.html('post','#hidden',form.attr('action'),form.serialize(),false,null,'#scholia');";
       if (NB.User.id==0){
  		 	 NB.User.pending.add(pending);
  		   NB.User.popup('add scholia');
  		 } else {
   		 	 eval(pending);
  		 }
  		} else if (note==''){
        $('textarea','#scholia').val(NB.TEXT.prompt.add_scholia);
      }
	    NB.Cache.remove($('#scholia').attr('rel'));
	}
}

/******************************************************************************/

$('body').bind('signedin.user signedout.user',function(){
  if(NB.crumb.page_type == 'enface'){
    NB.Comments.scholia.get(NB.p.current);
  }
});
