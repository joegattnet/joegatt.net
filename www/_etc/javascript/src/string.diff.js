/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 * 
 * Adapted by JG: 
 * - Modified to highlight letters rather than words
 * - Created diffMeasure 
 * - Namespaced
 */

NB.String.diff = {

  escape:function (s) {
      var n = s;
      n = n.replace(/&/g, "&amp;");
      n = n.replace(/</g, "&lt;");
      n = n.replace(/> /g, "&gt;");
      n = n.replace(/"/g, "&quot;");
  
      return n;
  }, 
  
  diffString:function ( o, n ) {
// Modified to indicate letters rather than words
//    o = o.replace(/\s + $/, '');
//    n = n.replace(/\s + $/, '');
  
//    var out = NB.String.diff.diff(o === "" ? [] : o.split(/\s + /), n === "" ? [] : n.split(/\s + /) );
    var out = NB.String.diff.diff(o === "" ? [] : o.toArray(), n === "" ? [] : n.split('') );
    var str = "";
  
/*    var oSpace = o.match(/\s + /g);
    if (oSpace === null) {
      oSpace = ["\n"];
    } else {
      oSpace.push("\n");
    }
    var nSpace = n.match(/\s + /g);
    if (nSpace === null) {
      nSpace = ["\n"];
    } else {
      nSpace.push("\n");
    }
*/  
    if (out.n.length === 0) {
        for (var i = 0, len = out.o.length; i < len; i++ ) {
          str  += '<del> ' + NB.String.diff.escape(out.o[i]) + "</del> ";
        }
    } else {
      if (out.n[0].text === null) {
        for (n = 0, len = out.o.length; n < len && out.o[n].text === null; n++ ) {
          str  += '<del> ' + NB.String.diff.escape(out.o[n]) + "</del> ";
        }
      }
  
      for ( var i = 0, len = out.n.length; i < len; i++) {
        if (out.n[i].text === null) {
          str  += '<ins> ' + NB.String.diff.escape(out.n[i]) + "</ins> ";
        } else {
          var pre = "";
  
          for (n = out.n[i].row + 1, len2 = out.o.length; n < len2 && out.o[n].text === null; n++) {
            pre  += '<del> ' + NB.String.diff.escape(out.o[n]) + "</del> ";
          }
          str  += out.n[i].text + pre;
        }
      }
    }
    
    return str;
  }, 

  measure:function ( o, n ) {
    var out = NB.String.diff.diff(o === "" ? [] : o.toArray(), n === "" ? [] : n.split('') );
    var str = "";
    var measure = 0;
    if (out.n.length === 0) {
        for (var i = 0; i < out.o.length; i++ ) {
//          str  += '<del> ' + NB.String.diff.escape(out.o[i]) + "</del> ";
          measure++;
        }
    } else {
      if (out.n[0].text === null) {
        for (n = 0; n < out.o.length && out.o[n].text === null; n++ ) {
//          str  += '<del> ' + NB.String.diff.escape(out.o[n]) + "</del> ";
          measure++;
        }
      }
  
      for ( var i = 0; i < out.n.length; i++) {
        if (out.n[i].text === null) {
//          str  += '<ins> ' + NB.String.diff.escape(out.n[i]) + "</ins> ";
          measure++;
        } else {
          var pre = "";
  
          for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text === null; n++) {
          measure++;
//            pre  += '<del> ' + NB.String.diff.escape(out.o[n]) + "</del> ";
          }
          str  += out.n[i].text + pre;
        }
      }
    }
    
    return measure;
  }, 
  
  
  diff:function ( o, n ) {
    var ns = new Object();
    var os = new Object();
    
    for ( var i = 0; i < n.length; i++) {
      if ( ns[ n[i] ] === null )
        ns[ n[i] ] = { rows: new Array(), o: null };
      ns[ n[i] ].rows.push( i );
    }
    
    for ( var i = 0; i < o.length; i++) {
      if ( os[ o[i] ] === null )
        os[ o[i] ] = { rows: new Array(), n: null };
      os[ o[i] ].rows.push( i );
    }
    
    for ( var i in ns ) {
      if ( ns[i].rows.length === 1 && typeof(os[i]) != "undefined" && os[i].rows.length === 1 ) {
        n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
        o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
      }
    }
    
    for ( var i = 0; i < n.length - 1; i++) {
      if ( n[i].text != null && n[i + 1].text === null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text === null && 
           n[i + 1] === o[ n[i].row + 1 ] ) {
        n[i + 1] = { text: n[i + 1], row: n[i].row + 1 };
        o[n[i].row + 1] = { text: o[n[i].row + 1], row: i + 1 };
      }
    }
    
    for ( var i = n.length - 1; i >  0; i-- ) {
      if ( n[i].text != null && n[i-1].text === null && n[i].row >  0 && o[ n[i].row - 1 ].text === null && 
           n[i-1] === o[ n[i].row - 1 ] ) {
        n[i-1] = { text: n[i-1], row: n[i].row - 1 };
        o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
      }
    }
    
    return { o: o, n: n };
  }
}
