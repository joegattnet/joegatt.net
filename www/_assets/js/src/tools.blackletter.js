NB.Tools.blackletter = function () {
  var status = NB.Tools.toggle('blackletter');
  if(status){
    $('#yield').addClass('blackletter');
  } else {
    $('#yield').removeClass('blackletter');
  }
  //$('#yield').toggleClass('blackletter', function(){
  //  return NB.Tools.toggle('blackletter');  
  //});
};
  
/******************************************************************************/

$('#container').delegate('#tool_blackletter', 'click', NB.Tools.blackletter);

NB.loaded_scripts.add(false, function () {
	if (NB.Cookie.read('tool_blackletter_on') === 'true') {
    $('#yield').addClass('blackletter');
    $('#tool_blackletter').addClass('on');
	}
});
