<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? null;
$contrasena = $data['contrasena'] ?? null;

include '../conexion.php';

// Consulta la contraseña almacenada en la base de datos
$query = "SELECT id, nombre, correo, contraseña FROM usuario WHERE correo = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->bind_result($id, $nombre, $correo, $hashed_password);
$stmt->fetch();
$stmt->close();

// Compara la contraseña proporcionada con la almacenada
if ($id && md5($contrasena) === $hashed_password) {
    // Genera un token JWT
    // Genera una clave secreta de 32 bytes (256 bits)
    $bytes = openssl_random_pseudo_bytes(32);
    $secret_key = base64_encode($bytes);
    $issued_at = time();
    $expiration_time = $issued_at +  180* 60; // El token expira en 1 hora
    $payload = array(
        'id' => $id,
        'nombre' => $nombre,
        'correo' => $correo,
        'iat' => $issued_at,
        'exp' => $expiration_time
    );
    $jwt = JWT::encode($payload, $secret_key, 'HS256');
    echo json_encode(array("success" => true, "jwt" => $jwt));
} else {
    echo json_encode(array("success" => false));
}

$conn->close();
?>

