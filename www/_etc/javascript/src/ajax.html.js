NB.Ajax = {
		html: function(formMethod,outDiv,url,params,cache,position,indDivIn,loadPage,run) {
    		var current = $(outDiv).data('url')||'';
    		var urlFull = url+(params==''?'':'?'+params);
        var key = urlFull;
        //NB.Url.path(url);
		    NB.Nav.track(1,'New Ajax: ',current,urlFull,outDiv.id);
        var indDiv = indDivIn || outDiv;
    		NB.Nav.track(1,outDiv,current,urlFull==current, (NB.cache[key]!=undefined));
		    if (cache && (key == current)){
          NB.Nav.track(1,outDiv,"AAAAAAAAAAAAAAAA Url not changed.",url,outDiv.id);
		      return;
        } else if(cache && (NB.cache[key]!=undefined)){
          NB.Ajax._update(outDiv,position,NB.cache[key].data);
          $(outDiv).html(NB.cache[key].data);
          if(loadPage){
            NB.Ajax._meta_load(urlFull,loadPage);
          } else {
             $('body').trigger('minor.loaded');
          }
          NB.Ajax._done(indDiv);
          NB.Nav.track(1,"BBBBBBBBBBBBBBBB Retrieved from NB.cache:",url,outDiv.id);
        } else {
          console.log('CCCCCCCCCCCC FETCHING',url,outDiv.id);
          NB.Ajax._active(indDiv);
          $.ajax({
            type: formMethod,
            url: url,
            data: params,
            dataType: 'html',
            cache: cache,
            success: function(data) {
              if(data===''||data===undefined||data===null){
                //Possibly a content encoding error - we risk a loop, of course
                //Cache cgi now ensures a document is never empty;
                NB.Nav.track(1,'AJAX returned null - retrying.');
                NB.Ajax.html(formMethod,outDiv,url,params,cache,position,indDiv,loadPage);
              } else {
                NB.Ajax._update(outDiv,position,data);
                if(cache){
                  NB.Cache.add(urlFull,data);
                }
                NB.Ajax._done(indDiv);
                if(loadPage){
                   NB.Ajax._meta_load(urlFull,loadPage);
                } else {
                   $('body').trigger('minor.loaded');
                   $(outDiv).data('url', urlFull);
                }
                if(run){
                   run();
                }
              }
            },
          	error: function(XMLHttpRequest,textStatus,errorThrown){
               NB.Ajax._error(indDiv, textStatus, errorThrown);
               if(errorThrown==330){
                //See above
                NB.Nav.track(1,'AJAX returned 330 - retrying.');
                NB.Ajax.html(formMethod,outDiv,url,params,cache,position,indDiv,loadPage);
               }
          	}
          });

      }
  		NB.Nav.track(1,'*** ------------------------------------------------- *');
  		return false;
    },
    _update: function(outDiv,position,data){
      if(position=='top'){
        $(outDiv).prepend(data);
      } else if(position=='bottom') {
        $(outDiv).append(data);
      } else {
        $(outDiv).html(data);
      }
    },
    _pause: function(){
      return false;
    },
    _active: function(e){
  				$(e).addClass('ajax_loading');
          $(e).bind('click.pause keydown.pause', NB.Ajax._pause);
    },
    _done: function(e){
          var j = $(e);
          j.unbind('.pause');
  				j.removeClass('ajax_error');
  				j.removeClass('ajax_loading');
  				j.addClass('ajax_done');
  			  setTimeout(function(){
            j.removeClass('ajax_done');
          },1000);
    },
    _error: function(e,textStatus,errorThrown){
          var j = $(e);
          j.unbind('.pause');
//  				j.switchClass('ajax_loading','ajax_error');
  				j.removeClass('ajax_loading');
  				j.addClass('ajax_error');
  			  setTimeout(function(){
            j.removeClass('ajax_error');
          },5000);
  			  NB.Nav.track(0,'error','Ajax error:'+errorThrown,textStatus);
    },
    _meta_load: function(urlFull,loadPage){
        $(window).scrollTop(0);
        NB.Nav.crumb.load(loadPage);
        var scope = urlFull.indexOf('scope')>=0?urlFull.match(/(scope=)([a-z]+)/)[2]:'minor';
        $('#'+scope).data('url', urlFull);
        $('body').trigger(scope+'.loaded');
    }
}
