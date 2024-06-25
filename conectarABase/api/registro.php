<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}


$json = file_get_contents('php://input');
$data = json_decode($json);

$nombre = $data->nombre;
$apellido = $data->apellido;
$email = $data->email;
$contrasena = $data->contrasena;
$preferencia = $data->preferencia;
$nacimiento = $data->nacimiento;
$codigoPostal = $data->codigoPostal;
$estado = $data->estado;
$municipio = $data->municipio;
$colonia = $data->colonia;
$calle = $data->calle;
$numero = $data->numero;


include '../conexion.php'; // Incluir la conexión a la base de datos

// Verificar si el correo electrónico ya está en uso
$stmt = $conn->prepare("SELECT COUNT(*) as count FROM usuario WHERE correo = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$count = $result->fetch_assoc()["count"];

if ($count > 0) {
    // El correo electrónico ya está en uso
    $response = ["error" => "El correo electrónico ya está registrado"];
} else {

    $query = "INSERT INTO usuario(tipo, nombre, apellidos, correo, contraseña, preferencia, fechaNac, saldo, CP, estado, municipio, colonia, calle, numCalle)
    VALUES(0, '$nombre', '$apellido', '$email', MD5('$contrasena'), '$preferencia', '$nacimiento', 10000, '$codigoPostal', '$estado', '$municipio', '$colonia', '$calle', '$numero')";
    $resultado = $conn->query($query);

    $query = "SELECT id, nombre, correo, contraseña FROM usuario WHERE correo = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->bind_result($id, $nombre, $correo, $hashed_password);
    $stmt->fetch();


    $bytes = openssl_random_pseudo_bytes(32);
    $secret_key = base64_encode($bytes);
    $issued_at = time();
    $expiration_time = $issued_at +  180* 60; // El token expira en 1 hora
    $payload = array(
        'id' => $id,
        'nombre' => $nombre,
        'correo' => $email,
        'iat' => $issued_at,
        'exp' => $expiration_time
    );
    $jwt = JWT::encode($payload, $secret_key, 'HS256');
    $response = array("success" => "Usuario registrado correctamente", "jwt" => $jwt);
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
