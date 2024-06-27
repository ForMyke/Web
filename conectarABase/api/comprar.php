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
$stmt = $conn->prepare("SELECT id, saldo FROM usuario WHERE correo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$userId = $user['id'];
$saldo = $user['saldo'];

if ($saldo < $total) {
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
        // Iniciar transacción
        $conn->begin_transaction();

        try {
            // Actualizar el saldo del usuario
            $nuevoSaldo = $saldo - $total;
            $stmt = $conn->prepare("UPDATE usuario SET saldo = ? WHERE correo = ?");
            $stmt->bind_param("ds", $nuevoSaldo, $correo);
            $stmt->execute();

            // Crear registro en la tabla ventas
            $stmt = $conn->prepare("INSERT INTO ventas (usuario_id, total, fecha_venta) VALUES (?, ?, NOW())");
            $stmt->bind_param("id", $userId, $total);
            $stmt->execute();
            $ventaId = $stmt->insert_id;

            // Crear registros en la tabla detalle_ventas y actualizar stock y ventas de los productos
            foreach ($productos as $producto) {
                // Obtener el precio del producto
                $stmt = $conn->prepare("SELECT price FROM productos WHERE id = ?");
                $stmt->bind_param("i", $producto->id);
                $stmt->execute();
                $result = $stmt->get_result();
                $precio = $result->fetch_assoc()["price"];

                // Calcular el subtotal
                $subtotal = $producto->cantidad * $precio;

                // Insertar en detalle_ventas
                $stmt = $conn->prepare("INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)");
                $stmt->bind_param("iiidd", $ventaId, $producto->id, $producto->cantidad, $precio, $subtotal);
                $stmt->execute();

                // Actualizar stock y ventas de los productos
                $stmt = $conn->prepare("UPDATE productos SET stock = stock - ?, ventas = ventas + ? WHERE id = ?");
                $stmt->bind_param("iii", $producto->cantidad, $producto->cantidad, $producto->id);
                $stmt->execute();
            }

            $conn->commit();
            $response["success"] = "Compra realizada con éxito";
        } catch (Exception $e) {
            $conn->rollback();
            $response["error"] = "Error al realizar la compra: " . $e->getMessage();
        }
    }
}

echo json_encode($response);

$conn->close();
?>
