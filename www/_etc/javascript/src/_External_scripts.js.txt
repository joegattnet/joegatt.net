NB.loadAsyncScript = function(url, div) {
  //We need to check whether the script exists already
  var div = div || 'ex-root';
  var e = document.createElement('script');
  e.type = 'text/javascript';
  e.src = url;
  e.async = true;
  document.getElementById(div).appendChild(e);
};
window.fbAsyncInit = function() {
  FB.init({appId: NB.keys.facebook, status: true, cookie: true, xfbml: true});
};
(function() {
    if(NB.external.facebook){
      NB.loadAsyncScript('http://connect.facebook.net/en_GB/all.js','fb-root');
    }
    if(NB.external.twitter){
      NB.loadAsyncScript('http://platform.twitter.com/anywhere.js?id=' + NB.keys.twitter);
    }
    if(!'contentEditable' in document.body){
      NB.loadAsyncScript('/_etc/min/?f=//_etc/javascript/lib/nicEdit-Skip.js');
    }
})();      
var _gaq=[["_setAccount",NB.keys.google_analytics]];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
 s.parentNode.insertBefore(g,s)}(document,"script"));
 
//NB.loaded_scripts.add(true, function(){
//If we do #async on the url string
//  addthis.init();
//});
