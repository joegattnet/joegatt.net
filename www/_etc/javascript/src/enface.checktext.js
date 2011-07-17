NB.Enface.check_text = function (e) {
  var j = $(e);
  var elementContent = j.html();
  var elementContentStripped = NB.String.strip(elementContent.replace(/<del> .*?<\/del> /g, ''));
  var targetLength = elementContentStripped.replace(/[^0-9a-zA-Z]/g, '').length;
  var difference = j.data('sourcelength') - targetLength;
  var alertMessage = '';
  var error_status = 0;
  if (/([a-zA-Z])\1\1 + /.test(elementContent)) {
    alertMessage = '<span class="neg"> Contains gibberish.</span> ';
    error_status = 2;
    j.html(elementContent.replace(/([a-zA-Z])\1\1 + /g, '<span class="gibberish"> $&</span> '));
  } else if (difference >  NB.Enface.lengthTolerance) {
    alertMessage = '<span class="neg"> Too short (-' + difference + ' letters).</span> ';
    error_status = 3;
  } else if (targetLength> NB.Enface.lengthThreshold && (difference < NB.Enface.lengthTolerance*-1)) {
    alertMessage = '<span class="neg"> Too long ( + ' + (difference*-1) + ' letters).</span> ';
    error_status = 4;
  } else {
    var beforeText = NB.String.truncate(j.data('p_text'), 500, '');
    var afterText = NB.String.truncate(elementContent, 500, '');
    var changes = NB.String.levenshtein(beforeText, afterText);
    var changesTolerance = parseInt(targetLength*(NB.Enface.changesTolerancePercentage/100));
    changesTolerance = NB.Number.range(changesTolerance, NB.Enface.changesTolerancemin, NB.Enface.changesToleranceMax);
    if (changes >  changesTolerance) {
        alertMessage = '<span class="neg"> Too many changes (' + changes + '/' + changesTolerance + ').</span> ';
        error_status = 1;
    }
  }
  j.data('error_status', error_status);
  j.data('alert', alertMessage);
  return alertMessage;      
}
