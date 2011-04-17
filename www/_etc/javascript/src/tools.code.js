NB.Tools.help = function(){
   $('#tool_code').toggleClass('on');
   if($('#tool_code').hasClass('on')){
		 $('#code').fadeIn(NB.SETTINGS.speed.normal,'easeInQuad');
     $('iframe, embed').hide();
     //Not good enough - doesn't work on start, need to set a class in body
     //Also, not necessary when code doesn't go over iframe
	 } else {
		 $('#code').fadeOut(NB.SETTINGS.speed.normal);
     $('iframe, embed').show();
   }
	 NB.Cookie.write('tool_code_on',$('#tool_code').hasClass('on'));
	 NB.Nav.track(2,'Tools',($('#tool_code').hasClass('on')?'on':'off'),'tool_code');
}

/******************************************************************************/

$('#container').delegate('#tool_code','click',NB.Tools.help);
$('#container').delegate('.tool_code_extra','click',NB.Tools.help);
