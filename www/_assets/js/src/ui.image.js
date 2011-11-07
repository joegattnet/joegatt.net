NB.Ui.image = {
  open: function (event, smallWidth, smallHeight, largeWidth, largeHeight, smallCols, largeCols, smallMarginLeft, smallMarginBottom, largeMarginLeft, largeMarginBottom, paraElement, paraSmallState, paraLargeState) {
    if (paraElement) {
      $(paraElement).animate(paraLargeState, NB.S.speed.fastest);    
    }
    var j = $(event.target);
    NB.Ui.image.scroll(j, largeHeight);
    j.animate({
      width: largeWidth, 
      height: largeHeight, 
      marginLeft: largeMarginLeft, 
      marginBottom: largeMarginBottom
    }, NB.S.speed.fast, function () {
      j.addClass('open');
    });
    j.attr('src', j.attr('src').replace('-wb-' + smallCols, '-wb-' + largeCols));
    j.unbind('click');
    j.bind('click', function (event) {NB.Ui.image.close(event, smallWidth, smallHeight, largeWidth, largeHeight, smallCols, largeCols, smallMarginLeft, smallMarginBottom, largeMarginLeft, largeMarginBottom, paraElement, paraSmallState, paraLargeState);return false;});
//    var scrollTo = Math.round(j.offset().top) + (301 + 10);
//    $('html, body').scrollTop(scrollTo);
    return false;
  }, 
  close: function (event, smallWidth, smallHeight, largeWidth, largeHeight, smallCols, largeCols, smallMarginLeft, smallMarginBottom, largeMarginLeft, largeMarginBottom, paraElement, paraSmallState, paraLargeState) {
    if (paraElement) {
      $(paraElement).animate(paraSmallState, NB.S.speed.fastest);    
    }
    var j = $(event.target);
    NB.Ui.image.scroll(j);
    j.animate({
      width: smallWidth, 
      height: smallHeight, 
      marginLeft: smallMarginLeft, 
      marginBottom: smallMarginBottom
    }, NB.S.speed.faster, function () {
      j.removeClass('open');
    });
    j.attr('src', j.attr('src').replace('-wb-' + largeCols, '-wb-' + smallCols));
    j.unbind('click');
    j.bind('click', function (event) {NB.Ui.image.open(event, smallWidth, smallHeight, largeWidth, largeHeight, smallCols, largeCols, smallMarginLeft, smallMarginBottom, largeMarginLeft, largeMarginBottom, paraElement, paraSmallState, paraLargeState);return false;});
    return false;
  }, 
  scroll: function (j, largeHeight) {
//    $(window).scroll(j.offset().top + largeHeight);
    return; 
  }
}

/******************************************************************************/

$('.prefix_1 .notes-list img[src*="-wb-3-0-"], .suffix_1 .notes-list img[src*="-wb-3-0-"], .prefix_1 .notes-list img[src*="-fw-220-0-"]').live('click', function (event) {
  NB.Ui.image.open(event, '220px', '120px', '540px', '300px', 3, 7, 0, 0, '-80px', 0);
  return false;
});

/* $('.page-notes-index .notes-list img[src*="-wb-3-0-"], */
$('.page-tags-page .notes-list img[src*="-wb-3-0-"], #notes_index .notes-list img[src*="-fw-220-0-"], #tags_page .notes-list img[src*="-fw-220-0-"]').live('click', function (event) {
  NB.Ui.image.open(event, '220px', '120px', '460px', '260px', 3, 6, 0, 0, 0, 0);
  return false;
});

$('.page-notes-index .notes-list img[src*="-wb-3-0-"]').live('click', function (event) {
  NB.Ui.image.open(event, '220px', '120px', '300px', '170px', 3, 4, 0, 0, 0, 0);
  return false;
});

$('.section-notes img[src*="-wb-5-0-"], .section-topics img[src*="-wb-6-0-"]').live('click', function (event) {
  NB.Ui.image.open(event, '380px', '210px', '940px', '530px', 5, 12, 0, '10px', 0, 0, '#tags', {marginTop:0}, {marginTop:'540px'});
  return false;
});

$('.section-notes img[src*="-wb-7-0-"]').live('click', function (event) {
  NB.Ui.image.open(event, '540px', '300px', '940px', '530px', 7, 12, 0, '10px', '-400px', '10px', '#content .text', {marginTop:0}, {marginTop:'540px'});
  return false;
});
