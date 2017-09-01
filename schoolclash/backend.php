<?php

$data = json_decode(file_get_contents('php://input'), true);


//assign variables for connection
$db = parse_ini_file("database.ini");

$dbhost = $db['host'];
$dbname = $db['name'];
$user = $db['user'];
$pass = $db['pass'];


//connect to database and check if connection succeeded yes or no
try {
    $database = new
    PDO("mysql:host=$dbhost;dbname=$dbname", $user, $pass);
    $database->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION );
} catch(PDOException $e) {
    echo $e->getMessage();
    echo "Connection failed, try again later";
}

if(isset($data)) {
    $questionName = [];
    $answered = [];
    for($i = 0; $i < count($data); $i++) {
        $questionName[] = $data[$i][name];
        $answered[] = $data[$i][answered];
    }
    $query = "INSERT INTO results (questionName, answered)
                  VALUES ('" . implode(', ',$questionName) ."', '" . implode(', ',$answered) . "')";
    $submit = $database->prepare($query);

    try {
        $submit->execute();
        echo "Submitted succesfully";
    } catch (PDOException $e) {
        echo $e;
    echo "Something went wrong";
    }
}