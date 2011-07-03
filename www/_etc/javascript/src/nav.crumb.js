NB.Nav.crumb = {
  load: function(url){
    var p = NB.Url.p(url);
    var path = NB.Url.path(url);
    NB.crumb.lastloaded = NB.Url.path(url);
// These are written out by xssi
// Tidy up - either remove them or fix them and remove xssi
//    NB.crumb.category = '';
//    NB.crumb.section = NB.Url.section(url);
//    NB.crumb.page = NB.Url.page(url);
//    NB.crumb.page_id = NB.crumb.section+'_'+NB.crumb.page;
//    NB.crumb.path = NB.Url.dir(url);
//    NB.crumb.canonical = NB.Url.complete(url);
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
    $("link[rel='canonical']").attr('href', NB.crumb.canonical);
    document.title = NB.title_window + ((NB.chunk == 'page' || NB.chunk == 'paragraph')?' - ' + NB.chunk + ' ' + p:'');
  },
  last: function(p,path){
    var last_crumb = $('#crumbs_chunk');
    if (NB.chunk == 'page' || NB.chunk == 'paragraph') {
      last_crumb.parent().show();
    	last_crumb.text(NB.chunk+' '+p);
    	last_crumb.attr('href',path);
  	} else {
      last_crumb.parent().hide();
    }
  },
  version: function(){
    var version = $('.version-source').text();
    if(version != ''){
      $('.version').text('v' + version);
    }
  },
  version_chunk: function(){
    var version = $('.version-chunk-source').text();
    if(version != ''){
      $('.version-chunk').text('v' + version);
      $('.version-chunk').parent().show();
    } else {
      $('.version-chunk').parent().hide();
    }
  }
}

/******************************************************************************/

$('body').bind('content.loaded',NB.Nav.crumb.version);

