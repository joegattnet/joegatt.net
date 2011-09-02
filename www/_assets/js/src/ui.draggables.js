NB.Ui.draggables = function () {
    $('.draggable').not('draggable-ized').each(function () {
        var j = $(this);
        j.animate({top:NB.Cookie.read(j.id + '_dragpos_top'), left:NB.Cookie.read(j.id + '_dragpos_left')}, 'fast');
    	  j.draggable({
          stop: function () {
              NB.Cookie.write(j.id + '_dragpos_top', 'top:' + j.css('top'), NB.crumb.path);
              NB.Cookie.write(j.id + '_dragpos_left', 'left:' + j.css('left'), NB.crumb.path);
   				    NB.Nav.track(1, 'Toolbar', 'drag-x', j.id, j.css('top'));
   				    NB.Nav.track(1, 'Toolbar', 'drag-y', j.id, j.css('left'));
          }
        });
			    j.bind('dblclick', function () {
    	    j.animate({top:'0', left:'0'}, 400, 'easeOutCubic');
          NB.Cookie.remove(j.id + '_dragpos_top', NB.crumb.path);
          NB.Cookie.remove(j.id + '_dragpos_left', NB.crumb.path);
			    NB.Nav.track(1, 'Toolbar', 'undrag', j.id, 0);
        });
        j.addClass('draggable-ized');
      });
}

/*****************************************************************************/
  
$('body').bind('content.loaded', NB.Ui.draggables);
