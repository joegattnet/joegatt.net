NB.User = Class.create({
		initialize: function() {
      return false;
		},
		signup: function(message) {
			 		new NB.Ajax_html('post','signupin_container',true,NB.root+'_cgi/_common/_user_signupin.cgi','mode=signup&sent_alert='+message+'&is_alert='+($('signupin').hasClassName('alert')?'alert':''),null,null);
		},
		signin: function(message) {
			 		new NB.Ajax_html('post','signupin_container',true,NB.root+'_cgi/_common/_user_signupin.cgi','mode=signin&sent_alert='+message+'&is_alert='+($('signupin').hasClassName('alert')?'alert':''),null,null);
		},
		signedin: function(this_user_id,username,level,reload) {
					this.id = this_user_id;
					this.level = level;
					$$('.user-id').each(function(item){
            item.setValue(this_user_id);
          });
					$$('.user-'+username).each(function(item){
					  //This could be done using reject and .class-user
            //item.setAttribute('rel',item.innerHTML);
            item.update('me');
          });
					this.name = username;
					new Effect.Highlight('signupin_panel',{duration:3});
					NB.page.hideScreenCover();
					var hide = setTimeout("$('signupin_panel').addClassName('closed')",3000);
//STORE THIS IN A COOKIE THAT LASTS AS LONG AS THE SESSION
					if (NB.pending_signedin_action!=false){
						 eval(NB.pending_signedin_action);
						 NB.pending_signedin_action=false;
					}
					//GENERICIZE
					//only reload if not scholia
  				 NB.Scholia.get(NB.p.current);
					// reload paragraphs???
		},
		signout: function() {
					$('signupin').addClassName('closed');
					NB.Cookie.remove('rememberme');
					NB.Cookie.remove('user_id');
					NB.Cookie.remove('rmcode');
			 		new NB.Ajax_html('get','signupin_container',false,NB.root+'_cgi/_common/_user_signupin.cgi','mode=signin&is_alert='+($('signupin').hasClassName('alert')?'alert':''),null,null);
					this.id = 0;
					this.name = '';
					this.level = 0;
					$$('.user-name').each(function(item){
            item.update(item.getAttribute('rel'));
          });
					//GENERICIZE
 				  NB.Scholia.get(NB.p.current);
 				  _gaq.push(['_trackEvent','Signupin', 'Signed out']);
		},
		password: function(user_id,username) {
			 		new NB.Ajax_html('post','signupin_container',true,NB.root+'_cgi/_common/_user_signupin.cgi','mode=password'+'&is_alert='+($('signupin').hasClassName('alert')?'alert':''),null,null);
		},
		changepassword: function(user_id,username) {
			 		new NB.Ajax_html('post','signupin_container',true,NB.root+'_cgi/_common/_user_signupin.cgi','sent_user_id='+NB.user.id+'&mode=changepassword'+'&is_alert='+($('signupin').hasClassName('alert')?'alert':''),null,null);
		},
		clear: function(message) {
			 		new NB.Ajax_html('post','signupin_container',true,NB.root+'_cgi/_common/_user_signupin.cgi','mode=signedin&found_username='+NB.user.name+'&is_alert='+($('signupin').hasClassName('alert')?'alert':''),null,null);
		},
		check_input_valid: function(q,reqlength) {
//		NB.page.console('checking');
		      var check = q.name;
					var value = q.value;
          var length = value.length;
          var type = q.type;
          var warning = $(check+'_warning');
          var reqlength = q.readAttribute('min') || NB.SETTINGS.form.minlength;
          if(length==0){
            warning.update('Required!');
          } else if((check.include('password')&&value=='password')||(check.include('username')&&(value.include('username')||value.include('joegatt')||value.include('admin')))){
            warning.update('Not allowed!');
          } else if((check.include('username')&&(value.include('cunt')||value.include('fuck')))){
            warning.update('Oi!');
          } else if(length<reqlength){
            warning.update('Too short!');
          } else if (check.include('email')&&(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))) {
            warning.update('Not valid!');
          } else if (check.include('username')&&(!/^[A-Z0-9]+$/i.test(value))) {
            warning.update('Not valid!');
          } else if (check.include('email')||check.include('username')) {
  					new Ajax.Request(NB.root+'_cgi/_common/_user_check_exists.cgi?'+check+'='+value,{
  						method:'get',
  					  onSuccess:function(t){
                var json = eval(t.getResponseHeader('X-JSON'));
  							if (json.exists) {
//  								 $(check+'_warning').update((check.include('username')?'Exists!':'Already signed up!'));
  								 $(check+'_warning').update('Exists!');
  							} else {
  								 warning.update('');
  							}
  					  }
  					});
          } else {
						 warning.update('');
          }
        },
		resend: function(user_id) {
			new NB.Ajax_html('post','signupin_container',true,NB.root+'_cgi/_common/_user_signupin.cgi','mode=resend&sent_user_id='+user_id,null,null);
		},
		id: 0,
		name: '',
		level: 0
});

