NB.Enface = {
  invoke: function(){
    NB.Nav.track(1,'NB.Enface invoked.');
    NB.App.focus = NB.Enface.focus;
    NB.App.blur = NB.Enface.blur;
    NB.App.keyup = NB.Enface.keyup;
    NB.App.reset = NB.Enface.reset;
    NB.App.events();
    NB.Enface.initialize(NB.p.top);
    NB.Enface.invoked = true;
  },
  lengthTolerance: 7,
  lengthThreshold: 50,
  changesTolerancePercentage: 10,
  changesTolerancemin: 5,
  changesToleranceMax: 100,
  selectFlag: false,
  invoked: false
}

/******************************************************************************/

/*
  See NB.App for binding. */
