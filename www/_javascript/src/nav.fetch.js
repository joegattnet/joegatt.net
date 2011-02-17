NB.Nav.fetch = function(url) {
  NB.Cache.updateCurrent();
  if($('#content').hasClass('direct') && NB.Url.section(url) == NB.crumb.section && NB.Url.page(url) == NB.crumb.page){
      $('#crumbs_chunk').text('[loading...]');
      var p = NB.Url.p(url);
      NB.Nav.track(1,'URL:',url,p);
      NB.p.top = p;
      NB.p.current = p;
      $('.navigator .goto').addClass('goto-focused').val(p);
      var params = 'b='+NB.book.id+'&p='+p+'&p_max='+NB.p.max+'&scope=content';
      NB.Nav.track(1,'Direct content: ',params);
   	  NB.Ajax.html(
        'get',
        '#content',
        $('#content').attr('href').replace(/([^\-])-{1}[a-z][^\.]*/,'$1-'+params),
        '',
        true,
        null,
        null,
        url
      );
  } else {
      //Does this create an unnecessary granularity and defeats caching?
      //var scope = (NB.Url.section(url) == NB.crumb.section)?'page':'section';
      var scope = 'section';
      NB.Ajax.html(
        'get',
        '#'+scope,
        url,
        'scope='+scope,
        true,
        null,
        null,
        url
      );
  }
}
