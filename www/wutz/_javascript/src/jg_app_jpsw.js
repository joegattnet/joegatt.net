NB.W.jpsw = Class.create({
		initialize: function(){
		  NB.W.lengthTolerance = 7;
		  NB.W.lengthThreshold = 50;
		  NB.W.changesTolerancePercentage = 10;
		  NB.W.changesToleranceMin = 5;
		  NB.W.changesToleranceMax = 100;
      NB.W.anagram = new NB.W.Anagram();
    	NB.W.versions = new NB.W.Versions();
      NB.W.editor = new nicEditor();
      NB.W.selectFlag = false;
      NB.page.stripe(NB.W.anagram.table);
      NB.page.first = NB.W.Paragraphs.first;
      NB.page.previous = NB.W.Paragraphs.previous;
      NB.page.next = NB.W.Paragraphs.next;
      NB.page.goto = NB.W.Paragraphs.goto;
      NB.page.last = NB.W.Paragraphs.last;
		},
		content: function(sequence) {
			if (sequence != NB.p.current) {
        $('last_crumb').update('[loading...]');
        NB.p.current = sequence;
		 	  new NB.Ajax_html('get','content',true,'/_cgi/wutz/_get_page_jpsw.cgi','b='+NB.book_id+'&sequence='+sequence,null,null);
//WHEN WE CACHE
//		 	  new NB.Ajax_html('get','content',true,'/_cache/wutz/_get_page_jpsw-'+'b='+NB.book_id+'&sequence='+sequence+'.html','',null,null);
//		 	} else {
//			 		return;
//			 } else if ($('paragraph_'+sequence) != null) {
//			 	 NB.W.Paragraphs.focus(sequence);
//				 return;
      }
    }
});
