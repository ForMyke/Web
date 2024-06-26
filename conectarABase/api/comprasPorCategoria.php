<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../conexion.php'; // Ajusta el camino a tu archivo de conexión

$sql = "SELECT category AS categoria, COUNT(*) AS compras FROM productos GROUP BY category";
$result = $conn->query($sql);

$labels = [];
$data = [];

while($row = $result->fetch_assoc()) {
    $labels[] = $row['categoria'];
    $data[] = $row['compras'];
}

echo json_encode(['labels' => $labels, 'data' => $data]);

$conn->close();
?>
