NB.Ui.palette = function () {
  $('.palette').not('.palettised').find('div').each(function () {
    var e = $(this);
    var colorHex = e.find('p').text();
    e.css('backgroundColor', '#' + colorHex);
    
    var hexR = parseInt((parseInt(colorHex.substr(0, 2), 16) * 100)/255);
    var hexG = parseInt((parseInt(colorHex.substr(2, 2), 16) * 100)/255);
    var hexB = parseInt((parseInt(colorHex.substr(4, 2), 16) * 100)/255);
    
    var html = "";
      html  += "<p> &nbsp;R:&nbsp;&nbsp;" + hexR + "%</p> ";
      html  += "<p> &nbsp;G:&nbsp;&nbsp;" + hexG + "%</p> ";
      html  += "<p> &nbsp;B:&nbsp;&nbsp;" + hexB + "%</p> ";
      html  += "<p> &nbsp;#" + colorHex + "</p> ";
      e.html(html);
  });
  $('.palette').addClass('palettised');
}

/******************************************************************************/

$('body').bind('content.loaded', NB.Ui.palette);
