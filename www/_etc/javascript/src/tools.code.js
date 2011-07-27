NB.Tools.code = function () {
   var status = NB.Tools.toggle('code');
   if (status) {
		 $('#code').fadeIn(NB.S.speed.normal, 'easeInQuad');
     $('iframe, embed').hide();
     //Not good enough - doesn't work on start, need to set a class in body
     //Also, not necessary when code doesn't go over iframe
	 } else {
		 $('#code').fadeOut(NB.S.speed.normal);
     $('iframe, embed').show();
   }
	 return false;
}

/******************************************************************************/

$('#container').delegate('#tool_code', 'click', NB.Tools.code);
$('#container').delegate('.tool_code_extra', 'click', NB.Tools.code);

NB.loaded_scripts.add(false, function () {
	 if (NB.Cookie.read('tool_code_on')  === 'true') {
		 $('#code').fadeIn(NB.S.speed.normal, 'easeInQuad');
     $('iframe, embed').hide();
  	 $('#tool_code').addClass('on');
	 }
});
