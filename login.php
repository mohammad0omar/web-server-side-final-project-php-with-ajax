<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $_SESSION['username']=$_POST['username'];
    // 86400 = 1 day
    $_SESSION['password']=$_POST['password'];
    
    if(isset($_SESSION['username']))
        header('location: index.html');
}
?>