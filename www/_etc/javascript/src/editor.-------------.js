if('contentEditable' in document.body){

  NB.Editors = {
    add: function(e){
      $(e).attr('contentEditable',true);
    	return e;
    },
    remove: function(e){
      $(e).attr('contentEditable',false);
    	return e;
    },
    add_all: function(){
      $('.editor').each(function() {
        $(this).attr('contentEditable',true);
      });
    },
    remove_all: function(){
      $('.editor').each(function(item) {
        $(this).attr('contentEditable',false);
      });
    }
  }

} else {

  NB.Editors = {
    add: function(e){
  	if(!$(e).hasClass('editor-ized')){
      NB.Editor.addInstance(e);
    	$(e).addClass('editor-ized');
    	}
    	return e;
    },
    remove: function(e){
      NB.Editor.removeInstance(e);
     	$(e).removeClass('editor-ized');
    	return e;
    },
    add_all: function(){
      $('.editor').each(function() {
      	  NB.Editors.add(this);
      });
    },
    remove_all: function(){
      $('.editor').each(function(item) {
         NB.Editors.removeInstance(this);
      });
    }
  }

  NB.Editor = new nicEditor();

}
