NB.Nav = function(p) {
  //NB.p.top = p;
  NB.Cookie.write('p',p,NB.crumb.path);
  NB.Nav.track(2,'_trackPageview', NB.crumb.lastloaded==undefined?location.pathname:NB.crumb.lastloaded);

  document.title = NB.title_window;
  $("link[rel='canonical']").attr('href', NB.crumb.canonical);
  $("link[rel='image_src']").attr('href', NB.image);

  $("meta[name*='itle']").attr('content', NB.title);
  $("meta[name*='escription']").attr('content', NB.description);
  $("meta[name*='keywords']").attr('content', NB.tags);
  $("meta[name*='image']").attr('content', NB.image);
  $("meta[name*='latitude']").attr('content', NB.latitude);
  $("meta[name*='longitude']").attr('content', NB.longitude);
  //This is only doing one - we need one for images
  //NB.Ui.addthis();
}

/***/

$('body').bind('page.loaded',function(){
  NB.Cookie.write('v_'+NB.crumb.page,'true',NB.crumb.path);
});

$('body').bind('content.loaded',function(){
  NB.Nav(NB.p.current);
});
