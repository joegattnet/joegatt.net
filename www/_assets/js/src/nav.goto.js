NB.Nav.goto = function () {
  NB.Nav.fetch(NB.crumb.path + $(this).val());
}

/******************************************************************************/

$('#container').delegate('.goto', 'keydown', function (event) {
  if (event.which === NB.keycodes.ENT) {
    $(this).trigger('change');
    return false;
  }
});

$('#container').delegate('.goto', 'change', NB.Nav.goto);
