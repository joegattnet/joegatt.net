NB.Nav.arrows = function (p) {
  var p, pPrevious, pNext; 
  //p = parseInt(p);
  
  if (NB.App.getPrevious) {
    pPrevious = NB.App.getPrevious(p);
  } else {
    pPrevious = p - 1;
  }
  
  if (NB.App.getNext) {
    pNext = NB.App.getNext(p);
  } else {
    pNext = p + 1;
  }

  $('.navigator .goto').removeClass('goto-focused').val(p);
  if (p <= 1) {
    p = 1;
    $('.navigator .first').closest('li').addClass('off');
    $('.navigator .previous').attr('href', NB.crumb.path + 1).closest('li').addClass('off');
  } else {
    $('.navigator .first').closest('li').removeClass('off');
    $('.navigator .previous').attr('href', NB.crumb.path + (pPrevious)).closest('li').removeClass('off');
  }
  if (p>=NB.p.max) {
    $('.navigator .next').attr('href', NB.crumb.path + NB.p.max).closest('li').addClass('off');
  } else {
    $('.navigator .next').attr('href', NB.crumb.path + (pNext)).closest('li').removeClass('off');
  }
  var nextPage = parseInt($('#content .extra').last().text()) + 1;
  if (nextPage > NB.p.max) {
    $('.navigator .next_page').attr('href', NB.crumb.path + NB.p.max).closest('li').addClass('off');
  } else {
    $('.navigator .next_page').attr('href', NB.crumb.path + nextPage).closest('li').removeClass('off');
  }
  $('.navigator .last').attr('href', NB.crumb.path + NB.p.max);
  if (p >= NB.p.max) {
    $('.navigator .last').closest('li').addClass('off');
  } else {
    $('.navigator .last').closest('li').removeClass('off');
  }
}

/***/

$('body').bind('content.loaded', function () {
  NB.Nav.arrows(NB.p.current);
});

$('#container').delegate('.navigator .previous', 'click', function(){
  if (NB.App.previous) {
      NB.App.previous();
      return false;
  }
});

$('#container').delegate('.navigator .next', 'click', function(){
  if (NB.App.next) {
      NB.App.next();
      return false;
  }
});

$('#container').delegate('.navigator .first', 'click', function(){
  if (NB.App.first) {
      NB.App.first();
      return false;
  }
});

$('#container').delegate('.navigator .last', 'click', function(){
  if (NB.App.last) {
      NB.App.last();
      return false;
  }
});
