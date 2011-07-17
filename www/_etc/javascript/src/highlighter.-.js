NB.Highlighter = {
  run: function () {
    $.syntax({root: '/_etc/libraries/jquery-syntax/public/'}, 
      function (options, html, container) {
        container.replaceWith(html.clone(true));
        $('.highlighted').each(function (index) {
          $(this).html(NB.Highlighter.linkify($(this).html()));
        });
//      container.html(NB.Highlighter.linkify(container.html()));
      });
  }, 
  linkify: function (s) {
    return s.replace(
      /"(\/.*\.)(html|shtml|txt|htaccess|css|js|cgi|php)"/g, 
      '"<a href="/code/www$1$2" class="source-file"> $1$2</a> "'
    ).replace(
      /<span class="type"> NB<\/span> .<span class="type"> ([a-zA-Z]*)<\/span> \.<span class="function"> ([a-z]*)<\/span> /g, 
      '<a href="/code/www/_etc/javascript/src/$1.$2.js" class="source-file"> <span class="type"> NB</span> .<span class="type"> $1</span> .<span class="function"> $2</span> </a> '
    );
  }, 
  link: function (e) {
    var element, url;
    element = e.target;
    url = element.href.replace(/.*www/, '');
    NB.Highlighter.fetch(url);
    return false;
  }, 
  fetch: function (file, nofollow) {
  //This needs to go to tools source
    var div, filesection, script, url;
    url = file;
    file = file.replace(
      /\/_etc\/cache\/(.*?)\-\-(.*?)\-.*/g, 
      '/_etc/cgi/$1/$2.cgi'
    );
    filesection = NB.Url.section(file);
    file = file.replace(/\//g, '|').replace(/\./g, '~');
    if (file.match(/\~[a-z]*$/)) {
      div = '#source';
      script = '/_etc/cache/code--files-file=';
      file.replace(/\$\{?layout\}?/g, NB.layout);
      file.replace(/\$\{?page_app\}?/g, NB.page_app);
      if (!nofollow && file.match(/index\~shtml$/)) {
        file.replace(/\$\{?section\}?/g, filesection);
        NB.Nav.fetch(url.replace(/.*www/, '').replace('index.shtml', ''));
      }
    } else {
      div = '#explorer';
      script = '/_etc/cache/code--folders-folder=';
    }
    NB.Ajax.html(
      'get', 
      div, 
      script + file + '.html', 
      '', 
      true
    );
    return false;
  }
};

/******************************************************************************/

$('body').bind('minor.loaded', NB.Highlighter.run);

$('#container').delegate('.source-file', 'click', NB.Highlighter.link);
