NB.W.Anagram = Class.create({

		initialize: function(){
  		this.anagram = [];
      this.table = true;
      this.total = 0;
      this.snap = 0;
      this.score = 0;
      this.origArray = [];
      this.alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
      this.alphabetArray = this.alphabet.toArray();
      this.table = $$('#anagramometer tr');
//		  this.get();
    },
    
		get: function(){
		  NB.page.ajax_active('anagramometer');
		  var Anagram = this;
			new Ajax.Request('../_cgi/wutz/_get_anagram.cgi?b='+NB.book_id+NB.page.url_rand(false),{
//			new Ajax.Request('_cache/_anagram_table.json',{
						method:'get',
					  onSuccess:function(t){
              NB.page.ajax_done('anagramometer');
              var json = eval(t.getResponseHeader('X-JSON'));
              Anagram.anagram = json.anagram;
              Anagram.snap = Anagram.calc_total();
              Anagram.update();
              NB.Tools.colorize();
					  },
					  onFailure:function(){
              NB.page.ajax_error('anagramometer');
            }
			});
		},
		
    letter: function(element,k){
		  if (NB.W.selectFlag || k == Event.KEY_DELETE || k == Event.KEY_BACKSPACE) {
//console.log((NB.W.selectFlag) + '|' + (k == Event.KEY_DELETE) + '|' + (k == Event.KEY_BACKSPACE));
				NB.W.selectFlag = false;
			  this.recalculate_paragraph(element);
		  }
		
			if (k==Event.KEY_RETURN){
				 return false;
			} else if (k >= 48 && k <= 57) {
				 var letter = k-48;
			} else if (k >= 65 && k <= 90) {
				 var letter = k-55;
			} else {
			   return;
			}
      
      var sequence = element.readAttribute('sequence');
      //HACK to fix double counting of first letter
//			this.origArray[sequence][this.origArray[sequence].size()] = this.alphabetArray[letter];

			var before = this.anagram[letter];
//			console.log(letter+' Before: '+before);
			this.anagram[letter]++;
//		  console.log(letter+' After: '+this.anagram[letter]);
			var showcolor = (Math.abs(before)<Math.abs(this.anagram[letter])?NB.SETTINGS.color.error:NB.SETTINGS.color.ok);
      // element.sequence() doesn't work in IE, possibly due to DOM extension?
			this.origArray[sequence][this.origArray[sequence].size()] = this.alphabetArray[letter];
			var letter_panel = this.table[letter];
      var letter_cell = letter_panel.down(1);
			var letter_bg = (letter_panel.hasClassName('even')?NB.SETTINGS.color.stripe_even:NB.SETTINGS.color.stripe_odd);
			letter_cell.update(this.anagram[letter]);
//			NB.W.indicating = new Effect.Highlight(letter_panel, {startcolor:letter_bg,endcolor:showcolor,restorecolor:letter_bg,duration:NB.SETTINGS.fadeout.anagramometer});
			NB.W.indicating = new Effect.Highlight(letter_panel, {
                          startcolor:letter_bg,
                          endcolor:showcolor,
                          restorecolor:showcolor,
                          duration:NB.SETTINGS.anagramometer.fadein,
                            afterFinish:function(){
                                new Effect.Highlight(letter_panel, {
                                startcolor:showcolor,
                                endcolor:letter_bg,
                                restorecolor:letter_bg,
                                duration:NB.SETTINGS.anagramometer.fadeout
                              });
                            }
                        });
			this.update_total();

			//more updates
      $('alert').update(NB.W.Paragraphs.check_text(element));
      
			if ([32,186,188,190,221].include(k)) {
        NB.W.Paragraphs.colorize(element);
      }
		},
		
    update: function () {
		  var Anagram = this;
		   $A(this.table).each(function(item,i){
			    item.down(1).update(Anagram.anagram[i]);
			 });
      //the fact that we zeroise here is significant to 'gameplay'
      //this.snap = this.calc_total();
			this.update_total();
		},
		
		recalculate_paragraph: function(element) {
//console.log('Recalculate paragraph');
		  var Anagram = this;
      var currentArray = element.innerHTML.stripTags().toLowerCase().toArray();
			this.alphabetArray.each(function(item,i){
    	var origCount = Anagram.origArray[element.readAttribute('sequence')].findAll(function(c) {
    					return c == item;
    			});
    			var currentCount = currentArray.findAll(function(c) {
    					return c == item;
    			});
    			Anagram.anagram[i] = (Anagram.anagram[i] - origCount.size()) + currentCount.size();
			});
			this.update();
 			this.origArray[element.readAttribute('sequence')] = currentArray;
      $('alert').update(NB.W.Paragraphs.check_text(element));
		},

		calc_total: function(){
		  return this.anagram.inject(0, function(acc, n) { 
        return acc + Math.abs(n); 
      }); 
		},

		update_total: function() {
		  this.total = this.calc_total();
		  var total = this.total;
		  var score = Math.abs(this.total-this.snap);
		  NB.W.anagram.score = score;
			$('total').update(NB.page.add_commas(this.total.toString()));
			$('change').update((this.total==this.snap?'':(this.total>this.snap?'&#x25bc;':'&#x25b2;')+score));
//      $('total_change').morph('color:'+(this.total==this.snap?NB.SETTINGS.color.amber:(this.total<this.snap?NB.SETTINGS.color.ok:NB.SETTINGS.color.error)),{duration:0.5});
      $('total').morph('color:'+(this.total==this.snap?NB.SETTINGS.color.amber:(this.total<this.snap?NB.SETTINGS.color.ok:NB.SETTINGS.color.error)),{duration:0.5});
		}    

});
