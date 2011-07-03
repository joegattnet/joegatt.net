NB.Nav.goto = function(){
  NB.Nav.fetch(NB.crumb.path+$(this).val());
}

/******************************************************************************/

$('#container').delegate('.goto','change',NB.Nav.goto);
