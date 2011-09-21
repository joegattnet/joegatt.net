NB.Nav.refresh = function () {
  NB.Nav.track(0, 'Refreshing elements...');
  //To prevent loading after page has changed
  $('.page-' + NB.crumb.section + '-' + NB.crumb.page + ' .refresh').each(function () {
    var url = $(this).data('url');
    if (url) {
      NB.Nav.track(0, 'Refreshing:', url);
      url = url.replace(/b=[0-9]+/, 'b=' + NB.book.id);
      url = url.replace(/p=[0-9]+/, 'p=' + NB.p.current);
      url = url.replace(/p_max=[0-9]+/, 'p_max=' + NB.p.max);
      url = url.replace(/u=[0-9]+/, 'u=' + NB.User.id);
//      NB.tags = NB.tags.replace(/_p[0-9]*/, '_p' + NB.p.current);
      url = url.replace(/tags=[_:, 0-9a-zA-Z]+/, 'tags=' + NB.tags);
      url = url.replace(/exclude_text=[0-9a-zA-Z\|]+/, 'exclude_text=' + 
        NB.crumb.section + '|' + NB.crumb.page + '|' + NB.p.current);
      NB.Ajax.html('get', $(this), url, '', true);
    }
  });
};

/******************************************************************************/

$('body').bind('content.loaded', NB.Nav.refresh);
