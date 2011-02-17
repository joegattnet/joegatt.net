NB.Nav = function(p) {
//  NB.p.top = p;
  NB.Cookie.write('p',p,NB.crumb.path);
  NB.Nav.track(2,'_trackPageview',NB.crumb.lastloaded==undefined?location.pathname:NB.crumb.lastloaded);
}

/****************************************************************************/

$('body').bind('section.loaded',function(){
  NB.Cookie.write('v_'+NB.crumb.page,'true',NB.crumb.path);
});

$('body').bind('content.loaded',function(){
  NB.Nav(NB.p.current);
});
