<?php

// DB info

$servername = $_SERVER["SERVER_ADDR"] == "127.0.0.1" ? "sql131.main-hosting.eu" : "mysql.hostinger.com.br";
$username = "u312806541_user1";
$password = "dInPbOsAaNcJ!314159";
$dbname = "u312806541_noise";

// Create connection

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}



// User info

$params = json_decode(file_get_contents('php://input'),true);

$user_id = mysqli_real_escape_string($conn, $params["userId"]);
$old_password = mysqli_real_escape_string($conn, $params["oldPassword"]);
$new_password = mysqli_real_escape_string($conn, $params["newPassword"]);

// Insert

$sql = "

    CALL user_change_password('". $user_id ."','". $old_password ."','". $new_password ."');

";

$result = mysqli_query($conn, $sql);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            echo json_encode($row);
        }
    }
    else {
        die("Error: Query returned 0 results");
    }
}
else {
    die("Error: " . $sql . "<br>" . mysqli_error($conn));
}



// Close connection

mysqli_close($conn);

?>