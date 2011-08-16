<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="no-js">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<?php
$string = "Encyclopédie | Vološinov";
$output = iconv("ISO-8859-1", "ASCII//TRANSLIT", $string);
print $output; 

$string = "Encyclopédie | Vološinov";
$output = preg_replace('/éš/tr', 'es', $string); 
print $output; 
?>
</html>