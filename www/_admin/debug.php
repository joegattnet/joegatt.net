<?php //۞//text{encoding:utf-8;bom:no;linebreaks:unix;tabs:4;}
$du_version = '0.4.5r'; // TUE Aug 23, 2005
/*

	corz.org debug unit	   (aka "du")	
	instant report version

	This version stores nothing, doesn't care about outside variables, simply
	displays the report in the browser. you can get debug.php to do this by 
	passing ?output=true but this version is useful in situations where passing
	extra variables is not possible or not desirable. it's handy anyhow.
	
	for more details see debug.php
	
	;o)
	(or

	(c) corz.org 2003 -> 

*/

// handy here for when duplicating into subfolders for test - 
// change indicates which subfolder - handy for mod_rewrite tests..
//
$title = 'debug report..@ ';

// check session capabilities..
// multiple refreshes of page will increase the counter..
//ini_set ('session.name', 'debug');
@session_start();
$time = array_sum(explode(' ', microtime(true)));

// check the title bar when ?output=true
if (!isset($_SESSION['debug'])) {
	$_SESSION['debug'] = '0';
} else {
	$_SESSION['debug']++;
}

// basic cookie test (should run 1 behind the view counter)
if (isset($_COOKIE['debug_cookie'])) {
	$foo = (integer) $_COOKIE['debug_cookie']; $foo++;
	setcookie ('debug_cookie', $foo, time() + (60*60*24));// i day
} else {
	setcookie ('debug_cookie', '0', time() + (60*60*24));
}

// some example debugging lines.

// keeping the debug lines hard left makes them easy to find..//:debug:
debug("\n".$title.$time."\n\n");//:debug:

// some path info..
debug('HTTP_HOST:'.$_SERVER['HTTP_HOST']."\n");//:debug:
debug('SCRIPT_NAME:'.$_SERVER['SCRIPT_NAME']."\n");//:debug:
debug('SCRIPT_NAME: (realpath)'.realpath($_SERVER['SCRIPT_NAME'])."\n\n");//:debug:
debug('SCRIPT_FILENAME:'.$_SERVER['SCRIPT_FILENAME']."\n");//:debug:
debug('SCRIPT_FILENAME (realpath)'.realpath($_SERVER['SCRIPT_FILENAME'])."\n\n");//:debug:
debug('PHP_SELF:'.$_SERVER['PHP_SELF']."\n");//:debug:
debug('PHP_SELF (realpath)'.realpath($_SERVER['PHP_SELF'])."\n\n");//:debug:
debug('__FILE__:'.__FILE__."\n");//:debug:
debug('__FILE__ (realpath)'.realpath(__FILE__)."\n\n");//:debug:
debug('$main page path (fixed): '.substr($_SERVER['SCRIPT_FILENAME'], 0, (strrpos($_SERVER['SCRIPT_FILENAME'],'/') + 1))."\n\n");//:debug:
debug('path from site root: '.substr($_SERVER['SCRIPT_NAME'],0,(strrpos($_SERVER['SCRIPT_NAME'],'/')+1))."\n\n");//:debug:
debug('this file path (fixed): '.str_replace( "\\\\", "/", dirname( __FILE__ ) . "/" )."\n\n");//:debug:

//	$HTTP_SERVER_VARS..
debug("\n\n".'$_SERVER variables..'."\n\n");//:debug:
while (list($key, $val) = each($_SERVER)) {//:debug:
debug($key.chr(9).$val."\n"); }//:debug:

if (is_array($HTTP_ENV_VARS)) {
	debug("\nenvironment variables..\n\n");//:debug:
	while (list($key, $val) = each($HTTP_ENV_VARS)) {//:debug:
	debug($key.chr(9).$val."\n"); }//:debug:
}
if (is_array($HTTP_COOKIE_VARS)) {
	debug("\ncookie variables..\n\n");//:debug:
	while (list($key, $val) = each($HTTP_COOKIE_VARS)) {//:debug:
	debug($key.chr(9).$val."\n"); }//:debug:
}
debug("\n\nrequest variables..\n");//:debug:
debug("\n".'$_GET: '."\t".print_r($_GET, true)."\n\n");//:debug:
debug("\n".'$_POST: '."\t".print_r($_POST, true)."\n\n\n");//:debug:
debug("\n".'$_REQUEST: '."\t".print_r($_REQUEST, true)."\n\n");//:debug:

debug("\n".'$_SESSION: '."\t".print_r($_SESSION, true)."\n");//:debug:
debug("\n".'$GLOBALS: '."\t".print_r($GLOBALS, true)."\n");//:debug:
debug("\n\n");//:debug:

// final output
debug('out');//:debug:

	echo '
<html><head><title>',$title,' - corz debug unit v',$du_version,' .. viewed ',@$_SESSION['debug'],' times [cookie increment: ',@$_COOKIE['debug_cookie'],']</title></head><body>
<pre>',$debug_string,'</pre></body>';


/*
function:debug()
*/
function debug($data) {
global $debug_string;
	$debug_string .= $data;
}/* end function debug()
*/

?>