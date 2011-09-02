// Based on jQuery.richArray.sum
jQuery.richArray.sumAbs = function(array, init) {
  array = jQuery.richArray.getArray(array);
  init = init || 0;
  for (var i = 0, len = array.length; i < len; ++i) {
    init += Math.abs(array[i]);
  }
  return init;
}

jQuery.richArray.match = function(array, value) {
    array = jQuery.richArray.getArray(array);
    value = value || 0;
    for (var i = 0, len = array.length; i < len; ++i) {
    if (value.match(array[i])) {
        return true;
    }
  }
  return false;
}
    