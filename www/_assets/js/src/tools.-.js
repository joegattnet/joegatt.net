NB.Tools = {
  status: function(tool) {
    return $('#tool_' + tool).hasClass('on');
  },
  toggle: function(tool) {
    var status;
    $('#tool_' + tool).toggleClass('on');
    status = NB.Tools.status(tool);
  	NB.Cookie.write('tool_' + tool + '_on', status, NB.crumb.path);
	  NB.Nav.track(2, 'Tools', (status ? 'on' : 'off'), 'tool_' + tool);
    return status;
  }
};

NB.Tools.on = NB.Tools.status;
