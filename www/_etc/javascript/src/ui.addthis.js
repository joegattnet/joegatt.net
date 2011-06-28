NB.Ui.addthis = function(){
  NB.loaded_scripts.add(true, function() {
    // Doesn't work: see http://www.addthis.com/forum/viewtopic.php?f=5&t=18767
    // Only affects direct_content
    //addthis_share = {
    //  templates: {twitter: '{{title}}: {{url}}' },
    //  url: NB.crumb.canonical,
    //  title: NB.title,
    //  description: NB.description
    //}
    addthis.toolbox('.addthis_toolbox');
    addthis.counter('#share_count');
  });
}

/******************************************************************************/

var addthis_share= {
    shorteners : {
        bitly : { 
            username: 'joegattnet',
            apiKey: 'R_394f906e44f9637b16d1adf22b0fae8a'
        }
    },
    templates: {
      twitter: '{{title}}: {{url}}'
    }
}

var addthis_config = {
  pubid: 'joegattnet',
  ui_use_css: false,
  services_compact: 'facebook,twitter,evernote,instapaper,readitlater,email,more',
  services_expanded: 'wordpress,blogger,livejournal,delicious,digg,stumbleupon',
  services_exclude: 'print',
  data_ga_property: NB.ga_code,
  data_track_clickback: true,
  ui_click: true
}

$('h4 .addthis_button_expanded').live('click', function(){return false;});

//$('body').bind('content.loaded', NB.Ui.addthis);
//Binding is moved to NB.Nav, to ensure that meta-data is updated first