NB.Highlighter = {
  run:function() {
    if(!$('.code').hasClass('highlighted')){
      $('.code').syntaxHighlight();
      var code = $('.code').html();
      code = code.replace(
        /(virtual|src|href)="(.*?)"/g,
        '$1="<a href="/code/www$2" class="source-file">$2</a>"'
      ).replace(
        /#([a-z]*) /g,
        '#<span class="kwd">$1</span> '
      );
    }
    $('.code').addClass('highlighted');
    $('.code').html(code);
  },
  highlight:function(s){
  
  },
  link:function(e){
    var element = e.target;
    var url = element.href.replace(/.*www/,'');
    NB.Highlighter.fetch(url);
  },
  fetch:function(file){
    file = file.replace(/\//g,'|').replace('.','~');
    if(file.match(/\~[a-z]{2,4}$/)){
      var div = '#code';
      var script = '/_etc/cache/code--source_browse-file=';
    } else {
      var div = '#explorer';
      var script = '/_etc/cache/code--source_folders-file=';
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
}

/*******************************************************************************
  Options at http://balupton.com/sandbox/jquery-syntaxhighlighter/demo/ */

$('#container').delegate('a.source-file','click',NB.Highlighter.link);

$.SyntaxHighlighter.init({
  'alternateLines': false,
  'highlight': false,
  'lineNumbers': true,
  'theme':'balupton',
  'wrapLines':false,
	'theme': 'joegattnet',
	'themes': ['joegattnet'],
	'addSparkleExtension': true,
	'prettifyBaseUrl': false ? '/_etc/libraries/balupton-jquery-syntaxhighlighter/prettify' : '/_etc/libraries/balupton-jquery-syntaxhighlighter/prettify',
	'baseUrl': false ? '/_etc/libraries/balupton-jquery-syntaxhighlighter' : '/_etc/libraries/balupton-jquery-syntaxhighlighter'
});

$('body').bind('minor.loaded',NB.Highlighter.run);
