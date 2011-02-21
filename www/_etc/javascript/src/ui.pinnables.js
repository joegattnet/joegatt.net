NB.Ui.pinnables = function(){
  $(this).closest('.pinnable').toggleClass('pinned');
	NB.Cookie.write('pinned',$('#tool_help').hasClass('on'),NB.crumb.path);
	NB.Nav.track(1,'Tools',($('#tool_help').hasClass('on')?'on':'off'),'tool_help');
}

/******************************************************************************/

$('#container').delegate('.pin-a','click',NB.Ui.pinnables);
