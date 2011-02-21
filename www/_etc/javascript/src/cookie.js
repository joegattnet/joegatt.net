NB.Cookie = {
	write: function (name,value,path,duration) {
    var path = path || '/';
    var duration = duration || 365*24*60;
    var date = new Date();
    date.setTime(date.getTime()+(duration*60*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+value+expires+"; path="+path;
	},
	write_session: function (name,value,path) {
    var path = path || '/';
    document.cookie = name+"="+value+"; path="+path;
	},
  read: function(name) {
    var path = path || '/';
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
   },
  remove: function (name,path) {
    var path = path || '/';
    var date = new Date();
    date.setTime(date.getTime()+(-1*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+';'+expires+"; path="+path;
	},
	purge: function(){
	  //This only removes root cookies
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++){
      NB.Cookie.remove(cookies[i].split("=")[0]);
    }
  }
};
