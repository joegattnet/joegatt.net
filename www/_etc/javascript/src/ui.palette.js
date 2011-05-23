NB.Ui.palette = function(){
  $('.palette div').each(function(){
    var colorString = $(this).css('backgroundColor');
    var colors = /([0-9]+)/.exec(colorString);
    var html = "<p>R:  " + parseInt((100 * colors[0]) / 255) + "%</p>";
      html += "<p>G:  " + parseInt((100 * colors[1]) / 255) + "%</p>";
      html += "<p>B:  " + parseInt((100 * colors[2]) / 255) + "%</p>";
      //html += "<p> " + colors + "</p>";
      html += "<p>#f0f0f0</p>";
    $(this).html(html);
  });
}

/******************************************************************************/

$('body').bind('content.loaded',NB.Ui.palette);
