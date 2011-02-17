NB.Page = Class.create({
		initialize: function() {
		  this.check_height();
   		NB.refresh = new NB.Refresh();
      NB.user = new NB.User();
      this.add_events();
      if(NB.Cookie.read('session_exit')){
				    var href = NB.Cookie.read('session_exit');
	          var href_domain = href.gsub(/http\:\/\/|www\.|\/.*/,'');
				    NB.Cookie.remove('session_exit');
            _gaq.push(['_trackEvent','Exit - returned', encodeURIComponent(href_domain), encodeURIComponent(href)]);
      }
      if(NB.Cookie.read('promo')){
				    var promo = NB.Cookie.read('promo');
				    NB.Cookie.remove('promo');
            _gaq.push(['_trackEvent','Promo - referrer', promo]);
      }
      Event.observe(document.body, 'resize', function(){
        NB.page.check_height();
        NB.page.track_event('Window','resize',document.viewport.getWidth()+'x'+document.viewport.getHeight(),null);
      });
			Event.observe(document.body, 'scroll', function(){
			  var scroll = document.viewport.getScrollOffsets()[1];
			  if (!NB.scroll){
				  NB.scroll = true;
          NB.page.track_event('Window','scroll','vertical',scroll);
				}
      });
      Event.observe(document.body, 'keyup', function(event){     
          if(NB.debug && event.keyCode==121) {
              var body = document.body;
              body.toggleClassName('debug');
  					  NB.Cookie.write('debug',body.hasClassName('debug'),'/');
          }
          if(event.keyCode==Event.KEY_ESC) {
              NB.page.dismissScreenCover();
              $('signupin_panel').addClassName('closed');
              NB.W.Paragraphs.focus_current();
            }
            return false;
      });
      Event.observe(document.body, 'click', function(event){
      		  //if($('signupin').hasClassName('alert')){
            //  NB.page.dismissScreenCover();
            //} else 
            if(!Event.element(event).descendantOf('signupin_container') && !$('signupin').hasClassName('alert') && !$('signupin_panel').hasClassName('closed')) {
              $('signupin_panel').addClassName('closed');
              NB.W.Paragraphs.focus_current();
            }
            return true;
       });
       //HACK - NEEDS TO BE UPDATED in v-pages
       //var browserButtons = setInterval("NB.page.browser_buttons()",500);
    },
		browser_buttons: function(){
        //HACK - NEEDS TO BE UPDATED in v-pages
        if(location.hash.include('wutz')){
          var goto = location.hash.substr(location.hash.lastIndexOf('/')+1);
        } else if(location.hash==''||location.hash=='#') {
          var goto = location.href.substr(location.href.replace('#','').lastIndexOf('/')+1);
        }
        if(goto!=NB.p.current){
          NB.App.content(goto);
        }
    },
    add_events: function() {
  			$$('.navmods .toggle .header a').reject(function(item){
            return item.hasClassName('e2');
          }).each(function(item){
          item.addClassName('e2');
				  item.observe('click',function(){
  					 var ancestor = item.up('.toggle');
  					 ancestor.toggleClassName('closed');
  					 NB.Cookie.write(ancestor.id,ancestor.hasClassName('closed'),NB.crumb.path);
  				   NB.page.track_event('Panel',(ancestor.hasClassName('closed')?'close':'open'),ancestor.id,0);
           });
  			});
  			$$('.tool a').reject(function(item){
            return item.hasClassName('e3') || item.hasClassName('header');
          }).each(function(item){
          item.addClassName('e3');
				  item.observe('click',function(){
             $('tool_'+item.rel).toggleClassName('on');
             eval('NB.Tools.'+item.rel+'()');
  					 NB.Cookie.write('tool_'+item.rel,item.hasClassName('on'),NB.crumb.path);
  					 NB.page.track_event('Tools',(item.hasClassName('on')?'on':'off'),item.rel);
           });
  			});
        $$('.help_button_extra').reject(function(item){
            return item.hasClassName('e4');
          }).each(function(item){
          item.addClassName('e4');
				  item.observe('click',function(){
             $('tool_help').toggleClassName('on');
             NB.Tools.help();
  					 NB.Cookie.write(item.id,item.hasClassName('on'),NB.crumb.path);
  					 NB.page.track_event('Tools',(item.hasClassName('on')?'on':'off'),item.rel);
          });
  			});
        $$('.draggable').reject(function(item){
            return item.hasClassName('e5');
          }).each(function(item){
          item.addClassName('e5');
          item.morph(NB.Cookie.read(item.id+'_dragpos_top')+';'+NB.Cookie.read(item.id+'_dragpos_left'));
  	    	new Draggable(item, {
                onEnd: function(){
                NB.Cookie.write(item.id+'_dragpos_top','top:'+item.getStyle('top'),NB.crumb.path);
                NB.Cookie.write(item.id+'_dragpos_left','left:'+item.getStyle('left'),NB.crumb.path);
     				    NB.page.track_event('Toolbar','drag-x',item.id,item.getStyle('top'));
     				    NB.page.track_event('Toolbar','drag-y',item.id,item.getStyle('left'));
              }
            }
          );
				  item.observe('dblclick',function(){
  	    	  item.morph('top:0;left:0');
            NB.Cookie.remove(item.id+'_dragpos_top',NB.crumb.path);
            NB.Cookie.remove(item.id+'_dragpos_left',NB.crumb.path);
 				    NB.page.track_event('Toolbar','undrag',item.id,0);
          });
  			});
        $$('.pin a').reject(function(item){
            return item.hasClassName('e6');
          }).each(function(item){
          item.addClassName('e6');
				  item.observe('click',function(){
  	    	  item.up('.pinnable').toggleClassName('pinned');
  	    	  var status = item.up('.pinnable').hasClassName('pinned');
  	    	  NB.Cookie.write('pinned',status,'/');
 				    NB.page.track_event('Toolbar',(status?'pin':'unpin'),item.up('.pinnable'),0);
          });
  			});
        $$('form.validate input[type="text"]').reject(function(item){
            return item.hasClassName('e7');
          }).each(function(item){
          item.addClassName('e7');
				  item.observe('keyup',function(){
  	    	  NB.user.check_input_valid(item,6);
          });
				  item.observe('blur',function(){
  	    	  NB.user.check_input_valid(item,6);
          });
  			});
        $$('form.validate input[type="password"]').reject(function(item){
            return item.hasClassName('e7b');
          }).each(function(item){
          item.addClassName('e7b');
				  item.observe('keyup',function(){
  	    	  NB.user.check_input_valid(item,8);
          });
				  item.observe('blur',function(){
  	    	  NB.user.check_input_valid(item,8);
          });
  			});
        $$('.navigator a.previous').reject(function(item){
            return item.hasClassName('e8');
          }).each(function(item){
          item.addClassName('e8');
				  item.observe('click',function(e){
  	    	  NB.page.previous(e);
          });
  			});
        $$('.navigator a.first').reject(function(item){
            return item.hasClassName('e9');
          }).each(function(item){
          item.addClassName('e9');
				  item.observe('click',function(e){
  	    	  NB.page.first(e);
          });
  			});
        $$('.navigator a.next').reject(function(item){
            return item.hasClassName('e10');
          }).each(function(item){
          item.addClassName('e10');
				  item.observe('click',function(e){
  	    	  NB.page.next(e);
          });
  			});
        $$('.navigator a.goto').reject(function(item){
            return item.hasClassName('e11');
          }).each(function(item){
          item.addClassName('e11');
				  item.observe('click',function(e){
  	    	  NB.page.goto(item.rel,e);
          });
  			});
        $$('.navigator a.last').reject(function(item){
            return item.hasClassName('e12');
          }).each(function(item){
          item.addClassName('e12');
				  item.observe('click',function(e){
  	    	  NB.page.last(e);
          });
  			});
        $$('a').reject(function(item){
            return (item.hasClassName('e12b') || !item.href.startsWith('http') || item.href.startsWith('http://'+location.host));
          }).each(function(item){
          item.addClassName('e12b');
				  item.observe('mousedown',function(e){
				    var href = item.href;
	          var href_domain = href.gsub(/http\:\/\/|www\.|\/.*/,'');
				    NB.Cookie.write_session('session_exit',href);
  	    	  _gaq.push(['_trackEvent','Exit', encodeURIComponent(href_domain), encodeURIComponent(href)]);
            return true;
          });
  			});
        $$('a').reject(function(item){
            return item.hasClassName('e12c') || item.href.match(/\.pdf|\.doc|\.zip/);
          }).each(function(item){
          item.addClassName('e12c');
				  item.observe('mousedown',function(e){
				    if(!e.isLeftClick()){
  	    	    _gaq.push(['_trackEvent','Right-click', encodeURIComponent(item.href), item.className]);
            }
            return true;
          });
  			});
        $$('a').reject(function(item){
            return item.hasClassName('e12d') || !item.href.match(/\.pdf|\.doc/);
          }).each(function(item){
          item.addClassName('e12d');
				  item.observe('mousedown',function(e){
  	    	  if(e.isLeftClick()){
    	    	  _gaq.push(['_trackEvent','File', 'View', item.href]);
    	    	  return true;
            } else {
    	    	  _gaq.push(['_trackEvent','File', 'Download', item.href]);
    	    	  return true;
            }
          });
          if(Prototype.Browser.IE){
            var instructions = '"Save Target As..."';
          } else if(Prototype.Browser.Opera) {
            var instructions = '"Save Linked Content As..."';
          } else {
            var instructions = '"Save Link As..."';
          }

          item.title = item.title + (item.title==''?'T':' - t') + 'o download, right-click and choose '+instructions;
  			});
        $$('.bm').reject(function(item){
            return item.hasClassName('e13');
            }).each(function(item){
            item.addClassName('e13');
  				  item.observe('click',function(){
  				  var share_number = parseInt($('share_count').down('span').innerHTML.replace(/\D/g,''));
            var share_content = $('share_count').innerHTML.replace(share_number,share_number+1).replace(share_number,share_number+1);
  				  $('share_count').update(share_content);
  	    	  new NB.Ajax_html('get','hidden',true,'../_cgi/_common/_popularity.cgi','type=1&section='+NB.crumb.section+'&page_id='+item.readAttribute('rel')+'&external='+item.readAttribute('title')+'&url='+item.up('#n_share').readAttribute('rel'));
  	    	  return true;
          });
  			});
        $$('.focus_handle').reject(function(item){
            return item.hasClassName('e14');
          }).each(function(item){
            item.addClassName('e14');
            var focusable = item.up('.focusable');
  	    	  if(item.hasClassName('prompt_add_comment') && item.getValue() ==''){
              var helptext = (item.id=='new_scholia'?NB.SETTINGS.prompt.add_scholia:NB.SETTINGS.prompt.add_comment);
  	    	    item.update(helptext);
            }
  			    item.observe('focus',function(){
    	    	  focusable.addClassName('focused');
              var helptext = (item.id=='new_scholia'?NB.SETTINGS.prompt.add_scholia:NB.SETTINGS.prompt.add_comment);
    	    	  if(item.hasClassName('prompt_add_comment') && item.getValue()==helptext){
    	    	    item.update('');
              } else if(item.hasClassName('prompt_add_comment') && item.getValue()=='') {
    	    	    item.update(helptext);
              }
  	    	  });
  			    item.observe('blur',function(){
    	    	  if(item.hasClassName('prompt_add_comment') && item.getValue() ==''){
                var helptext = (item.id=='new_scholia'?NB.SETTINGS.prompt.add_scholia:NB.SETTINGS.prompt.add_comment);
    	    	    item.update(helptext);
    	    	    focusable.removeClassName('focused');
              }
          });
  			});
        $$('.navigator input.goto').reject(function(item){
            return item.hasClassName('e15');
          }).each(function(item){
            item.addClassName('e15');
            item.observe('change',function(){
              var goto_p = item.getValue();
              if (isNaN(goto_p)||goto_p<1||goto_p>NB.p.count) {
                //item.setValue(NB.p.current);
              } else {
  	    	      NB.page.goto(parseInt(goto_p)*1);
  	    	      return false;
  	    	    }
  	    	  });
          });
  	},
  	
  	ajax_active:function(which){
				$(which).addClassName('ajax_loading');
    },
    
    ajax_done:function(which){
				$(which).removeClassName('ajax_loading');
    },
    
  	ajax_error:function(which){
				$(which).addClassName('ajax_error');
			  var off = setTimeout("$('"+which.id+"').removeClassName('ajax_error');",5000);
    },
		toggle: function(q) {
				 var panel = q.id.toString().replace('_handle','');
				 $(panel).toggleClassName('closed');
				 NB.Cookie.write(panel,$(panel).hasClassName('closed'),NB.crumb.path);
				 if (q.id == 'signupin_panel' && $('signupinform') && !$(panel).hasClassName('closed')){
            $('signupinform').focusFirstElement();
         }
		},
		
    crumb: function(p) {
//         var path = (NB.crumb.section=='home'?'':'/'+NB.crumb.section) + (p>1?'/'+p:'');
         var path = (NB.crumb.section=='home'?'':'/'+NB.crumb.section) + (p>1?'/'+p:'/');
				 $('last_crumb').removeClassName('hidden');
				 $('last_crumb').innerHTML = 'paragraph ' + p;
				 $('last_crumb').href = path;
         document.title = 'Jean Paul: Schulmeisterlein Wutz - paragraph ' + p;
				 NB.path = (NB.crumb.section=='home'?'/':path);
				 NB.canonical = 'http://joegatt.net'+ (NB.crumb.section=='home'?'/':path);

         if (location.pathname==path&&location.hash!='') {
           location.hash = '';
         } else if (!(location.hash==''&&location.pathname==path)) {
           location.hash = path;
         }

// causes undefined - also, not the right place for it         
//         if(typeof(pageTracker)!=undefined){
//          pageTracker._trackPageview(NB.canonical);
//         }
         
//         NB.refresh.bookmarks(NB.canonical);

//				 $('rss3').title = 'Wutz: Paragraph ' + q;
//				 $('rss3').href = 'http://rss.joegatt.net/wutz_paragraph' + q + '.rss';
		},
		
		showScreenCover:function(){
		    //window.scroll(0,0);
        Effect.Appear('screen_cover',{duration:0.2,from:0,to:0.9});
    },
    
		hideScreenCover:function(){
        Effect.Fade('screen_cover',{duration:0.2});
    },
    
		dismissScreenCover:function(){
        $('signupin').removeClassName('alert');
        NB.page.hideScreenCover();
        window.scroll(0,0);
    },
    
		submit: function(element,destination,indicateDiv) {
 				 var form = element.up('form');
				 if(form.getInputs('text').any(function(item){return item.getValue()==''}) || form.getInputs('password').any(function(item){return item.getValue()==''})){
            alert(NB.SETTINGS.prompt.user_error_fill);
 				    NB.page.track_event('User Error','Fill required');
            return false;
         } else if(form.select('.warning').any(function(item){return item.innerHTML!=''})){
            alert(NB.SETTINGS.prompt.user_error_fix);
 				    NB.page.track_event('User Error','Fix errors');
            return false;
			 	 } else {
  			 	 new NB.Ajax_html((form.down('textarea')?'post':'get'),destination,true,form.action,form.serialize(),null,indicateDiv);
         }
		},
		
    add_comment:function(){
        var form = $('comments').down('form');
        var comment = form.down('textarea').getValue();
        form.p.setValue(NB.p.top);
				 if(comment==''||comment==NB.SETTINGS.prompt.add_comment){
            alert(NB.SETTINGS.prompt.user_error_add_comment);
 				    NB.page.track_event('User Error','Add comment');
         } else {
      		 var pending = "var form = $('comments').down('form');new NB.Ajax_html('post',$('comments_list'),true,form.action,form.serialize(),'top','comments');var show = new Effect.SlideUp('comments_form');";
      		 if (NB.user.id==0&&NB.Cookie.read('status')=='confirmed'){
      		 	 NB.pending_signedin_action = pending;
      		   NB.user.signin(NB.SETTINGS.prompt.sign_in_comment);
      		 } else if (NB.user.id==0){
      		 	 NB.pending_signedin_action = pending;
      		   NB.user.signup(NB.SETTINGS.prompt.sign_in_comment);
      		 } else {
       		 	 eval(pending);
      		 }
         }
    },
    
		stripe: function(element) {
     	return element.partition(function(item,iterator) {
        return 0 == iterator % 2;
      })[0].invoke('addClassName','even');
    },
    
		add_commas: function(nStr){
    	nStr += '';
    	x = nStr.split('.');
    	x1 = x[0];
    	x2 = x.length > 1 ? '.' + x[1] : '';
    	var rgx = /(\d+)(\d{3})/;
    	while (rgx.test(x1)) {
    		x1 = x1.replace(rgx, '$1' + ',' + '$2');
    	}
    	return x1 + x2;
    },

    remove_commas: function(nStr){
      return parseInt(nStr.replace(/\,/,''));
    },
    
    increment_commas: function(element){
       element.update(NB.page.add_commas(NB.page.remove_commas(element.innerHTML)+1));
       return element;
    },
        
    console: function(message) {
//      if(Prototype.Browser.Gecko && location.host.include('joegatt-net')) {
//        console.log(message);
//      }
return true;
    },
    
    track_event: function(category, action, optional_label, optional_value){
//      if (location.host.include('joegatt-net')){
//        NB.page.console('Tracking event: '+category+' | '+action+' | '+optional_label+' | '+optional_value);
//      }
      _gaq.push(['_trackEvent',category, action, optional_label, optional_value]);
    },
    
    range: function(number,minimum,maximum) {
      if (number<minimum){
        return minimum;
      } else if (number>maximum) {
        return maximum;
      } else {
        return number;
      }
    },
    
    check_height:function(){
      if (document.viewport.getHeight()<700){
        $('container').addClassName('short-screen');
        NB.Cookie.write('short-screen','true');
        _gaq.push(['_trackEvent','Window','short']);
      } else {
        $('container').removeClassName('short-screen');
        NB.Cookie.write('short-screen','false');
      }
    },
    
    encodeURIComponent:function(text){
      return encodeURIComponent(text.replace(/\'/g,"’"));
    },
    
    update_version_number: function(version){
			$$('.version').each(function(item){
        item.update('&nbsp;0.'+version);
      });
    },
    
    url_rand: function(amp){
      return (amp?'?':'&') + 'r=' + Math.random();
    },

    first: function() {},
    previous_page: function() {},
    previous: function() {},
    next: function(e) {},
    next_page: function() {},
    last: function() {},
    goto: function() {}
    
});
