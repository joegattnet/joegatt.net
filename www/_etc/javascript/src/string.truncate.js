NB.String.truncate = function truncate(t, length, ellipses) {
    length = length || 30;
    ellipses = ellipses || '...';
    return t.length > length ?
      t.substr(0,length) + ellipses : t;
}
