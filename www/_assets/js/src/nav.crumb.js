NB.Nav.crumb = {
	load: function(url) {
		var p = NB.Url.p(url),
			path = NB.Url.path(url);
		NB.crumb.lastloaded = NB.Url.path(url);
		$('input[name=url]').val(url);
		if (History.enabled) {
			if (path !== location.pathname) {
				History.pushState(null, null, path);
			}
		} else {
			if (path === location.pathname) {
				location.hash = '';
			} else {
				location.hash = path;
			}
		}
		var section_crumb = $('#crumbs_section');
		if (NB.p.chunk === 'index') {
			section_crumb.hide();
		} else {
			section_crumb.show();
		}
		NB.Nav.crumb.last(p, path);
		$("link[rel='canonical']").attr('href', NB.crumb.canonical);
		document.title = NB.meta.title_window + ((NB.p.chunk === 'page' || NB.p.chunk === 'paragraph') ? ' - ' + NB.p.chunk + ' ' + p : '');
	},
	last: function(p, path) {
		var last_crumb = $('#crumbs_chunk');
		if (NB.p.chunk === 'page' || NB.p.chunk === 'paragraph') {
			last_crumb.parent().show();
			last_crumb.text(NB.p.chunk + ' ' + p);
			last_crumb.attr('href', path);
		} else {
			last_crumb.parent().hide();
		}
	},
	version: function() {
		var version = $('.version-source').text();
		if (version !== '') {
			$('.version').text('v' + version);
			$('input[name=version]').val(version);
		}
	},
	version_chunk: function() {
		var version = $('.version-chunk-source').text();
		if (version !== '') {
			$('.version-chunk').text('v' + version);
			$('input[name=version]').val(version);
			$('.version-chunk').parent().show();
		} else {
			$('.version-chunk').parent().hide();
		}
	}
};

/******************************************************************************/
$('body').bind('content.loaded', NB.Nav.crumb.version);
