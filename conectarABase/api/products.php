<?php
include '../conexion.php';

$sql = "SELECT DATE()";

$result = $conn->query($sql);

if ($conn->query($sql) === TRUE) {
  echo $result;
} else {
  echo "Error: " . $sql . "\n" . $conn->error;
}
?>