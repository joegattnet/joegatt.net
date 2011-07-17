NB.Enface.blur = function (event) {
  var e, j, p, error_status, score, current_text_raw, current_text, new_version_number, pending, alert;
  e = event.target;
  j = $(e);
  j.removeClass('focused');
  p = j.data('p');
  NB.Tools.colorize.undo(e);
  if (j.data('dirty')) {
    error_status = j.data('error_status');
    score = NB.Anagram.snap - NB.Anagram.total;
    NB.Anagram.score = score;
    current_text_raw = j.text();
    current_text = NB.Url.encode(current_text_raw);
    if ((error_status === 0 && score> 0)||NB.User.level> 1) {
      new_version_number = '0.' + Math.pow(10, NB.Anagram.total.toString().length) - NB.Anagram.total;
      j.data('p_text', current_text_raw);
      pending = "NB.Ajax.html('post', '#hidden', '/_etc/cgi/enface/save.cgi', 'score="+score+"&score_total="+NB.Anagram.snap+"&username='+NB.User.name+'&user_level='+NB.User.level+'&u='+NB.User.id+'&b="+NB.book.id+"&p="+p+"&p_id="+e.id+"&version="+(NB.versions['p'+j.data('id')][5]+1)+"&text="+current_text+"', false);NB.Nav.track(2, 'Enface', 'Saved', '+"+score+"', "+p+");NB.Versions.display("+new_version_number+");NB.Enface.reset($('#"+e.id+"'), false);";
      if (NB.User.id === 0) {
		 	  NB.User.pending.add(pending, 10);
        NB.User.popup('save your changes');
      } else {
      eval(pending);
     	 $('#alert').text('Saving paragraph ' + p + '...');
       if (!j.hasClass('version')) {
     	  j.animate({color:NB.S.color.ok}, 500);
     	 }
     }
    } else {
     alert = j.data('alert');
     $('#alert').html('<span class="neg"> Paragraph ' + p + ' not saved. </span> <br> ' + alert);
     NB.Nav.track(2, 'Enface', 'Not saved', alert.replace(/(<([^> ] + )> )/g, ''), p);
     if (!j.hasClass('version')) {
        j.animate({color:NB.S.color.error}, NB.S.speed.slower, function () {
          NB.Enface.reset(e, false);
          j.animate({color:NB.S.color.text}, NB.S.speed.fast);
       });
      } else {
        NB.Enface.reset(e, false);
      }
    }
  } else {
     $('#alert').text('');
  }
  return e;
}
