<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
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

    $query = "SELECT 
                dv.id,
                u.correo AS email, 
                p.title AS productTitle, 
                dv.cantidad AS quantity, 
                dv.precio AS price, 
                v.total AS total,
                v.id AS venta_id,
                v.fecha_venta AS fecha,
                u.calle,
                u.numCalle AS numero,
                u.colonia,
                u.estado,
                u.CP
              FROM detalle_ventas dv 
              JOIN ventas v ON dv.venta_id = v.id 
              JOIN usuario u ON v.usuario_id = u.id 
              JOIN productos p ON dv.producto_id = p.id";
              
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $pedidos = array();
        while ($row = $result->fetch_assoc()) {
            $pedidos[] = $row;
        }
        echo json_encode(array("success" => true, "pedidos" => $pedidos));
    } else {
        echo json_encode(array("success" => false, "message" => "No se encontraron pedidos."));
    }
    $conn->close();
}
?>
