NB.W.Paragraphs = {
		get_target_element_from_sequence:function(q){
		  return $('sequence_'+q).down('.target').down('p');
    },
    focus_current:function(){
      var element = $$('#sequence_'+NB.p.current+' .target p')[0];
      element.focus();    
      element.active();    
    },
		first: function(e){
  			NB.W.slider.object.setValue(1);
        _gaq.push(['_trackEvent','Navigator', 'Slider', 'First']);
  			Event.stop(e);
		},
		previous: function(e){
			if (NB.p.current>1) {
  			NB.W.slider.object.setValue(NB.p.current - 1);
        _gaq.push(['_trackEvent','Navigator', 'Slider', 'Previous']);
      }
  			Event.stop(e);
		},
		next: function (e) {
      if (NB.p.current<NB.p.count) {
  			NB.W.slider.object.setValue(NB.p.current + 1);
        _gaq.push(['_trackEvent','Navigator', 'Slider', 'Next']);
			}
  			Event.stop(e);
		},
		last: function (e) {
  			NB.W.slider.object.setValue(NB.p.count);
        _gaq.push(['_trackEvent','Navigator', 'Slider', 'Last']);
  			Event.stop(e);
		},
		goto: function(which,e){
        NB.W.slider.object.setValue(which);
  			Event.stop(e);
		},
    colorize:function(q){
       // cache calculated words in an array
       // if we do spellcheck, etc it would need to go here
       if($('tool_colorize').hasClassName('on')){
  			 q.update(q.innerHTML.stripTags().gsub(/\w+/,function(match){
  			  var score = NB.W.Paragraphs.word_score(match[0]);
//  			  NB.page.console('Text: '+q.innerHTML);
//  			  NB.page.console('Score: '+score);
          if (score<0) {
            return '<span class="neg neg'+score+'" title="&#x25bc;'+(score*-1)+'">'+match[0]+'</span>';
          } else if (score>0) {
            return '<span class="pos pos'+score+'" title="&#x25b2;'+score+'">'+match[0]+'</span>';
          } else {
            return '<span title="&#x25b6;0">'+match[0]+'</span>';
          }
         }));
       }
    },
    word_score:function(word){
//    NB.page.console(NB.W.anagram.anagram);
      return word.toLowerCase().split('').collect(function(letter) {
        return NB.W.anagram.anagram[NB.W.anagram.alphabet.indexOf(letter)];
      }).inject(0,function(acc,n) { return acc + n*-1/Math.abs(n*-1); });
    },
    check_text:function(element){
      var elementContent = element.innerHTML;
      var elementContentStripped = elementContent.replace(/<del>.*?<\/del>/g,'').stripTags();
      var targetLength = elementContentStripped.replace(/[^0-9a-zA-Z]/g,'').length;
      var difference = element.readAttribute('sourcelength') - targetLength;
//      console.log(elementContentStripped.replace(/[^0-9a-zA-Z]/g,''));
//      var changes = NB.Diff.measure(element.readAttribute('p_text'),elementContent);
      var alertMessage = '';
      var error_status = 0;
      if (/([a-zA-Z])\1\1+/.test(element.innerHTML)){
        alertMessage = '<span class="neg">Contains gibberish.</span>';
        error_status = 2;
        element.update(elementContent.replace(/([a-zA-Z])\1\1+/g,'<span class="gibberish">$&</span>'));
      } else if (difference > NB.W.lengthTolerance) {
        alertMessage = '<span class="neg">Too short (-'+difference+' letters).</span>';
        error_status = 3;
      } else if (targetLength>NB.W.lengthThreshold&&(difference < NB.W.lengthTolerance*-1)) {
        alertMessage = '<span class="neg">Too long (+'+(difference*-1)+' letters).</span>';
        error_status = 4;
//      } else if (NB.W.anagram.score>0&&$('alert').innerHTML=='') {
//        alertMessage = '<span>Click anywhere outside the paragraph to save it.</span>';
      //Levenshtein is slow on long texts - left to last
      //Arbitrarily testing only first 500 characters
      //We can do some sort of bubble-check
      //Choose next 500, etc
      //If we knew the caret position, we could just test around it
      } else {
        var changes = element.readAttribute('p_text').levenshtein(elementContent.truncate(500,''));
        var changesTolerance = parseInt(targetLength*(NB.W.changesTolerancePercentage/100));
        changesTolerance = NB.page.range(changesTolerance,NB.W.changesToleranceMin,NB.W.changesToleranceMax);
        if (changes > changesTolerance) {
            alertMessage = '<span class="neg">Too many changes ('+changes+'/'+changesTolerance+').</span>';
            error_status = 1;
        }
      }
      element.writeAttribute('error_status',error_status);
      element.writeAttribute('alert',alertMessage);
      return alertMessage;      
    },
    uncolorize:function(q){
			   q.update(q.innerHTML.stripTags());
    },
		add_editors: function(){
	      $$('.target p').each( function(item) {
					 NB.W.editor.addInstance(item);
				});
    },
		remove_editors: function(){
	      $$('.target p').each( function(item) {
					 NB.W.editor.removeInstance(item);
				});
    }
};
