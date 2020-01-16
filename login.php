<?php
session_start();
include('database.php');
$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password' " ;
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
    echo("failed");
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'username' => $row['username'],
        'password' => $row['password']
    );
  }
  if($json){
    $_SESSION['username']=$username;
    header('location: index.html');
  }
  else{
    header('location: login.html'); 
  }  
?>