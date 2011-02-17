NB.loaded_scripts = {
  add: function(func) {
    if(NB.loaded){
      func();
    } else {   
      var old_loaded_scripts = this._run;
      this._run = function() {
        old_loaded_scripts();
        func();
      }
    }
  },
  _run:function(){},
  run: function(){
    NB.Nav.track(1,'Running NB.loaded_scripts');
    this._run();
    this._run = function(){};
  }
}
