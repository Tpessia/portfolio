<html>
<head>
    <title>Meu PHP</title>
</head>
<body>
    <?php
        $servername = "mysql.hostinger.com.br";
        $username = "u330258262_user";
        $password = "0123456789";
        $dbname = "u330258262_db";

        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        
        // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        echo "Connected successfully<br>";
        
        $sql = "
        SELECT ID, user, password
        FROM users
        ";
        $result = mysqli_query($conn, $sql);
        
        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
                echo "ID: " . $row["ID"]. " | user: " . $row["user"]. " | password: " . $row["password"]. "<br>";
            }
        } else {
            echo "0 results";
        }
        
        mysqli_close($conn);
    ?>
</body>
</html>