<?php
header("Access-Control-Allow-Origin: *");

// Permitir los métodos GET, POST, PUT, DELETE, OPTIONS
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Permitir los encabezados Content-Type y Authorization
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Establecer el tipo de contenido para la respuesta como JSON
header("Content-Type: application/json");

// Obtener el correo electrónico enviado desde el cliente
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];

// Realizar la consulta a la base de datos para verificar si el correo existe
// Aquí debes reemplazar 'tu_usuario', 'tu_contraseña', 'tu_base_de_datos' y 'tu_tabla' con los valores correspondientes
include '../conexion.php';

$query = "SELECT COUNT(*) as count FROM usuario WHERE correo = '$email'";
$resultado = $conn->query($query);
$fila = $resultado->fetch_assoc();
$count = $fila['count'];

$conn->close();

// Devolver el resultado al cliente
echo json_encode(['exists' => $count > 0]);

?>