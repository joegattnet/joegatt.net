NB.Nav.arrows = function(p) {
  p = parseInt(p);
  $('.navigator .goto').removeClass('goto-focused').val(p);
  if(p<=1){
    $('.navigator .first').closest('li').addClass('off');
    $('.navigator .previous').attr('href', NB.crumb.path+1).closest('li').addClass('off');
    p=1;
  } else {
    $('.navigator .first').closest('li').removeClass('off');
    $('.navigator .previous').attr('href', NB.crumb.path+(p-1)).closest('li').removeClass('off');
  }
  if(p>=NB.p.max){
    $('.navigator .next').attr('href', NB.crumb.path+NB.p.max).closest('li').addClass('off');
  } else {
    $('.navigator .next').attr('href', NB.crumb.path+(p+1)).closest('li').removeClass('off');
  }
  var next_page = parseInt($('#content .extra').last().text())+1;
  if(next_page>NB.p.max){
    $('.navigator .next_page').attr('href', NB.crumb.path+NB.p.max).closest('li').addClass('off');
  } else {
    $('.navigator .next_page').attr('href', NB.crumb.path+next_page).closest('li').removeClass('off');
  }
  $('.navigator .last').attr('href', NB.crumb.path+NB.p.max);
  if(p>=NB.p.max){
    $('.navigator .last').closest('li').addClass('off');
  } else {
    $('.navigator .last').closest('li').removeClass('off');
  }
}

/****************************************************************************/

$('body').bind('content.loaded',function(){
  NB.Nav.arrows(NB.p.current);
});
