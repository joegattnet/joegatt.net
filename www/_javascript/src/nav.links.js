NB.Nav.links = {
  share: function(e) {
    var e = e.target;
    e = $(e);
	  NB.String.increment($('#share_count span'));
	  NB.Ajax.html(
      'get',
      '#hidden',
      '../_cgi/common/popularity.cgi',
      'type=1&section='+NB.crumb.section+'&page_id='+e.attr('rel')+'&external='+e.attr('title')+'&url='+e.closest('#n_share').attr('rel'),
      false
    );
    return true;
  },
	external: function(e) {
    var element = e.target;
    var href = $(element).closest('a').attr('href');
    var href_domain = NB.Url.domain(href);
    NB.Cookie.write_session('session_exit',href);
	  NB.Nav.track(2,'Exit', encodeURIComponent(href_domain), encodeURIComponent(href));
   return true;
  },
	document: function(e) {
   var href = e.target.href;
   NB.Nav.track(2,'File', 'View', href);
   return true;
	},
	download: function(e) {
   var href = e.target.href;
	 NB.Nav.track(2,'File', 'Download', href);
   return true;
	},
 	internal: function(e) {
    var element = e.target;
    var href = $(element).closest('a').attr('href');
    NB.Nav.fetch(href);
    return false;
  },
	internal_right: function(e) {
    var element = e.target;
    var href = $(element).closest('a').attr('href');
    NB.Nav.track(2,'Right-click', encodeURIComponent(href), element.element);
    NB.Nav.fetch(href);
    return false;
  }
}

/******************************************************************************/

$('#container').delegate('.bm','click',NB.Nav.links.share);
$('#container').delegate('a:external','mousedown',NB.Nav.links.external);
$('#container').delegate('a:document','click',NB.Nav.links.document);
$('#container').delegate('a:download','contextmenu', NB.Nav.links.download);
//$('#container').delegate('a:internal','contextmenu', NB.Nav.links.internal_right);
$('#container').delegate('a:internal','click',NB.Nav.links.internal);
