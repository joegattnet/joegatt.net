<?php

require 'lessc.inc.php';

function auto_compile_less($less_fname, $css_fname) {
  // load the cache
  $cache_fname = $css_fname.".cache";
  if (file_exists($cache_fname)) {
    $cache = unserialize(file_get_contents($cache_fname));
  } else {
    $cache = $less_fname;
  }

  $new_cache = lessc::cexecute($cache);
  if (!is_array($cache) || $new_cache['updated'] > $cache['updated']) {
    file_put_contents($cache_fname, serialize($new_cache));
    file_put_contents($css_fname, $new_cache['compiled']);
  }
  print $new_cache['compiled'];
}

auto_compile_less('../../../_assets/less/index.css.less', '../../../_etc/cache/styles-' . $_GET["r"] . '.css');