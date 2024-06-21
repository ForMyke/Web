<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if ($data === null) {
    echo json_encode(['success' => false, 'error' => 'Error al decodificar JSON']);
    exit;
}

$email = $data['email'] ?? null;
$contrasena = $data['contrasena'] ?? null;

if (!$email || !$contrasena) {
    echo json_encode(['success' => false, 'error' => 'Email o contraseña no proporcionados']);
    exit;
}

include '../conexion.php';

// Consulta la contraseña almacenada en la base de datos
$query = "SELECT contraseña FROM usuario WHERE correo = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->bind_result($hashed_password);
$stmt->fetch();
$stmt->close();
$conn->close();

// Compara el hash MD5 de la contraseña proporcionada con la almacenada
if ($hashed_password && md5($contrasena) === $hashed_password) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>

