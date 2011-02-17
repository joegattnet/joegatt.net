NB.W.Versions = Class.create({
		initialize: function() {
      return;
    },
		display: function(q){
//		    var [user_id,username,score,date_string,date,version,latest] = NB.W.versions.info[q];
		    var user_id = NB.W.versions.info[q][0];
        var username = NB.W.versions.info[q][1];
		    if (NB.user.id==NB.W.versions.info[q][0]){
          var showusername = 'me';
        } else {
          var showusername = username;
        }
        var score = NB.W.versions.info[q][2];
        var date_string = NB.W.versions.info[q][3];
        var date = NB.W.versions.info[q][4];
        var version = NB.W.versions.info[q][5];
        var latest = NB.W.versions.info[q][6];
        
        _gaq.push(['_trackEvent','Wutz', 'Version', 'v'+version+(latest?' (latest)':''), q]);

// NEXTREL        $('version_info_panel').update('<p>version '+version+(score>0?' &#x25b2;'+score:'')+'</p><p><a href="'+NB.root+'users.shtml?u='+user_id+'&b='+NB.book_id+'">'+username+'</a>, <span title="'+date+'">'+date_string+'</span></p>');
        $('version_info_panel').update('<p>version '+version+(score>0?' &#x25b2;'+score:'')+'</p><p class="user-name user-'+username+'" rel="'+username+'">'+showusername+', <span title="'+date+'">'+date_string+'</span></p>');
        if (version==0) {
          $('version_previous').onclick = function(){return false;}
          $('version_previous').addClassName('disabled');
        } else {
          $('version_previous').onclick = function(){NB.W.versions.get(q,version,-1);}
          $('version_previous').removeClassName('disabled');
        }
        if (latest) {
          $('version_next').onclick = function(){return false;}
          $('version_next').addClassName('disabled');
          $('version_latest').onclick = function(){return false;}
          $('version_latest').addClassName('disabled');
        } else {
          $('version_next').onclick = function(){NB.W.versions.get(q,version,1);}
          $('version_next').removeClassName('disabled');
          $('version_latest').onclick = function(){NB.W.versions.get(q,version,0);}
          $('version_latest').removeClassName('disabled');
        }
    },
    get:function(q,current_version,direction){
      p_element = NB.W.Paragraphs.get_target_element_from_sequence(NB.p.current);
      if(direction!=0&&(current_version+direction!=this.info[p_element.id.replace('paragraph_id_','')][5])){
         p_element.addClassName('version');
         NB.W.editor.removeInstance(p_element);
 			 	 p_element.morph('color:'+NB.SETTINGS.color.version_loading,{duration:0.5});
 			 	 //Get HTML-cached version
			 	 new NB.Ajax_html('get','hidden',false,NB.root+'_cgi/wutz/_get_version.cgi','b='+NB.book_id+'&sequence='+NB.p.current+'&version='+(current_version+direction)+'&direction='+direction,null,p_element);
      } else {
         p_element.reset();
         p_element.active();
         NB.W.editor.addInstance(p_element);
      }
    },
    info: []
});
