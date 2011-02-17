NB.Nav.crumb = function(url){

    var p = NB.Url.p(url);
    var path = NB.Url.path(url);
    NB.crumb.lastloaded = NB.Url.path(url);
    NB.crumb.category = '';
    NB.crumb.section = NB.Url.section(url);
    NB.crumb.page = NB.Url.page(url);
    NB.crumb.page_id = NB.crumb.section+'_'+NB.crumb.page;
    NB.crumb.path = NB.Url.dir(url);
    NB.crumb.canonical = url;

    $('.twitter-share-button').attr('data-url',url);

    if(path==location.pathname){
      location.hash = '';
    } else {
      location.hash = path;
    }
    
    var section_crumb = $('#crumbs_section');
    if (NB.chunk == 'index') {
      section_crumb.hide();
    } else {
      section_crumb.show();
    }

    NB.Nav.crumb.last(p,path);
  
    document.title = NB.title_window + ((NB.chunk == 'page' || NB.chunk == 'paragraph')?' - ' + NB.chunk + ' ' + p:'');
}

NB.Nav.crumb.last = function(p,path){
  var last_crumb = $('#crumbs_chunk');
  if (NB.chunk == 'page' || NB.chunk == 'paragraph') {
    last_crumb.show();
  	last_crumb.text(NB.chunk+' '+p);
  	last_crumb.attr('href',path);
	} else {
    last_crumb.hide();
  }
}
