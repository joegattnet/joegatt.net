NB.Tools.colorize = {
  toggle: function () {
   var e = NB.App.get_target(NB.p.current);
   NB.Tools.toggle('colorize') ? NB.Tools.colorize.colorize(e) : NB.Tools.colorize.undo(e);
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
    var status = NB.Tools.on('colorize');
    NB.Nav.track(0, 'Tools.Colorize.do', e.attr('id'));
    if (status) {
     NB.Ui.caret.restore();
     var j = $(e);
     var cached = NB.cache['_c' + j.data('p')];
     if (cached!=undefined) {
        j.html(cached.data);
    } else {
    NB.Nav.track(0, 'Colorizing', e.attr('id'));
       var colorized = j.text().replace(/\w+ /g, function (match) {
        var score = NB.App.word_score(match);
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
    NB.Nav.track(0, 'Tools.Colorize.undo');
    NB.Ui.caret.store();
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
