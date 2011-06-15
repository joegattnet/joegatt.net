window.onload = function(){
  NB.loaded = true;
  NB.loaded_scripts.run();
  $('body').trigger('section.loaded');
  $('#container').removeClass('ajax_large');
}
