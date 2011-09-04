NB.Ui.panels = {
  toggle: function (e) {
    var panel = $(e).closest('.panel');
    panel.toggleClass('panel_closed');
    var id = $(panel).attr('id');
    var isClosed = $(panel).hasClass('panel_closed');
    NB.Cookie.write(id + '_closed', isClosed, id.indexOf('signupin')!=-1?'/':NB.crumb.path);
    if (isClosed) {
      NB.Ui.focus();
    } else {
      $(':input:visible:enabled:first', panel).focus();
    }
  }, 
  close_all: function () {
    //Not writing cookies
    $('.escapable').addClass('closed');
    $('.escapable-panel').addClass('panel_closed');
  }
}

/****************************************************************************/

$('#container').delegate('.panel_handle', 'click', function (event) {
  NB.Ui.panels.toggle(event.target);
});

// Call this panels = { close, toggle, etc}
