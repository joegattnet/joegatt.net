NB.Nav.arrows = function (p) {
  var p, pPrevious, pNext; 
  //p = parseInt(p);
  
  if (NB.App.setPrevious) {
    pPrevious = NB.App.getPrevious(p);
  } else {
    pPrevious = p - 1;
  }
  
  if (NB.App.setNext) {
    pNext = NB.App.getNext(p);
  } else {
    pNext = p + 1;
  }

  $('.navigator .goto').removeClass('goto-focused').val(p);
  if (p<=1) {
    p=1;
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
  var next_page = parseInt($('#content .extra').last().text()) + 1;
  if (next_page> NB.p.max) {
    $('.navigator .next_page').attr('href', NB.crumb.path + NB.p.max).closest('li').addClass('off');
  } else {
    $('.navigator .next_page').attr('href', NB.crumb.path + next_page).closest('li').removeClass('off');
  }
  $('.navigator .last').attr('href', NB.crumb.path + NB.p.max);
  if (p>=NB.p.max) {
    $('.navigator .last').closest('li').addClass('off');
  } else {
    $('.navigator .last').closest('li').removeClass('off');
  }
}

/****************************************************************************/

$('body').bind('content.loaded', function () {
  NB.Nav.arrows(NB.p.current);
  
  if (NB.App.previous) {
    $('.navigator .previous').click(function () {
      NB.App.previous();
      return false;
    });
  }

  if (NB.App.next) {
    $('.navigator .next').click(function () {
      NB.App.next();
      return false;
    });
  }

  if (NB.App.first) {
    $('.navigator .first').click(function () {
      NB.App.first();
      return false;
    });
  }

  if (NB.App.last) {
    $('.navigator .last').click(function () {
      NB.App.last();
      return false;
    });
  }
  
});
