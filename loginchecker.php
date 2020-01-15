<?php
session_start();
$username = "no one";
if(isset($_SESSION['username'])){
    $logedin = true;
    $username = $_SESSION['username'];
}
else $logedin = false;
$json = array();
$json[] = array(
    'logedin' => $logedin,
    'username' => $username
  );
$jsonstring = json_encode($json); 
echo $jsonstring;
?>