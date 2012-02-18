NB.Nav.hash = function () {
/*  var url;
  if ( History.enabled ) {
      url = NB.Url.path(location.href);
  } else {
    if (location.hash === '' || location.hash === '#') {
      url = NB.Url.path(location.href.replace('#', ''));
    } else {
      url = location.hash.replace('#', '');
    }
  }
  if (decodeURIComponent(url) !== decodeURIComponent(NB.crumb.lastloaded)) {
    NB.Nav.track(1, 'Hash change detected.', url, NB.crumb.lastloaded);
    NB.Nav.fetch(url);
  }
  */
    url = NB.Url.path(location.href);
    NB.Nav.fetch(url);
  
}

/******************************************************************************/

History.Adapter.bind(window, 'statechange', NB.Nav.hash);
