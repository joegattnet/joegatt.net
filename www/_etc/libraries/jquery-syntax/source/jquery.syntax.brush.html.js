// brush: "html" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is licensed under the GNU AGPLv3.
//	Copyright 2010 Samuel Williams. All rights reserved.
//	See <jquery.syntax.js> for licensing details.

Syntax.brushes.dependency('html', 'xml');
Syntax.brushes.dependency('html', 'javascript');
Syntax.brushes.dependency('html', 'css');
Syntax.brushes.dependency('html', 'php-script');
Syntax.brushes.dependency('html', 'ruby');

Syntax.register('html', function(brush) {
	brush.push({
		pattern: /<script.*?type\=.?text\/javascript.*?>((.|\n)*?)<\/script>/gmi,
		matches: Syntax.extractMatches({brush: 'javascript'})
	});
	
	brush.push({
		pattern: /<style.*?type=.?text\/css.*?>((.|\n)*?)<\/style>/gmi,
		matches: Syntax.extractMatches({brush: 'css'})
	});
	
	brush.push({
		pattern: /((<\?php)([\s\S]*?)(\?>))/gm,
		matches: Syntax.extractMatches(
			{klass: 'php-tag', allow: ['operator', 'php-script']},
			{klass: 'operator'},
			{brush: 'php-script'},
			{klass: 'operator'}
		)
	});
	
	brush.push({
		pattern: /((<\?rb)([\s\S]*?)(\?>))/gm,
		matches: Syntax.extractMatches(
			{klass: 'ruby-tag', allow: ['operator', 'ruby']},
			{klass: 'operator'},
			{brush: 'ruby'},
			{klass: 'operator'}
		)
	});
	
	brush.push({
		pattern: /<%=?(.*?)(%>)/g,
		klass: 'instruction',
		allow: ['string']
	});
	
	brush.push({
		pattern: /<\!(DOCTYPE(.*?))>/g,
		matches: Syntax.extractMatches({klass: 'doctype'})
	});
	
	// Is this rule still relevant?
	brush.push({
		pattern: /(%[0-9a-f]{2})/gi,
		klass: 'percent-escape',
		only: ['html']
	});
	
	// The position of this statement is important - it determines at what point the rules of the parent are processed.
	// In this case, the rules for xml are processed after the rules for html.
	brush.derives('xml');
});
