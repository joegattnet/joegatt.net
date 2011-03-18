<?php
/**
 * Groups configuration for default Minify implementation
 * @package Minify
 *
 * You may wish to use the Minify URI Builder app to suggest
 * changes. http://yourdomain/_min/builder/
 **/

$scriptsRoot = '//_etc/javascipt/';
$scripts = array();

if ($handle = opendir('../javascript/lib')) {
  while (($file = readdir($handle)) !== false) {
    if(preg_match('/[A-Z]/',$file)==0){
      array_push($scripts,$scriptsRoot.'lib/'.$file);
    }
  }
}

if ($handle = opendir('../javascript/src')) {
  while (($file = readdir($handle)) !== false) {
    if(preg_match('/[A-Z]/',$file)==0){
      array_push($scripts,$scriptsRoot.'src/'.$file);
    }
  }
}

$stylesRoot = '//_etc/css/';
$styles = array();

if ($handle = opendir('../css/lib')) {
  while (($file = readdir($handle)) !== false) {
    if(preg_match('/[A-Z]/',$file)==0){
      array_push($styles,$stylesRoot.'lib/'.$file);
    }
  }
}

if ($handle = opendir('../css/src')) {
  while (($file = readdir($handle)) !== false) {
    if(preg_match('/[A-Z]/',$file)==0){
      array_push($styles,$stylesRoot.'src/'.$file);
    }
  }
}

return array(
     'js1-2' => $scripts,
     'css1-1' => $styles,
     'cssprint1-1' => array('//_etc/css/src/Print.css'),
     'cssie6fixes1-1' => array('//_etc/css/src/IE6.css'),
     'cssie7fixes1-1' => array('//_etc/css/src/IE7.css')
);
