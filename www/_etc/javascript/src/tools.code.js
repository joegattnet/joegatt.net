NB.Tools.code = function(){
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
	 return false;
}

/******************************************************************************/

$('#container').delegate('#tool_code','click',NB.Tools.code);
$('#container').delegate('.tool_code_extra','click',NB.Tools.code);

NB.loaded_scripts.add(false, function(){
	 if(NB.Cookie.read('tool_code_on') === 'true'){
		 $('#code').fadeIn(NB.SETTINGS.speed.normal,'easeInQuad');
     $('iframe, embed').hide();
  	 $('#tool_code').addClass('on');
	 }
});
