NB.Comments.scholia = {
	get: function (p) {
     var paragraph_id = ($('#p_' + p).length?NB.App.getTarget(NB.p.current).data('id'):false), 
     editable = NB.User.id != 0 && $.assArray.join(NB.versions, '').indexOf('=' + NB.User.id + ', ')!=-1, 
     editability, 
     params;
	   NB.Nav.track(0, 'Getting Scholia', p);
     if (editable) {
       editability = function () {
        $('#scholia').addClass('editable');
       }
     } else {
       editability = function () {
        $('#scholia').removeClass('editable');
       }
     }
     params = '&b=' + NB.book.id + '&p=' + p;
	   NB.Ajax.html(
        'get', 
        '#scholia', 
        NB.root + '_etc/cache/common--scholia-' + params + '.html', 
        '', 
        true, 
        null, 
        null, 
        null, 
        editability
     );
	}, 
	save: function () {
	 //This should be genericised to use comments add
    var note = $('textarea', '#scholia').val(), 
    pending;
    $('#scholia_form').hide('blind');
     $('#scholia form [name=paragraph_id]').val(NB.App.getTarget(NB.p.current).data('id'));
		 if (NB.User.id !== 0 && note !== '') {
		   //Form is not shown if user is not logged in so pending is superfluous 
  		 //pending = "var form = $('#scholia form');";
       //pending  += "NB.Ajax.html('post', '#scholia_list', form.attr('action'), form.serialize(), false, 'top', '#scholia', null, function () {NB.String.increment($('span', '#scholia_count'));$('#added_scholia').show('blind').show('highlight');});";
  		 var form = $('#scholia form');
       NB.Ajax.html(
        'post', 
        '#scholia_list', 
        form.attr('action'), 
        form.serialize(), 
        false, 
        'top', 
        '#scholia', 
        null, 
        function () {
          NB.String.increment($('span', '#scholia_count'));
          $('#added_scholia').show('blind').show('highlight');
          }
        );
  		}
	}
}

/******************************************************************************/

$('body').bind('signedin.user signedout.user', function () {
  if (NB.crumb.page_app === 'enface') {
    NB.Comments.scholia.get(NB.p.current);
  }
});

$('#container').delegate('#new_scholia', 'change', function () {
  NB.Comments.scholia.save();
});
