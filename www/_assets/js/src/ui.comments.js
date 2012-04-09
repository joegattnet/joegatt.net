NB.Ui.comments = function () {
  $('.focus_handle').not('.focus_handle-ized').addClass('focus_handle-ized').each(function () {
      var j = $(this);
      var focusable = j.closest('.focusable');
	    j.focus(function () {
    	  focusable.addClass('focused');
  	  });
	});
}

/******************************************************************************/

$('body').bind('minor.loaded', NB.Ui.comments);
