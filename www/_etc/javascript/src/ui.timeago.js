NB.Ui.timeago = function () {
  $('time.timeago').timeago();
}

/******************************************************************************/

$('body').bind('minor.loaded', NB.Ui.timeago);
