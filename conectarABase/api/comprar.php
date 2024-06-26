<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../conexion.php'; // Incluir la conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}

// Obtener los datos enviados
$json = file_get_contents('php://input');
$data = json_decode($json);

$correo = $data->correo;
$productos = $data->productos;
$total = $data->total;

$response = []; // Array para almacenar la respuesta

// Verificar el saldo del usuario
$stmt = $conn->prepare("SELECT saldo FROM usuario WHERE correo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user['saldo'] < $total) {
    $response["error"] = "Saldo insuficiente";
} else {
    // Verificar el stock de los productos
    $stockSuficiente = true;
    foreach ($productos as $producto) {
        $stmt = $conn->prepare("SELECT stock FROM productos WHERE id = ?");
        $stmt->bind_param("i", $producto->id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stock = $result->fetch_assoc()["stock"];

        if ($producto->cantidad > $stock) {
            $response["error"] = "Stock insuficiente para el producto: " . $producto->titulo . ". Stock disponible: " . $stock;
            $stockSuficiente = false;
            break;
        }
    }

    if ($stockSuficiente) {
        // Actualizar el saldo del usuario
        $nuevoSaldo = $user['saldo'] - $total;
        $stmt = $conn->prepare("UPDATE usuario SET saldo = ? WHERE correo = ?");
        $stmt->bind_param("ds", $nuevoSaldo, $correo);
        $stmt->execute();

        // Actualizar el stock y las ventas de los productos
        foreach ($productos as $producto) {
            $stmt = $conn->prepare("UPDATE productos SET stock = stock - ?, ventas = ventas + ? WHERE id = ?");
            $stmt->bind_param("iii", $producto->cantidad, $producto->cantidad, $producto->id);
            $stmt->execute();
        }

        $response["success"] = "Compra realizada con éxito";
    }
}

echo json_encode($response);

$conn->close();
?>
