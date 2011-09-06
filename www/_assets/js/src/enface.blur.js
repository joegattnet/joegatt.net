NB.Enface.blur = function(event){
  var e = event.target;
  var j = $(e);
  j.removeClass('focused');
  var p = j.data('p');
  NB.Tools.colorize.undo(e);
  if (j.data('dirty')){
    var error_status = j.data('error_status');
    var score = NB.Anagram.snap - NB.Anagram.total;
    NB.Anagram.score = score;
    var current_text_raw = j.text();
    var current_text = NB.Url.encode(current_text_raw);
    if ((error_status==0&&score>0)||NB.User.level>1) {
     var new_version_number = NB.versions['p'+j.data('id')].version + 1;
     //var new_version_number_display = NB.Anagram.total_version(NB.Anagram.total);
     j.data('p_text',current_text_raw);
     var pending = "NB.Ajax.html('post','#hidden','/_etc/exe/enface/save.pl','score="+score+"&score_total="+NB.Anagram.total+"&username='+NB.User.name+'&user_level='+NB.User.level+'&u='+NB.User.id+'&b="+NB.book.id+"&p="+p+"&p_id="+e.id+"&version="+(new_version_number)+"&text="+current_text+"',false);NB.Nav.track(2,'Enface', 'Saved', '+"+score+"', " + p + ");NB.Versions.display("+new_version_number+");NB.Enface.reset($('#"+e.id+"'),false);";
     if (NB.User.id==0){
		 	 NB.User.pending.add(pending,10);
       NB.User.popup('save your changes');
     } else {
      eval(pending);
     	 $('#alert').text('Saving paragraph '+p+'...');
       if (!j.hasClass('version')){
     	  j.animate({color:NB.S.color.ok},500);
     	 }
     }
    } else {
     var alert = j.data('alert');
     $('#alert').html('<span class="neg">Paragraph '+p+' not saved. </span><br/>'+alert);
     NB.Nav.track(2,'Enface', 'Not saved', alert.replace(/(<([^>]+)>)/g,''), p);
     if (!j.hasClass('version')){
        j.animate({color:NB.S.color.error},NB.S.speed.slower,function(){
          NB.Enface.reset(e,false);
          j.animate({color:NB.S.color.text},NB.S.speed.fast);
       });
      } else {
        NB.Enface.reset(e,false);
      }
    }
  } else {
     $('#alert').text('');
  }
  return e;
}
