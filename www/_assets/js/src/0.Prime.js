NB.loaded_scripts = {
  add: function(all, func) {
      if((all && NB.loaded.all) || NB.loaded) {
        func();
      } else {   
        if (all) {
          var old_loaded_scripts = this._run_all;
          this._run_all = function() {
            old_loaded_scripts();
            func();
          }
        } else {
          var old_loaded_scripts = this._run;
          this._run = function() {
            old_loaded_scripts();
            func();
          }
        }
      }
  }, 
  _run:function(){}, 
  run: function(){
    NB.Nav.track(1, 'Running NB.loaded_scripts');
    this._run();
    this._run = function(){};
  }, 
  _run_all:function(){}, 
  run_all: function(){
    NB.Nav.track(1, 'Running NB.loaded_scripts (All)');
    this._run_all();
    this._run_all = function(){};
  }
}
