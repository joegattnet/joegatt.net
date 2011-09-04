// brush: "xssi" aliases: ["shtml"]

// Added to jQuery.Syntax by joegatt.net

//	This file is part of the "jQuery.Syntax" project, and is licensed under the GNU AGPLv3.
//	Copyright 2010 Samuel Williams. All rights reserved.
//	See <jquery.syntax.js> for licensing details.

Syntax.brushes.dependency('xssi','html');

Syntax.register('xssi', function(brush) {
//	var keywords = ["include", "virtual", "exec", "set", "var", "value", "echo", "if", "elif", "endif", "printenv"];

	var keywords = ["#include", "#set", "#echo", "#if", "#elif", "#endif", "#printenv"];
	var attributes = ["virtual", "exec", "var", "value", "printenv"];
	
	var operators = ["+", "*", "/", "-", "&", "|", "~", "!", "%", "<", "=", ">"];
	
	brush.push(attributes, {klass: 'attribute'});
	brush.push(keywords, {klass: 'keyword'});
	brush.push(operators, {klass: 'operator'});
	
	// Regular expressions
	brush.push(Syntax.lib.perlStyleRegularExpressions);
	
	// Comments
	brush.push(Syntax.lib.cStyleComment);
	brush.push(Syntax.lib.cppStyleComment);
	brush.push(Syntax.lib.webLink);
	
	// Strings
	brush.push(Syntax.lib.singleQuotedString);
	brush.push(Syntax.lib.doubleQuotedString);
	brush.push(Syntax.lib.stringEscape);
	
	// Numbers
	brush.push(Syntax.lib.decimalNumber);
	brush.push(Syntax.lib.hexNumber);
	
});

