NB.Idling = function () {
// Is this necessary?
    this.focus = function () {return true;}, 
    this.blur = function () {return true;}, 
    this.keyup = function () {return true;}, 
    this.previous = function () {return true;}
    this.next = function () {return true;}
    this.first = function () {return true;}
    this.focus = function () {return true;}
    this.last = function () {return true;}
    this.goto = function () {return true;}
    this.slide = function () {return true;}
    this.reset = function () {return true;}
};

// Just a placeholder
NB.App = new NB.Idling();

/******************************************************************************/

$('body').bind('content.loaded', function () {
  if (NB.crumb.page_app === 'enface') {
    NB.App = new NB.Enface(NB.p.top);
  } else if (NB.crumb.page_app === 'pantography') {
    NB.App = new NB.Pantography(NB.p.current);
  } else {
  // NB.Enface.invoked = false;
    NB.App = new NB.Idling();
  }
  $('.app', '#content').bind('focus', function (event) {
    NB.App.focus(event);
  });
  $('.app', '#content').bind('blur', function (event) {
    NB.App.blur(event);
  });
  $('.app', '#content').bind('keyup', function (event) {
    NB.App.keyup(event);
  });
});
