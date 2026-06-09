<?php
session_start();

$users = [
    "jiji" => "1234",
    "aiman" => "1234",
    "alya" => "1234",
    "adam" => "1234",
    "abu" => "1234"
];

if (isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

if (isset($users[$username]) && $users[$username] === $password){
    $SESSION['users'] = $username;
    header ("Location: index.php");
    exit();
} else{
    $failed = true;
}
}