NB.loaded = true;
NB.loaded_scripts.run();
$('body').trigger('section.loaded');

window.onload = function(){
  NB.loaded.all = true;
  NB.loaded_scripts.run_all();
  $('#container').removeClass('ajax_large');
}
