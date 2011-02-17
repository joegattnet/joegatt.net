// Adapted from http://www.jslab.dk/library/String.levenshtein

NB.String.levenshtein = function(t1,t2) {
    var si; 
    var c;
    var n = t1.length;
    var m = t2.length;
    if (!n)
      return m;
    if (!m)
      return n;
    var mx = [];
    for (var i=0; i<=n; i++) {
      mx[i] = [];
      mx[i][0] = i;
    }
    for (var j=0; j<=m; j++)
      mx[0][j] = j;
    for (var i=1; i<=n; i++) {
      si = t1.charAt(i - 1);
      for (var j=1; j<=m; j++)
        mx[i][j] = Math.min(mx[i - 1][j] + 1, mx[i][j - 1] + 1, mx[i - 1][j - 1] + (si == t2.charAt(j - 1) ? 0 : 1));
    }
    return mx[n][m];
}
