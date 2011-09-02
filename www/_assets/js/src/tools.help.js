NB.Tools.help = function () {
   var status = NB.Tools.toggle('help');
   if (status) {
     $('#yield').animate({marginTop:'215px'}, 'fast');
		 $('#help_main').show('blind');
	 } else {
		 $('#help_main').hide('blind');
     $('#yield').animate({marginTop:'25px'}, 'fast');
   }
}

/******************************************************************************/

$('#container').delegate('#tool_help', 'click', NB.Tools.help);
$('#container').delegate('.tool_help_extra', 'click', NB.Tools.help);

NB.loaded_scripts.add(false, function () {
	 if ($('#help_main').length >  0 && (NB.Cookie.read('tool_help_on')  === 'true' || NB.Cookie.read('v_' + NB.crumb.page_id)  === null)) {
     $('#yield').animate({marginTop:'215px'}, 'fast');
  	 $('#help_main').show('blind');
  	 $('#tool_help').addClass('on');
	 }
});