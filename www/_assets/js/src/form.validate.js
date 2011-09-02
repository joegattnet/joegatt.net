NB.Form.validate = function(e,reqLength) {
    var j = $(e);
    var check = j.attr('name');
		var value = j.val();
    var length = value.length;
    var type = j.attr('type');
    NB.Nav.track(0,'Validating: ',check,value,length,type,reqLength);
    var warning = $('#'+check+'_warning');
    if(value==''){
      warning.text(NB.TEXT.error.required);
    } else if((check.indexOf('password')>=0&&value=='password')||(check.indexOf('username')>=0&&(value.indexOf('username')>=0||value.indexOf('joegatt')>=0||value.indexOf('admin')>=0))){
      warning.text(NB.TEXT.error.not_allowed);
    } else if(check.indexOf('username')>=0&&$.richArray.match(NB.TEXT.profanity,value)){
      warning.text(NB.TEXT.error.obscene);
    } else if(length<reqLength){
      warning.text(NB.TEXT.error.too_short);
    } else if (check.indexOf('email')>=0&&(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))) {
      warning.text(NB.TEXT.error.not_valid);
    } else if (check.indexOf('username')>=0&&(!/^[A-Z0-9]+$/i.test(value))) {
      warning.text(NB.TEXT.error.not_valid);
    } else if (check.indexOf('email')>=0||check.indexOf('username')>=0) {
      $.getJSON(NB.root+'_etc/exe/users/check_exists.pl?'+check+'='+value+'&jsoncallback=?', function(data) {
        if (data.exists) {
  				 warning.text(NB.TEXT.error.already_exists);
  			} else {
  				 warning.text('');
  			}
      });
    } else {
			 warning.text('');
    }
}

/******************************************************************************/

$('#container').delegate('.validate input:text','blur keyup',function(e){
	  NB.Form.validate(e.target,NB.SETTINGS.form.min_length);
});
$('#container').delegate('.validate input:password','blur keyup',function(e){
	  NB.Form.validate(e.target,NB.SETTINGS.form.min_length);
});
