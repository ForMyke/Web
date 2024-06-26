<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    handleGet();
} else {
    echo json_encode(array("success" => false, "message" => "Método no soportado."));
}

function handleGet() {
    global $conn;
    $query = "SELECT id, nombre AS name, correo AS email, estado as state FROM usuario";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $users = array();
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode(array("success" => true, "users" => $users));
    } else {
        echo json_encode(array("success" => false, "message" => "No se encontraron usuarios."));
    }
    $conn->close();
}
?>
