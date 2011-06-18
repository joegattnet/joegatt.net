NB.Versions = {
		display: function(q){
		NB.Nav.track('Versions.display',q);
//		    var [user_id,username,score,date_string,date,version,latest] = NB.versions[q];
        var pq = 'p'+q;
		    var user_id = NB.versions[pq][0];
        var username = NB.versions[pq][1];
        var score = NB.versions[pq][2];
        var date_string = NB.versions[pq][3];
        var date = NB.versions[pq][4];
        var version = NB.versions[pq][5];
        var latest = NB.versions[pq][6];
		    var showusername = (NB.User.id==NB.versions[pq][0]?'me':username);

        NB.Nav.track(2,'_trackPageview',NB.crumb.lastloaded==undefined?location.pathname:NB.crumb.lastloaded+(latest?'':'/v/'+q));
        
// NB.Nav.track(2,'Enface', 'Version', 'v'+version+(latest?' (latest)':''), q);
// NEXTREL        $('version_info_panel').update('<p>version '+version+(score>0?' &#x25b2;'+score:'')+'</p><p><a href="'+NB.root+'users.shtml?u='+user_id+'&b='+NB.book.id+'">'+username+'</a>, <span title="'+date+'">'+date_string+'</span></p>');
        
        var fullDescription = 'Paragraph ' + NB.p.current + ' version 0.' + version + ' score ' + (score>0?score:'');
        
        $('#version_info_panel').html('<p title="' + fullDescription + '">&para; ' + NB.p.current + ' v<span class="version-chunk-source">0.' + version + '</span>' + (score>0?' &#x25b2;'+score:'')+'</p><p class="user-name user-'+username+'" data-username="'+username+'">'+showusername+', <span title="'+date+'">'+date_string+'</span></p>');
        
        NB.Nav.crumb.version_chunk();
        
        $('#versions_nav a').each(function(){
          $(this).unbind('click.versions');
        });
        if (version==0) {
          $('#version_previous').bind('click.versions',NB.Tools.empty);
          $('#version_previous').addClass('disabled');
        } else {
          $('#version_previous').bind('click.versions',function(){
            NB.Versions.get(q,version,-1)
          });
          $('#version_previous').removeClass('disabled');
        }
        if (latest) {
          $('#version_next').bind('click.versions',NB.Tools.empty);
          $('#version_next').addClass('disabled');
          $('#version_latest').bind('click.versions',NB.Tools.empty);
          $('#version_latest').addClass('disabled');
        } else {
          $('#version_next').bind('click.versions',function(){
            NB.Versions.get(q,version,1)
          });
          $('#version_next').removeClass('disabled');
          $('#version_latest').bind('click.versions',function(){
            NB.Versions.get(q,version,0)
          });
          $('#version_latest').removeClass('disabled');
        }
    },
    get:function(q,current_version,direction){
      var p_element = NB.Enface.get_target(NB.p.current);
      if(direction!=0&&(current_version+direction!=NB.versions['p'+$(NB.Enface.get_target(NB.p.current)).data('id')][5])){
         p_element.addClass('version');
         NB.Editors.remove(p_element);
 			 	 $(p_element).animate({color:NB.S.color.version_loading},'fast');
			 	 NB.Ajax.html(
            'get',
            '#hidden',
            NB.root+'_etc/cache/enface--version-b='+NB.book.id+'&p='+NB.p.current+'&version='+(current_version+direction)+'.html',
            '',
            true,
            null,
            p_element
         );
      } else {
         NB.App.reset(p_element);
         NB.App.focus(p_element);
      }
    },
    unversion: function(){
      $('#content p.version').each(function(){
        var j = $(this);
        j.text(j.data('p_text'));
  		  j.removeClass('version');
  		  $('#crumbs_chunk_version').text('').hide();
   			j.css({color: NB.S.color.text});      
      });
    }
}

/******************************************************************************/

NB.versions = [];
