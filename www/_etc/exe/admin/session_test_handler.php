<?php

$sid = $_GET ['sid'];
session_id ($sid);

session_start ();

?>

<html>
<head>
	<title>Session test</title>
</head>

<body>
	<p>
		<b>Session Info.</b> 
	</p>

	<p>
		Session id: <?php print "$sid"; ?><br>
		Session variable "abc": <?php print $_SESSION ['abc']; ?> <br>
	</p>

</html>

</body>
