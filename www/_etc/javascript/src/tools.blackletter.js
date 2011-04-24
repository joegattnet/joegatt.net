NB.Tools.blackletter = function(){
   $('#tool_blackletter').toggleClass('on');
   if($('#tool_blackletter').hasClass('on')){
     $('#yield').addClass('blackletter');
   }else{
     $('#yield').removeClass('blackletter');
   }
	 NB.Cookie.write('tool_blackletter_on',$('#tool_blackletter').hasClass('on'),NB.crumb.path);
	 NB.Nav.track(2,'Tools',($('#tool_blackletter').hasClass('on')?'on':'off'),'tool_blackletter');
}
  
/******************************************************************************/

$('#container').delegate('#tool_blackletter','click',NB.Tools.blackletter);

NB.loaded_scripts.add(function(){
	 if(NB.Cookie.read('tool_blackletter_on') === 'true'){
     $('#yield').addClass('blackletter');
  	 $('#tool_blackletter').addClass('on');
	 }
});
