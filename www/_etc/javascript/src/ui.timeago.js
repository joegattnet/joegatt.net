NB.Ui.timeago = function() {
  $('abbr.timeago').timeago();
}

/******************************************************************************/

$('body').bind('minor.loaded', NB.Ui.timeago);
