<?php
include 'conexion.php';

$json_archivo = 'datosJSON.json';

$json_data = file_get_contents($json_archivo);


if ($json_data === false) {
    die('Error al leer el archivo JSON.');
}

$data = json_decode($json_data, true);

if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die('Error al decodificar el JSON: ' . json_last_error_msg());
}

if (!isset($data['products'])) {
    die('Formato de JSON no válido.');
}

$products = $data['products'];

foreach ($products as $product) {
    // Preparar los valores para evitar errores de sintaxis
    $id = (int)$product['id'];
    $title = $conn->real_escape_string($product['title']);
    $description = $conn->real_escape_string($product['description']);
    $category = $conn->real_escape_string($product['category']);
    $price = (float)$product['price'];
    $discountPercentage = (float)$product['discountPercentage'];
    $rating = (float)$product['rating'];
    $stock = (int)$product['stock'];
    $brand = $conn->real_escape_string($product['brand']);
    $sku = $conn->real_escape_string($product['sku']);
    $weight = (float)$product['weight'];
    $dimensions_width = (float)$product['dimensions']['width'];
    $dimensions_height = (float)$product['dimensions']['height'];
    $dimensions_depth = (float)$product['dimensions']['depth'];
    $warrantyInformation = $conn->real_escape_string($product['warrantyInformation']);
    $shippingInformation = $conn->real_escape_string($product['shippingInformation']);
    $availabilityStatus = $conn->real_escape_string($product['availabilityStatus']);
    $returnPolicy = $conn->real_escape_string($product['returnPolicy']);
    $minimumOrderQuantity = (int)$product['minimumOrderQuantity'];
    $createdAt = $conn->real_escape_string($product['meta']['createdAt']);
    $updatedAt = $conn->real_escape_string($product['meta']['updatedAt']);
    $barcode = $conn->real_escape_string($product['meta']['barcode']);
    $qrCode = $conn->real_escape_string($product['meta']['qrCode']);
    $thumbnail = $conn->real_escape_string($product['thumbnail']);

    // Insertar producto
    $sql = "INSERT INTO productos (id, title, description, category, price, discountPercentage, rating, stock, brand, sku, weight, dimensions_width, dimensions_height, dimensions_depth, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, createdAt, updatedAt, barcode, qrCode, thumbnail)
            VALUES (
                $id, '$title', '$description', '$category', $price, $discountPercentage, $rating, $stock, '$brand', '$sku', $weight,
                $dimensions_width, $dimensions_height, $dimensions_depth, '$warrantyInformation', '$shippingInformation',
                '$availabilityStatus', '$returnPolicy', $minimumOrderQuantity, '$createdAt', '$updatedAt', '$barcode', '$qrCode', '$thumbnail'
            )
            ON DUPLICATE KEY UPDATE 
                title=VALUES(title), description=VALUES(description), category=VALUES(category), price=VALUES(price),
                discountPercentage=VALUES(discountPercentage), rating=VALUES(rating), stock=VALUES(stock), brand=VALUES(brand),
                sku=VALUES(sku), weight=VALUES(weight), dimensions_width=VALUES(dimensions_width), dimensions_height=VALUES(dimensions_height),
                dimensions_depth=VALUES(dimensions_depth), warrantyInformation=VALUES(warrantyInformation), shippingInformation=VALUES(shippingInformation),
                availabilityStatus=VALUES(availabilityStatus), returnPolicy=VALUES(returnPolicy), minimumOrderQuantity=VALUES(minimumOrderQuantity),
                createdAt=VALUES(createdAt), updatedAt=VALUES(updatedAt), barcode=VALUES(barcode), qrCode=VALUES(qrCode), thumbnail=VALUES(thumbnail);";

    if ($conn->query($sql) === TRUE) {
        echo "Producto insertado/actualizado exitosamente.\n";
    } else {
        echo "Error: " . $sql . "\n" . $conn->error;
    }

    // Insertar imágenes del producto
    foreach ($product['images'] as $image_url) {
        $image_url = $conn->real_escape_string($image_url);
        $sql = "INSERT INTO imagenes_productos (producto_id, url) VALUES ($id, '$image_url');";

        if ($conn->query($sql) === TRUE) {
            echo "Imagen insertada exitosamente.\n";
        } else {
            echo "Error: " . $sql . "\n" . $conn->error;
        }
    }

    // Insertar reviews del producto
    foreach ($product['reviews'] as $review) {
        $rating = (int)$review['rating'];
        $comment = $conn->real_escape_string($review['comment']);
        $date = $conn->real_escape_string($review['date']);
        $reviewerName = $conn->real_escape_string($review['reviewerName']);
        $reviewerEmail = $conn->real_escape_string($review['reviewerEmail']);

        $sql = "INSERT INTO reviews_productos (producto_id, rating, comment, date, reviewerName, reviewerEmail) VALUES (
                $id, $rating, '$comment', '$date', '$reviewerName', '$reviewerEmail');";

        if ($conn->query($sql) === TRUE) {
            echo "Review insertada exitosamente.\n";
        } else {
            echo "Error: " . $sql . "\n" . $conn->error;
        }
    }

    // Insertar tags del producto
    foreach ($product['tags'] as $tag) {
        $tag = $conn->real_escape_string($tag);
        $sql = "INSERT INTO tags_productos (producto_id, tag) VALUES ($id, '$tag');";

        if ($conn->query($sql) === TRUE) {
            echo "Tag insertada exitosamente.\n";
        } else {
            echo "Error: " . $sql . "\n" . $conn->error;
        }
    }
}

$conn->close();
?>