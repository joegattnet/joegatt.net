NB.Refresh = Class.create({
		initialize: function() {
		  this.refresh();
		},
		refresh: function() {
//              NB.page.console('Refresh');
    			$$('a').reject(function(item){
            return (item.hasClassName('refresh') || item.hasClassName('refresh_ignore') || item.target!='' || item.href.include('http:') || item.href.include('javascript') || item.href.include('mailto:'));
          }).each(function(item){
//            item.observe('click',function(){
// remember to update crumb.section
            item.onclick = function(){
//              NB.page.console('clicked');
              var href = item.href;
//              NB.page.console(href);
              if(href.include(NB.crumb.section)){
                var scope = 'page';
              } else {
                var scope = 'section';
              }
			 	      new NB.Ajax_html("get",scope,true,href,"?scope="+scope,null);
			 	      location.hash = href.replace('http://'+location.host,'');
//need to add pageTracker
// need to use iframe for IE
              return false;
    			  };
            item.addClassName('refresh');
    			});
  			},
  			bookmarks:function(new_bm){
  			 if($('n_share').readAttribute('rel')!=new_bm){
           //cache bitly urls in js array
    				new Ajax.Request(NB.root+'_cgi/_common/_bitly.cgi?'+encodeURIComponent(NB.canonical),{
    					method:'get',
    				  onSuccess:function(t){
                this.bookmarks_update(t.responseText);
    				  },
    				  onFailure:function(){
                this.bookmarks_update(bitly_url = NB.canonical);
              }
    				});
  				}
        },
        bookmarks_update:function(bitly_url){
      	 $$("#n_share a.bm").each(function(item){
      	   if(item.href.include('bit.ly')){
             item.href = item.href.replace(/\=http.*/,'='+bitly_url);
             } else {
             item.href = item.href.replace(/\=http.*/,'='+NB.canonical);
      	   }
         });
         $('n_share').writeAttribute('rel',new_bm);
        }
});
