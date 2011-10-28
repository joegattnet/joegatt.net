NB.Nav.hash = function () {
  var url;
  if (location.hash === '' || location.hash === '#') {
    url = NB.Url.path(location.href.replace('#', ''));
  } else {
    url = location.hash.replace('#', '');
  }
  if (decodeURIComponent(url) !== decodeURIComponent(NB.crumb.lastloaded)) {
    NB.Nav.track(1, 'Hash change detected.', url, NB.crumb.lastloaded);
    NB.Nav.fetch(url);
  }
}

/******************************************************************************/

$(window).hashchange(NB.Nav.hash);
