// brush: "apache" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is licensed under the GNU AGPLv3.
//	Copyright 2010 Samuel Williams. All rights reserved.
//	See <jquery.syntax.js> for licensing details.

Syntax.register('apache', function(brush) {
	brush.push({
		pattern: /(<(\w+).*?>)/gi,
		matches: Syntax.extractMatches(
		{
			klass: 'tag',
			allow: ['attribute', 'tag-name', 'string']
		},
		{
			klass: 'tag-name',
			process: Syntax.lib.webLinkProcess("site:http://httpd.apache.org/docs/trunk/ directive", true)
		})
	});

	brush.push({
		pattern: /(<\/(\w+).*?>)/gi,
		matches: Syntax.extractMatches({klass: 'tag', allow: ['tag-name']}, {klass: 'tag-name'})
	});

	brush.push({
		pattern: /^\s+([A-Z][\w]+)/gm,
		matches: Syntax.extractMatches({
			klass: 'function',
			allow: ['attribute'],
			process: Syntax.lib.webLinkProcess("site:http://httpd.apache.org/docs/trunk/ directive", true)
		})
	});

	brush.push(Syntax.lib.perlStyleComment);
	brush.push(Syntax.lib.singleQuotedString);
	brush.push(Syntax.lib.doubleQuotedString);
	
	brush.push(Syntax.lib.webLink);
});

