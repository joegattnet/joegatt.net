NB.Versions = {
		display: function (q) {
		NB.Nav.track('Versions.display', q);

        var pq = 'p' + q;
        var thisVersion = NB.versions[pq];
        var showUserName = (NB.User.id === thisVersion.userId?'me':thisVersion.userName);

        NB.Nav.track(2, '_trackPageview', NB.crumb.lastloaded === undefined?location.pathname:NB.crumb.lastloaded + (thisVersion.latest?'':'/v/' + q));
        
        var fullDescription = 'Paragraph ' + NB.p.current + ' version 0.' + thisVersion.version + ', score: ' + (thisVersion.score> 0?thisVersion.score:'');
        var info = '<p title="' + fullDescription + '"> &para; ' + NB.p.current + ' v<span class="version-chunk-source"> 0.' + thisVersion.version + '</span> ' + (thisVersion.score> 0?' &#x25b2;' + thisVersion.score:'') + '</p>';
        info  += '<p><span class="user-name" data-username="' + thisVersion.userName + '">' + showUserName + '</span>, <time datetime="' + thisVersion.date_iso8601 + '" class="timeago">' + thisVersion.date_full + '</time></p>';
        
        $('#version_info_panel').html(info);
        NB.Ui.timeago();
        
        NB.Nav.crumb.version_chunk();
        
        $('#versions_nav a').each(function () {
          $(this).unbind('click.versions');
        });
        if (thisVersion.version === 1) {
          $('#version_first').bind('click.versions', NB.Tools.empty);
          $('#version_first').addClass('disabled');
          $('#version_previous').bind('click.versions', NB.Tools.empty);
          $('#version_previous').addClass('disabled');
        } else {
          $('#version_first').bind('click.versions', function () {
            NB.Versions.get(q, thisVersion.version, 0)
          });
          $('#version_first').removeClass('disabled');
          $('#version_previous').bind('click.versions', function () {
            NB.Versions.get(q, thisVersion.version, -1)
          });
          $('#version_previous').removeClass('disabled');
        }
        if (thisVersion.isLatest) {
          $('#version_next').bind('click.versions', NB.Tools.empty);
          $('#version_next').addClass('disabled');
          $('#version_latest').bind('click.versions', NB.Tools.empty);
          $('#version_latest').addClass('disabled');
        } else {
          $('#version_next').bind('click.versions', function () {
            NB.Versions.get(q, thisVersion.version, 1)
          });
          $('#version_next').removeClass('disabled');
          $('#version_latest').bind('click.versions', function () {
            NB.Versions.get(q, thisVersion.version, 2)
          });
          $('#version_latest').removeClass('disabled');
        }
        $('body').trigger('minor.loaded');
    }, 
    get:function (q, current_version, direction) {
      var pq = 'p' + q;
      var p_element = NB.App.get_target(NB.p.current);
      var getVersion = current_version + direction;
      if (direction === 0) {
        getVersion = 1;
      }
      if (direction!=2 && (getVersion != NB.versions['p' + $(NB.App.get_target(NB.p.current)).data('id')].version)) {
         p_element.addClass('version');
         NB.Editors.remove(p_element);
 			 	 $(p_element).animate({color:NB.S.color.version_loading}, 'fast');
			 	 NB.Ajax.html(
            'get', 
            '#hidden', 
            NB.root + '_etc/cache/enface--version-b=' + NB.book.id + '&p=' + NB.p.current + '&version=' + getVersion + '.html', 
            //This should be converted to json
            '', 
            true, 
            null, 
            p_element
         );
      } else {
          NB.Versions.unversion();
          NB.App.reset($(p_element), true);
      }
    }, 
    unversion: function () {
      $('#content p.version').each(function () {
        var j = $(this);
        j.text(j.data('p_text'));
  		  j.removeClass('version');
  		  //$('#crumbs_chunk_version').text('').hide();
   			j.css({color: NB.S.color.text});
      });
    }
}

/******************************************************************************/

NB.versions = [];