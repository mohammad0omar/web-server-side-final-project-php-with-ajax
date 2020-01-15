<?php
session_start();
if(isset($_SESSION['login_user'])){
    $logedin = true;
}
else $logedin = false;
$json = array();
$json[] = array(
    'logedin' => $logedin
  );
$jsonstring = json_encode($json); 
echo $jsonstring;
?>