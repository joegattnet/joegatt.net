NB.Ui.downloads = function() {
  NB.Nav.track(1,'Initializing: NB.Ui.downloads');
  $('a:document').not('.document-ized').addClass('document-ized').each(function(){
    var item = $(this);
    if(jQuery.browser.msie){
      var instructions = '"Save Target As..."';
    } else if(jQuery.browser.opera) {
      var instructions = '"Save Linked Content As..."';
    } else {
      var instructions = '"Save Link As..."';
    }
    var current = item.attr('title');
    item.attr('title',current + (current==''?'T':' - t') + 'o download, right-click and choose '+instructions);
  });
}

/*****************************************************************************/
  
$('body').bind('content.loaded', NB.Ui.downloads);
