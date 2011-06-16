NB.Ui.addthis = function(){
  NB.loaded_scripts.add(true, function() {
    addthis.toolbox('.addthis_toolbox');
    addthis.counter('#share_count');
  });
}

/******************************************************************************/

var addthis_config = {
  pubid: 'joegattnet',
  // Would be good to use only the required css
  //From these - lots of superfluous styling
  //Then again, they are cached by other sites...
  // http://s7.addthis.com/static/r07/counter60.css
  // http://s7.addthis.com/static/r07/widget60.css
  //ui_use_css: false,
  services_compact: 'facebook,twitter,evernote,instapaper,readitlater,email,more',
  services_expanded: 'wordpress,blogger,livejournal,delicious,digg,stumbleupon',
  services_exclude: 'print',
  data_ga_property: NB.ga_code,
  data_track_clickback: true,
  ui_click: true
}

var addthis_share = {
  templates: {twitter: '{{title}}: {{url}}' }
}

$('h4 .addthis_button_expanded').live('click', function(){return false;});

//$('body').bind('content.loaded', NB.Ui.addthis);
//Binding is moved to NB.Nav, to ensure that meta-data is updated first