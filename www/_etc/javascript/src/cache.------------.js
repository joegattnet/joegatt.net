NB.Cache = {
  add: function(key,data){
    if(key!=''&&key!=undefined){
      key = NB.Url.path(key);
      NB.cache[key] = {data: data, time: ((new Date()).getTime()-NB.timestamp)};
    }
  },
  remove: function(key){
    key = NB.Url.path(key);
    if(key!=''&&key.indexOf('_')!=0){
      if(key.indexOf('_etc/cache')==-1){
        var params = 'scope=section';
      } else {
        var params = '';
      }
      $.ajax({
        type: 'get',
        url: key,
        data: params,
        dataType: 'html',
        cache: false,
        success: function(data){
          NB.Cache.add(key,data); 
        }
      });
      
      NB.Nav.track(1,'Refreshed cache:',key);
    } else {
      NB.cache = $.assArray.without(NB.cache,key);
    }
  },
  removeCurrent: function(){
    NB.Cache.remove($('#comments').attr('href'));
//    NB.Cache.remove($('#scholia').attr('href'));
//    NB.Cache.remove($('#page').attr('href'));
    NB.Cache.remove($('#section').attr('href'));
  },
  update: function(e){
    var j = $(e);
    NB.Cache.add(j.attr('href'),j.html());
  },
  updateCurrent: function(){
  //use page_id, comments_id etc; search on keys and do it
    NB.Cache.update('#comments');
    NB.Cache.update('#scholia');
    NB.Cache.update('#page');
    NB.Cache.update('#section');
  },
  purge: function(){
    var timeNow = new Date().getTime();
      if(NB.cache){
        for (var i in NB.cache){
          for (var test=0,len=NB.S.purge.length;test<len; ++test){
            if(i.match(NB.S.purge[test][0])!=null && (timeNow-NB.cache[i].time)>NB.S.purge[test][1]*60000){
              NB.Cache.remove(i);
            }
           }    
        }
      }
  },
  prefetch: function(){
    //NB.Cache.prefetch_html();
    //NB.Cache.prefetch_etc/images();
    return true;
  }
}

/******************************************************************************/

NB.cache = [];

NB.purging = setInterval('NB.Cache.purge();',NB.S.cron.purge);

NB.purging = setInterval('NB.Cache.prefetch();',NB.S.cron.prefetch);
