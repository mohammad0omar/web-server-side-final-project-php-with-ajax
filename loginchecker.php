<?php
session_start();
if(isset($_SESSION['username'])){
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