NB.Url = {
  complete: function (u) {
    return location.protocol + '//' + location.host + u;
  }, 
  isDoc: function (u) {
    return /\.pdf$|\.doc$|\.zip$|\.odt$/.test(u);
  }, 
  isDocUnzipped: function (u) {
    return /\.pdf$|\.doc$|\.odt$/.test(u);
  }, 
  isValid: function (u) {
    return (u.indexOf('http') === 0 && !NB.Url.isDoc(u));
  }, 
  isLocal: function (u) {
    return (u.indexOf(location.protocol + '//' + location.host) === 0 && !NB.Url.isDoc(u));
  }, 
  isExt: function (u) {
    return (NB.Url.isValid(u) && !NB.Url.isLocal(u));
  }, 
  domain: function (u) {
     return u.replace(/http\:\/\/|www\.|\/.*/g, '');
  }, 
  path: function (u) {
     return u.replace('http://' + location.host, '').replace(/\?.*/, '');
  }, 
  params: function (u) {
     return u.replace(NB.Url.path(u), '').replace('?', '');
  }, 
  section: function (u) {
      NB.Nav.track(1, 'NB.Url.section:', u);
      var url = NB.Url.path(u);
      if (url === ''||url === '/') {
        return 'home';
      } else {
        return NB.Url.path(url).match(/[a-z]+/)[0];
      }
  }, 
  dir: function (u) {
    return '/' + NB.Url.section(u) + '/';
  }, 
  page: function (u) {
      var url = NB.Url.path(u);
      if (url === ''||url === '/') {
          return 'index';
      } else {
          var page = NB.Url.path(url).match(/[a-z]+/g)[1];
          return page === undefined?'index':page;
      }
  }, 
  p: function (u) {
      var url = NB.Url.path(u);
      if (url === ''||url === '/') {
        var p = 0;
      } else {
        var p = url.match(/[0-9] + /);
        var p = (p === null?1:p[0]);
      }
      return parseInt(p);
  }, 
  p_change: function (u, p) {
    //SUB-OPTIMAL
    u.replace(NB.Url.p(u), p);
  }, 
  rnd: function (amp) {
      return (amp?'?':'&') + 'r=' + Math.random();
  }, 
  encode: function (u) {
      var url = NB.Url.path(u);
      return encodeURIComponent(url.replace(/\'/g, "’"));
  }, 
  paramsSimplify: function (u) {
      var url = NB.Url.path(u);
      return url.replace(/startup=true&?a?m?p?;?|&a?m?p?;?r=[0-9] + .?[0-9]*|\?$|&a?m?p?;?$/g, '');
  }, 
  paramsUpdate: function (u) {
      var url = NB.Url.path(u);
      return NB.Url.paramsSimplify(url).replace(/\bb=[0-9] + /, 'b=' + NB.book.id).replace(/\bp=[0-9] + /, 'p=' + NB.p.current).replace(/u=[0-9] + /, '\bu=' + NB.User.id);
  }, 
  paramsComplete: function (u) {
      var url = NB.Url.path(u);
      return NB.Url.paramsSimplify().replace(/\b[bpu]=[0-9] + |&a?m?p?;?$/, '') + (url.include('?')?'&':'?') + 'b=' + NB.book.id + '&p=' + NB.p.current + '&u=' + NB.User.id;
  }  
}
