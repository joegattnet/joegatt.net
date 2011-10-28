NB.Nav.slider = function (p) {
  var min, max, den;
  // The value is exaggerated for full resolution which improves accuracy and
  // smooths out the sliding motion. A denominator is set to return it to a
  // percentage.
  if (NB.p.chunk === 'percentage') {
    p = NB.App.percentage;
    min = 0;
    max = 1000;
    den = 10;
  } else {
    min = 1; 
    max = NB.p.max;
    den = 1; 
  }
  $('.ui-slider-ized').each(function () {
    $(this).slider('value', p);
  });
  $('.ui-slider').not('.ui-slider-ized').each(function () {
    $(this).slider({
      min: min, 
      max: max, 
      value: p, 
      animate: 'fast', 
      slide: function (event, ui) {
          var value = Math.round(ui.value)/den;
          $('.ui-slider-ized').not($(this)).each(function () {
              $(this).slider('value', value);
            });
          $('.navigator .goto').addClass('goto-focused').val(value);
          NB.App.slide(value);
        }, 
      stop: function (event, ui) {
          var this_slider, value;
          value = Math.round(ui.value)/den;
          this_slider = $(this).closest('.ui-slider');
          NB.App.goto(value);
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
