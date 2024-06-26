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
} elseif ($method == 'POST') {
    handlePost();
} elseif ($method == 'PUT') {
    handlePut();
} elseif ($method == 'DELETE') {
    handleDelete();
} else {
    echo json_encode(array("success" => false, "message" => "Método no soportado."));
}

function handleGet() {
    global $conn;
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $query = "SELECT id, nombre AS name, correo AS email, estado as state, apellidos as surname, tipo as type, fechaNac as birthDate, municipio, colonia, calle, numCalle as streetNumber, CP as postalCode, preferencia as preferences, saldo FROM usuario WHERE id = $id";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            echo json_encode(array("success" => true, "user" => $user));
        } else {
            echo json_encode(array("success" => false, "message" => "Usuario no encontrado."));
        }
    } else {
        $query = "SELECT id, nombre AS name, correo AS email, estado as state, apellidos as surname, tipo as type FROM usuario WHERE tipo = 1";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $users = array();
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode(array("success" => true, "users" => $users));
        } else {
            echo json_encode(array("success" => false, "message" => "No se encontraron usuarios."));
        }
    }
    $conn->close();
}

function handlePost() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    error_log("Datos recibidos: " . print_r($data, true)); // Log the received data

    if (isset($data['name']) && isset($data['surname']) && isset($data['email']) && isset($data['password']) && isset($data['birthDate']) && isset($data['saldo'])) {
        $name = $conn->real_escape_string($data['name']);
        $surname = $conn->real_escape_string($data['surname']);
        $email = $conn->real_escape_string($data['email']);
        $password = md5($data['password']);  // Cifrado MD5
        $birthDate = $conn->real_escape_string($data['birthDate']);
        $type = 1;  // Forzar el tipo a 1
        $saldo = 10000;  // Saldo inicial

        $query = "INSERT INTO usuario (nombre, apellidos, correo, contraseña, fechaNac, saldo, tipo) VALUES ('$name', '$surname', '$email', '$password', '$birthDate', '$saldo', '$type')";
        error_log("Ejecutando consulta: $query"); // Log the query

        if ($conn->query($query) === TRUE) {
            $id = $conn->insert_id;  // Obtener el ID insertado
            echo json_encode(array("success" => true, "id" => $id, "message" => "Usuario registrado con éxito."));
        } else {
            error_log("Error en la consulta: " . $conn->error); // Log any SQL errors
            echo json_encode(array("success" => false, "message" => "Error al registrar el usuario: " . $conn->error));
        }
    } else {
        error_log("Datos incompletos: " . print_r($data, true)); // Log the incomplete data
        echo json_encode(array("success" => false, "message" => "Datos incompletos."));
    }
    $conn->close();
}

function handlePut() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    error_log("Datos recibidos para actualización: " . print_r($data, true)); // Log the received data

    if (isset($data['id']) && isset($data['name']) && isset($data['surname']) && isset($data['email']) && isset($data['birthDate']) && isset($data['saldo'])) {
        $id = intval($data['id']);
        $name = $conn->real_escape_string($data['name']);
        $surname = $conn->real_escape_string($data['surname']);
        $email = $conn->real_escape_string($data['email']);
        $birthDate = $conn->real_escape_string($data['birthDate']);
        $type = 1;  // Forzar el tipo a 1
        $saldo = floatval($data['saldo']);

        $query = "UPDATE usuario SET nombre='$name', apellidos='$surname', correo='$email', fechaNac='$birthDate', saldo='$saldo', tipo='$type' WHERE id=$id";
        error_log("Ejecutando consulta: $query"); // Log the query

        if ($conn->query($query) === TRUE) {
            echo json_encode(array("success" => true, "message" => "Usuario actualizado con éxito."));
        } else {
            error_log("Error en la consulta: " . $conn->error); // Log any SQL errors
            echo json_encode(array("success" => false, "message" => "Error al actualizar el usuario: " . $conn->error));
        }
    } else {
        error_log("Datos incompletos para actualización: " . print_r($data, true)); // Log the incomplete data
        echo json_encode(array("success" => false, "message" => "Datos incompletos."));
    }
    $conn->close();
}

function handleDelete() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    error_log("Datos recibidos para eliminación: " . print_r($data, true)); // Log the received data

    if (isset($data['ids']) && is_array($data['ids'])) {
        $ids = implode(',', array_map('intval', $data['ids']));
        $query = "DELETE FROM usuario WHERE id IN ($ids)";
        error_log("Ejecutando consulta: $query"); // Log the query

        if ($conn->query($query) === TRUE) {
            echo json_encode(array("success" => true, "message" => "Usuarios eliminados con éxito."));
        } else {
            error_log("Error en la consulta: " . $conn->error); // Log any SQL errors
            echo json_encode(array("success" => false, "message" => "Error al eliminar los usuarios: " . $conn->error));
        }
    } else {
        error_log("Datos inválidos para eliminación: " . print_r($data, true)); // Log the invalid data
        echo json_encode(array("success" => false, "message" => "Datos inválidos."));
    }
    $conn->close();
}
?>
