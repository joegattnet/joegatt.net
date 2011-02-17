NB.W.EnfaceMethods = {

		save: function(element) {
			 var sequence = element.readAttribute('sequence'); //element.sequence(); - breaks IE
       NB.W.Paragraphs.uncolorize(element);
			 var error_status = element.readAttribute('error_status');
		 	 var score = NB.W.anagram.snap - NB.W.anagram.total;
		 	 NB.W.anagram.score = score;
		 	 var current_text_raw = element.innerHTML;
       var current_text = NB.page.encodeURIComponent(current_text_raw);

			 if (current_text_raw != element.readAttribute('p_text') && ((error_status==0&&score>0)||NB.user.level>1)) {
			   var new_version_number = Math.pow(10,NB.W.anagram.total.toString().length) - NB.W.anagram.total;
				 //PENDING should be a function
         element.writeAttribute('p_text',element.innerHTML);
         var pending = "new NB.Ajax_html('post','hidden',true,'../_cgi/wutz/_save_paragraph.cgi','score="+score+"&score_total="+NB.W.anagram.snap+"&username='+NB.user.name+'&user_level='+NB.user.level+'&u='+NB.user.id+'&b="+NB.book_id+"&sequence="+sequence+"&p_id="+element.id+"&version="+(NB.W.versions.info[element.id.replace('paragraph_id_','')][5]+1)+"&text="+current_text+"',null,null);_gaq.push(['_trackEvent','Wutz', 'Saved', '+'+score, sequence]);NB.page.update_version_number("+new_version_number+");";
//         NB.page.console(pending);
         if (NB.user.id==0&&NB.Cookie.read('confirmed')=='1'){
					 NB.pending_signedin_action = pending;
				   NB.user.signin('save your changes');
				 } else if (NB.user.id==0){
					 NB.pending_signedin_action = pending;
				   NB.user.signup('save your changes');
				 } else {
				  eval(pending);
				 	 $('alert').update('Saving paragraph '+sequence+'...');
           if (!element.hasClassName('version')){
 	 			 	  element.morph('color:'+NB.SETTINGS.color.ok,{duration:0.5});
 	 			 	 }
				 }
			 } else {
			   var alert = element.readAttribute('alert');
			 	 $('alert').update('<span class="neg">Paragraph '+sequence+' not saved.</span><br/>'+alert);
         _gaq.push(['_trackEvent','Wutz', 'Not saved', alert.stripTags(), sequence]);
         if (!element.hasClassName('version')){
			 	 element.morph('color:'+NB.SETTINGS.color.error,{duration:0.5,afterFinish:function(){
            //To avoid collision if save was triggered by viewing a version
            //SHOULD WE RESET HERE? otherwise, user starts at a disadvantage in other paragraphs
            //we should - but only if when user chooses this paragraph again; it reverts
            //ie: total should always take the base +- current paragraph
            //also consider updating anagram - at the moment it's in basics but doesn't kick in...
            //NB.W.anagram.snap = NB.W.anagram.calc_total();
            element.reset();
            NB.W.anagram.get();
            }});
            element.morph('color:'+NB.SETTINGS.color.text);
          } else {
            element.reset();
            NB.W.anagram.get();
          }
		   }
		   return element;
    },
    
    sequence: function(element){
       return parseInt(element.readAttribute('sequence'));
    },
    
		active: function(element) {
//	 			$('total').morph('color:#dd6400');

         $$('.pair .target p').reject(function(item){
            if(item==element || !item.hasClassName('version')){
              return true;
            }
         }).each(function(item){
              //item.reset();
              item.unversion();
         });

				 var sequence = parseInt(element.readAttribute('sequence')); //element.sequence(); - breaks IE
         NB.p.current = sequence;
				 NB.W.anagram.snap = NB.W.anagram.total;

 				 //this needs to be genericised & moved to NB.refresh
      	 NB.page.crumb(sequence);
      	 var new_path = NB.root+'wutz/' + sequence;

         NB.W.navigator.update(sequence,NB.p.count);
         NB.W.slider = new NB.W.Slider(sequence);
         //*****************************
         
//         var item_id = element.id.replace('paragraph_id_','');
				 NB.Scholia.get(sequence);
         NB.W.Paragraphs.colorize(element);
				 NB.W.versions.display(element.id.replace('paragraph_id_',''));
				 return element;
		},
		reset: function(element){
		     element.unversion();
         NB.W.Paragraphs.uncolorize(element);
         if(NB.W.anagram.score!=0){
      	    $('total').morph('color:'+NB.SETTINGS.color.neutral);
      	    $('total').update(NB.page.add_commas(NB.W.anagram.calc_total()));
      	    $('change').update('');
      	    NB.W.anagram.score = 0;
    	   }
         return element;
    },
    unversion: function(element){
         element.innerHTML = element.readAttribute('p_text');
		     element.removeClassName('version');
 			 	 element.setStyle({color: NB.SETTINGS.color.text});
				 //NB.W.editor.addInstance(element);
         return element;
    },
    source: function(element){
         return element.up('.pair').down('.source').down('p');
    }
};

