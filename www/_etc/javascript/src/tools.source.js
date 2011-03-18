NB.Tools.help = function(){
   $('#tool_source').toggleClass('on');
   if($('#tool_source').hasClass('on')){
		 $('#source').fadeIn(NB.SETTINGS.speed.slow,'easeInQuad');
	 } else {
		 $('#source').fadeOut(NB.SETTINGS.speed.normal);
   }
	 NB.Cookie.write('tool_source_on',$('#tool_source').hasClass('on'),NB.crumb.path);
	 NB.Nav.track(2,'Tools',($('#tool_source').hasClass('on')?'on':'off'),'tool_source');
}

/******************************************************************************/

$('#container').delegate('#tool_source','click',NB.Tools.help);
$('#container').delegate('.tool_source_extra','click',NB.Tools.help);
