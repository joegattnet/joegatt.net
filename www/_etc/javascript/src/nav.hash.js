NB.Nav.hash = function(){
  if(location.hash==''||location.hash=='#') {
    var url = NB.Url.path(location.href.replace('#',''));
  } else {
    var url = location.hash.replace('#','');
  }
  NB.Nav.track(1,'Hash change detected.',url,NB.crumb.lastloaded);
  if(url!=NB.crumb.lastloaded){
    NB.Nav.fetch(url);
  }
}

/******************************************************************************/

$(window).hashchange(NB.Nav.hash);