Element.addMethods('p', NB.W.EnfaceMethods);

NB.W.Enface = Class.create({
		initialize: function(sequence) {
//		  this.refresh(sequence);
//		},
//		
//s		refresh: function(sequence) {
      NB.W.anagram.get();
  		var this_sequence = sequence;
      $$('.target p').each(function(item,iterator) {
           //Element.extend(item); //for IE compatibility
					 NB.W.editor.addInstance(item);
					 //Element.clonePosition(item, item.up('.pair').down('.source').down('p'), {setLeft:false});
					 //item.up('.target').style.height = item.up('.yui-g').getHeight();
  				 item.writeAttribute('sequence',this_sequence);
  				 item.writeAttribute('alert','');
  				 item.writeAttribute('error_status',0);
  				 //var expandedSourceText = item.source().innerHTML.toLowerCase();
  				 //expandedSourceText = expandedSourceText.replace(/À|Á|Â|Ã|Ä|à|á|â|ã/g,'a').replace(/È|É|Ê|Ë|è|é|ê|ë/g,'e').replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss');
  				 //expandedSourceText = expandedSourceText.replace(/ü/gi,'ue').replace(/ß/g,'ss');
           //expandedSourceText = expandedSourceText.replace(/[^0-9a-z]/g,'');
  				 //NB.page.console(expandedSourceText+': '+expandedSourceText.length);
           //item.writeAttribute('sourceLength',expandedSourceText.length);
  				 //NB.page.console('flat text: '+item.source().readAttribute('flat'));
  				 //NB.page.console('flat length: '+item.source().readAttribute('sourcelength'));
  				 var paragraph_text = item.innerHTML;
  				 item.writeAttribute('p_text',paragraph_text);
  				 NB.W.anagram.origArray[this_sequence] = paragraph_text.toLowerCase().toArray();
  				 
    				if(!item.hasClassName('events')){
    				 item.observe('keyup',function(event){
    				    if(event.keyCode==Event.KEY_ESC) {
                  item.reset();
                  return false;
                } else if (event.ctrlKey&&String.fromCharCode(event.keyCode)=='s') {
                  item.save();
                  return false;
                } else {
                  NB.W.anagram.letter(item,event.keyCode);
                }
              });
    				 item.observe('mouseup',function(event){
//This causes anagram to flush (recalculate for paragraph)
//Intended to be triggered when text has been pasted
//Causes double-counting at the moment since the mouseup of initial focus is trigerring it
//                NB.W.selectFlag = true;
             });
    				 item.observe('blur',function(){item.save();});
  					 item.addClassName('events');
  				 }
  				 
					 item.observe('focus',function(event){
					     item.active();
					 });
					 this_sequence++;
 				});
      var p_element = NB.W.Paragraphs.get_target_element_from_sequence(sequence);
      p_element.focus();
      p_element.active();
    }    
});
