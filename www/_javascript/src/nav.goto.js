NB.Nav.goto = function(){
  NB.Nav.fetch('/'+NB.crumb.section+'/'+$(this).val());
}

/******************************************************************************/

$('#container').delegate('.goto','change',NB.Nav.goto);
