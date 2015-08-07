<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>
<body>


<?php

$to = "julio.solisjr@gmail.com, marshdogg@gmail.com, juliosolis@yahoo.com";
$subject = "Email from Solis Photography";
$from = "solisphotography.com";
$from_name = $_POST["name"];
$from_email = $_POST["email"];
$message = $from_name . "\n" . $from_email . "\n\n" . $_POST["message"];
$headers = "From: $from";
mail($to,$subject,$message,$headers);
echo "message sent";
?>
</body>
</html>
