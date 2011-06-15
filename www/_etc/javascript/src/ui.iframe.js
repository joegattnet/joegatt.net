NB.Ui.iframe = function() {
  $('iframe').not('.loaded').each(function(){
     if($(this).data('src')){
       $(this).attr('src', $(this).data('src'));
       $(this).addClass('loaded');
     }
  });
}

/******************************************************************************/

$('body').bind('minor.loaded', NB.Ui.iframe);
