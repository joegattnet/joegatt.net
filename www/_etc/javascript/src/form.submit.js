NB.Form.submit = function(element,indicateDiv) {
	 var form = $(element).closest('form');
	 $('input:text,input:password',form).each(function(){return $(this).val()=='';})
	 if($(':text:unfilled,:password:unfilled',form).size()){
      alert(NB.TEXT.error.fill);
	    NB.Nav.track(1,'User Error','Fill required');
      return false;
   } else if($('.warning:sometext',form).size()){
      alert(NB.TEXT.error.fix);
	    NB.Nav.track(1,'User Error','Fix errors');
      return false;
 	 } else {
	 	 NB.Ajax.html(
        'post',
        indicateDiv,
        form.attr('action'),
        form.serialize(),
        false,
        null,
        indicateDiv
      );
   }
   return false;
}

/******************************************************************************/

$('#container').delegate('form.validate input[type="text"]','blur keyup',function(e){
	  NB.Form.validate(e.target,6);
});
$('#container').delegate('form.validate input[type="password"]','blur keyup',function(e){
	  NB.Form.validate(e.target,8);
});
