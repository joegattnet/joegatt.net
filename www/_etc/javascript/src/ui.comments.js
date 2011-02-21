NB.Ui.comments = function() {
  $('.focus_handle').not('.focus_handle-ized').addClass('focus_handle-ized').each(function(){
      var j = $(this);
      var focusable = j.closest('.focusable');
  	  if(j.hasClass('prompt_add_comment') && j.val() ==''){
        var helptext = (j.attr('id')=='new_scholia'?NB.TEXT.prompt.add_scholia:NB.TEXT.prompt.add_comment);
  	    j.text(helptext);
      }
	    j.focus(function(){
    	  focusable.addClass('focused');
        var helptext = (j.attr('id')=='new_scholia'?NB.TEXT.prompt.add_scholia:NB.TEXT.prompt.add_comment);
    	  if(j.hasClass('prompt_add_comment') && j.val()==helptext){
    	    j.text('');
        } else if(j.hasClass('prompt_add_comment') && j.val()=='') {
    	    j.text(helptext);
        }
  	  });
	    j.blur(function(){
    	  if(j.hasClass('prompt_add_comment') && j.val() ==''){
          var helptext = (j.attr('id')=='new_scholia'?NB.TEXT.prompt.add_scholia:NB.TEXT.prompt.add_comment);
    	    j.text(helptext);
    	    focusable.removeClass('focused');
        }
    });
	});
}

/******************************************************************************/

$('body').bind('minor.loaded',NB.Ui.comments);
