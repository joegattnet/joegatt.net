NB.User.facebook = {
	clicked: function() {
		if ($('.fb-button').hasClass('fb-login')) {
			NB.User.facebook.login();
		} else {
			NB.User.facebook.logout();
		}
	},
	check: function() {
		FB.getLoginStatus(function(response) {
			if (response.session) {
				NB.User.facebook.loggedin(response.session);
			} else {
				//        $('.fb-button').switchClass('fb-logout', 'fb-login');
				$('.fb-button').removeClass('fb-logout');
				$('.fb-button').addClass('fb-login');
				$('.fb-button span').text('Log in');
			}
		});
	},
	login: function() {
		FB.login(function(response) {
			if (response.session) {
				NB.User.facebook.loggedin(response.session);
			}
		});
	},
	loggedin: function(auth) {
		var sig = auth.sig;
		var authstring = $.assArray.join($.assArray.sort($.assArray.without(auth, 'sig')));
		$('#signupin_header_a, .fb-button span').text('Facebook...');
		FB.api("/me", function(response, auth) {
			NB.Cookie.write('fbuser', true);
			NB.Ajax.html('post', NB.User._container, NB.User._script_fb, 'fbuid=' + response.id + '&fb_first_name=' + response.first_name + '&fb_last_name=' + response.last_name + '&fb_link=' + encodeURIComponent(response.link) + '&sent_signup_url=' + encodeURIComponent(NB.crumb.canonical) + '&sig=' + sig + '&authstring=' + encodeURIComponent(authstring), false);
		});
	},
	logout: function() {
		FB.logout(function(response) {
			NB.User.signout(true);
		});
	}
};

/******************************************************************************/
if (NB.external.facebook) {
	NB.loaded_scripts.add(true, NB.User.facebook.check);
	$('.fb-button').live('click', NB.User.facebook.clicked);
}
