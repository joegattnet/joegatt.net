NB.Tools.help = function(){
   $('#tool_help').toggleClass('on');
   if($('#tool_help').hasClass('on')){
     $('#yield').animate({marginTop:'215px'},'fast');
		 $('#help_main').show('blind');
	 } else {
		 $('#help_main').hide('blind');
     $('#yield').animate({marginTop:'25px'},'fast');
   }
	 NB.Cookie.write('tool_help_on',$('#tool_help').hasClass('on'),NB.crumb.path);
	 NB.Nav.track(2,'Tools',($('#tool_help').hasClass('on')?'on':'off'),'tool_help');
}

/******************************************************************************/

$('#container').delegate('#tool_help','click',NB.Tools.help);
$('#container').delegate('.tool_help_extra','click',NB.Tools.help);

NB.loaded_scripts.add(function(){
	 if(NB.Cookie.read('tool_help_on') === 'true' || !NB.Cookie.read('v_' + NB.crumb.page_id)){
     $('#yield').animate({marginTop:'215px'},'fast');
  	 $('#help_main').show('blind');
  	 $('#tool_help').addClass('on');
	 }
});
