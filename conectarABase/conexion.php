<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "tienda";
$port = 3307;

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
else{
    echo "conexion exitosa";
}
?>

