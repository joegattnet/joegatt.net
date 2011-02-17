NB.Ui.stripes = function() {
  $('.stripe tr').not('.stripe-ized').addClass('stripe-ized').filter(':odd').addClass('even');
}

/******************************************************************************/

$('body').bind('content.loaded',NB.Ui.stripes);
