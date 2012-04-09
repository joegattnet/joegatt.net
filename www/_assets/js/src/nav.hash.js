NB.Nav.hash = function () {
  var url;
  if ( History.isInternetExplorer() ) {
    if (location.hash === '' || location.hash === '#') {
      //Inserting this hash should not be necessary
      url = NB.Url.path(location.href.replace('#', '/'));
    } else {
      url = location.hash.replace('#', '/');
    }
  } else {
      url = NB.Url.path(location.href);
  }
  if (decodeURIComponent(url) !== decodeURIComponent(NB.crumb.lastloaded)) {
    NB.Nav.track(1, 'Hash change detected.', url, NB.crumb.lastloaded);
    NB.Nav.fetch(url);
  }
  //  url = NB.Url.path(location.href);
  //  NB.Nav.fetch(url); 
}


History.Adapter.bind(window, 'statechange', NB.Nav.hash);
