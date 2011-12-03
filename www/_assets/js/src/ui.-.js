NB.Ui = {};

$('body').bind('minor.loaded', function () {
  NB.Nav.track(1, 'Trigerred: minor.loaded');
});

$('body').bind('content.loaded', function () {
  $('body').trigger('minor.loaded');
  NB.Nav.track(1, 'Trigerred: content.loaded');
});

$('body').bind('page.loaded', function () {
  $('body').trigger('content.loaded');
//  NB.Nav.track(1, 'Trigerred: page.loaded');
});

$('body').bind('section.loaded', function () {
  $('body').trigger('page.loaded');
  NB.Nav.track(1, 'Trigerred: section.loaded');
});

$('window').one('scroll', function () {
  NB.Nav.track(2, 'Window', 'scroll', 'vertical', $(window).scrollTop());
});

if (NB.Cookie.read('session_exit')) {
  var href = NB.Cookie.read('session_exit');
  NB.Cookie.remove('session_exit');
  NB.loaded_scripts.add(false, function () {
    NB.Nav.track(2, 'Exit - returned', encodeURIComponent(NB.Url.domain(href)), encodeURIComponent(href));
  });
}

if(location.hash.indexOf('pr-')!=-1){
  NB.loaded_scripts.add(false, function () {
    NB.Nav.track(2,'Promo - referrer', location.hash.substr(4));
    location.hash = '';
  });
}

/****************************************************************************/

$('body').bind('content.loaded', function () {
  //NB.Cookie.write('v_' + NB.crumb.page_id, true, NB.crumb.path, 7*24*60);
  $('.refresh').each(function() {
    NB.Nav.track(0, 'Populating...');
    var j = $(this);
    j.load(j.data('url')).removeClass('populate');
  });
});
