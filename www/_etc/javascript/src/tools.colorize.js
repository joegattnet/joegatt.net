NB.Tools.colorize = {
  toggle: function () {
   $('#tool_colorize').toggleClass('on');
    var e = NB.Enface.get_target(NB.p.current);
     if ($('#tool_colorize').hasClass('on')) {
        NB.Tools.colorize.colorize(e);
     } else {
        NB.Tools.colorize.undo(e);
     }
  	 NB.Cookie.write('tool_colorize_on', $('#tool_colorize').hasClass('on'), NB.crumb.path);
  	 NB.Nav.track(2, 'Tools', ($('#tool_colorize').hasClass('on')?'on':'off'), 'tool_colorize');
  }, 
  on: function () {
    NB.Nav.track(1, 'Colorizer: on.');
    $('.colorizer').each(function (i, e) {
      NB.Tools.colorize.colorize(e);
    });
  }, 
  off: function () {
    NB.Nav.track(1, 'Colorizer: off.');
    $('.colorizer-ized').each(function (i, e) {
      NB.Tools.colorize.undo(e);
    });
  }, 
  colorize: function (e) {
  NB.Nav.track(0, 'Tools.Colorize.do', e.id);
    if ($('#tool_colorize').hasClass('on')) {
     NB.Ui.caret.restore();
     var j = $(e);
     var cached = NB.cache['_c' + j.data('p')];
     if (cached!=undefined) {
        j.html(cached.data);
     } else {
       var colorized = j.text().replace(/\w + /g, function (match) {
        var score = NB.Enface.word_score(match);
        if (score<0) {
          return '<span class="neg neg' + score + '" title="&#x25bc;' + (score*-1) + '"> ' + match + '</span> ';
        } else if (score> 0) {
          return '<span class="pos pos' + score + '" title="&#x25b2;' + score + '"> ' + match + '</span> ';
        } else {
          return '<span title="&#x25b6;0"> ' + match + '</span> ';
        }
       });
       j.html(colorized);
       NB.Cache.add('_c' + j.data('p'), colorized);
     }
     j.addClass('colorizer-ized');
     NB.Ui.caret.restore();
    }
  }, 
  undo: function (e) {
    NB.Ui.caret.store();
    NB.Nav.track(0, 'Tools.Colorize.undo', e.id);
    var j = $(e);
    j.text(j.text());
    j.removeClass('colorizer-ized');
    NB.Ui.caret.restore();
  }
}

/******************************************************************************/

$('#container').delegate('#tool_colorize', 'click', NB.Tools.colorize.toggle);
$('#container').delegate('.tool_colorize_extra', 'click', NB.Tools.colorize.toggle);

NB.loaded_scripts.add(false, function () {
	 if (NB.Cookie.read('tool_colorize_on')  === 'true') {
     $('#yield').addClass('tool_colorize');
  	 $('#tool_colorize').addClass('on');
	 }
});
