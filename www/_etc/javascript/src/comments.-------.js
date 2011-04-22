NB.Comments = {
  add: function(){
    var form = $('#comments form');
    var comment = $('#comments textarea').val();
    $('#comments form input[name=p]').val(NB.p.top);
		 if(comment==''||comment==NB.TEXT.prompt.add_comment){
        alert(NB.TEXT.error.add_comment);
		    NB.Nav.track(1,'User Error','Add comment');
     } else {
  		 var pending = "NB.Comments.post()";
        if (NB.User.id==0){
  		 	 NB.User.pending.add(pending);
  		   NB.User.popup(NB.TEXT.prompt.sign_in_comment);
  		 } else {
   		 	 eval(pending);
  		 }
     }
  },
  post:function(){
    $('#comments_form').hide('blind');
    var form = $('#comments form');
    NB.Ajax.html('post','#comments_list',form.attr('action'),form.serialize(),false,'top','#comments',null,function(){
        NB.String.increment($('span','#comments_count'));
        $('#added_comment').show('blind').show('highlight');
    });
  }  
}
