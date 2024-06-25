<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require __DIR__ . '/vendor/autoload.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? null;

include '../conexion.php';

if ($email) {
    $query = "SELECT nombre, correo, apellidos, fechaNac, preferencia, saldo FROM usuario WHERE correo = ?";
    $stmt = $conn->prepare($query);
    if ($stmt) {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->bind_result($nombre, $correo, $apellidos, $fechaNac, $preferencia, $saldo);
        $stmt->fetch();
        $stmt->close();

        $user = array(
            "nombre" => $nombre,
            "correo" => $correo,
            "apellidos" => $apellidos,
            "fechaNac" => $fechaNac,
            "preferencia" => $preferencia,
            "saldo" => $saldo
        );

        echo json_encode(array("success" => true, "user" => $user));
    } else {
        echo json_encode(array("success" => false, "message" => "Error en la consulta."));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Correo no proporcionado."));
}

$conn->close();
?>
