NB.Nav.slider = function (p) {
  $('.ui-slider-ized').each(function () {
    $(this).slider('value', p);
  });
  $('.ui-slider').not('.ui-slider-ized').each(function () {
    $(this).slider({
      min: 1, 
      max: NB.p.max, 
      value: p, 
      animate: 'fast', 
      slide: function (event, ui) {
          var value = Math.round(ui.value);
          $('.ui-slider-ized').not($(this)).each(function () {
              $(this).slider('value', value);
            });
          $('.navigator .goto').addClass('goto-focused').val(value);
        }, 
      stop: function (event, ui) {
          var this_slider, value;
          this_slider = $(this).closest('.ui-slider');
          value = Math.round(ui.value);
          NB.Nav.fetch(NB.crumb.path + value);
          NB.Nav.track(2, 'Navigator', 'Slider', 'Random-access', value);
          NB.Cookie.write(this_slider.attr('id') + '_left', this_slider.find('.ui-slider-handle').css('left'), NB.crumb.dir);
        }
    });
    $(this).addClass('ui-slider-ized');
  });
};

/***/

$('body').bind('content.loaded', function () {
  NB.Nav.slider(NB.p.current);
});
