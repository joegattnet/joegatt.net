NB.Ui = {}

$('body').bind('minor.loaded',function(){
  NB.Nav.track(1,'Trigerred: minor.loaded');
});
$('body').bind('content.loaded',function(){
  $('body').trigger('minor.loaded');
  NB.Nav.track(1,'Trigerred: content.loaded');
});
$('body').bind('page.loaded',function(){
  $('body').trigger('content.loaded');
  NB.Nav.track(1,'Trigerred: page.loaded');
});
$('body').bind('section.loaded',function(){
  $('body').trigger('page.loaded');
  NB.Nav.track(1,'Trigerred: section.loaded');
});

$('window').one('scroll', function() {
  NB.Nav.track(2,'Window','scroll','vertical',$(window).scrollTop());
});

if(NB.Cookie.read('session_exit')){
  var href = NB.Cookie.read('session_exit');
  NB.Cookie.remove('session_exit');
  NB.loaded_scripts.add(function(){
    NB.Nav.track(2,'Exit - returned', encodeURIComponent(NB.Url.domain(href)), encodeURIComponent(href));
  });
}
if(NB.Cookie.read('promo')){
  var promo = NB.Cookie.read('promo');
  NB.Cookie.remove('promo');
  NB.loaded_scripts.add(function(){
    NB.Nav.track(2,'Promo - referrer', promo);
  });
}
$(function(){
  NB.loaded = true;
  NB.loaded_scripts.run();
  $('body').trigger('section.loaded');
  $('body').removeClass('ajax_large');
});

/****************************************************************************/

$('body').bind('content.loaded',function(){
  NB.Cookie.write('v_' + NB.crumb.page_id, true, NB.crumb.path, 7*24*60);
});

