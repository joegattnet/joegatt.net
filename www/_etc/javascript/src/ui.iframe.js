NB.Ui.iframe = function () {
  $('iframe').each(function () {
     if ($(this).attr('src') === '' && $(this).data('url')) {
       $(this).attr('src', $(this).data('url'));
     }
  });
}

/******************************************************************************/

$('body').bind('minor.loaded', NB.Ui.iframe);
