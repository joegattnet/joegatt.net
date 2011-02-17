NB.Ajax_html = Class.create({
    // This should
    // 1. Check that the url is not already loaded in div (check rel)
    // 2. store everything to a js array & retrieve if requested again
		initialize: function(formMethod,outputDiv,randomise,url,params,position,indicateDivIn) {
		    var indicateDiv = (indicateDivIn==null?outputDiv:indicateDivIn);
        Event.observe(indicateDiv, 'click', function() {
          return false;
        });
        Event.observe(indicateDiv, 'keydown', function() {
          return false;
        });
        NB.page.ajax_active(indicateDiv);
        
      	new Ajax.Updater(
      	outputDiv,
      	url, 
      	{
      		method: formMethod,
      		requestHeaders: ["ContentType", "text/html;charset=UTF-8"],
      		parameters: params + (randomise?NB.page.url_rand(url.include('?')):''),
      		evalScripts: true,
					onSuccess: function(){
                     NB.page.ajax_done(indicateDiv);
                     var temp = setTimeout("NB.page.add_events();NB.refresh.refresh();",100);

// this is currently being done through crumb
// Need to consolidate
// - jg_ajax
// - NB.page.crumb
// - NB.refresh
// - bookmarks
//  					           if(pageTracker && 'content page section'.include(outputDiv)){
  					             //reformat into bookmarkable url before submitting
//                         pageTracker._trackPageview(url+'?'+params);
//                       }
                     },
					onFailure: function(){
					           NB.page.ajax_error(indicateDiv);
            		     $(indicateDiv).stopObserving('click');
            		     $(indicateDiv).stopObserving('keydown');
										 },
					insertion: position
     	 });
    }
});
