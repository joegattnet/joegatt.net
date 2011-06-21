NB.Enface.focus = function(event){
  var e = event.target;
  var j = $(e);
  if(!j.hasClass('focused')){
    var p = parseInt(j.data('p'));
    var new_path = location.pathname;
    if(p){
      NB.Nav.track(0,'P:',p);
      NB.p.current = p;
      var new_path = NB.root+NB.crumb.section+'/'+p;
//      if(NB.p.current!=NB.p.top){
        NB.Nav.refresh();
//      }
      NB.Versions.display(j.data('id'));
      NB.Nav.slider(NB.p.current);
      NB.Nav.arrows(NB.p.current);
      var paragraph_text = j.text();
		  j.data('p_text',paragraph_text);
		  NB.Nav.crumb.last(p,new_path);
    }
    NB.Anagram.snap = NB.Anagram.total;
    NB.Tools.colorize.colorize(NB.Enface.get_target(NB.p.current));
    j.addClass('focused');
    j.focus();
  }
  return e;
}
