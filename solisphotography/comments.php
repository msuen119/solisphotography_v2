<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<?php

  $name    = $_POST["name"];
  $comment = $_POST["comment"];
  $action  = $_POST["action"];
  $xml = null;

  $con = mysql_connect('localhost', 'webadm', 'pass4usr') or die('Could not connect: ' . mysql_error());
  mysql_select_db('webdb') or die('Could not select database: ' . mysql_error());

  if($action == 'insert') {
    $insert = "INSERT INTO comments(user,message,postdate) values(\"$name\",\"$comment\", TIMESTAMP(SYSDATE()))";
    mysql_query($insert) or die('Insert failed: ' . mysql_error());
    //mysql_commit();
  }
  else if($action == 'retrieve') {
    $xml = "<comments>"; 

    $query = "SELECT user,message,date_format(postdate,'%b %d, %y %h:%i %p') AS strdate FROM comments order by postdate desc";
    $rs    = mysql_query($query) or die('Query failed:'  . mysql_error());
    $rows  = mysql_num_rows($rs) or die('Query failed:' . mysql_error());

    for($i = 0; $i<$rows; $i++) {
      $xml = $xml . "<comment>";
      $fetch_row = mysql_fetch_array($rs);
      $xml = $xml . "<user>" . $fetch_row['user'] . "</user>";
      $xml = $xml . "<message>" . $fetch_row['message'] . "</message>";
      $xml = $xml . "<date>" . $fetch_row['strdate'] . "</date>";
      $xml = $xml . "</comment>";
    }
    $xml = $xml . "</comments>";
  print($xml);

 /* $fp = fopen("test.xml","w");
  fwrite($fp,$xml);
  fclose($fp);*/

  }
  mysql_close($con);
?>


</body>
</html>
