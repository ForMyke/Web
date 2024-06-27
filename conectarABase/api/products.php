<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
header("Content-Type: application/json");

include '../conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $category = isset($_GET['category']) ? $_GET['category'] : '';
        $product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

        if ($product_id > 0) {
            $sql = "
                SELECT 
                    p.id, p.title, p.description, p.category, p.price, p.discountPercentage, p.rating, p.stock, p.brand, p.sku, 
                    p.weight, p.dimensions_width, p.dimensions_height, p.dimensions_depth, p.warrantyInformation, p.shippingInformation,
                    p.availabilityStatus, p.returnPolicy, p.minimumOrderQuantity, p.createdAt, p.updatedAt, p.barcode, p.qrCode, p.thumbnail,
                    tp.tag, rp.rating AS review_rating, rp.comment, rp.date, rp.reviewerName, rp.reviewerEmail, ip.url
                FROM 
                    productos p
                    LEFT JOIN tags_productos tp ON p.id = tp.producto_id
                    LEFT JOIN reviews_productos rp ON p.id = rp.producto_id
                    LEFT JOIN imagenes_productos ip ON p.id = ip.producto_id
                WHERE p.id = ?
            ";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $product_id);
        } else {
            $sql = "
                SELECT 
                    p.id, p.title, p.description, p.category, p.price, p.discountPercentage, p.rating, p.stock, p.brand, p.sku, 
                    p.weight, p.dimensions_width, p.dimensions_height, p.dimensions_depth, p.warrantyInformation, p.shippingInformation,
                    p.availabilityStatus, p.returnPolicy, p.minimumOrderQuantity, p.createdAt, p.updatedAt, p.barcode, p.qrCode, p.thumbnail,
                    tp.tag, rp.rating AS review_rating, rp.comment, rp.date, rp.reviewerName, rp.reviewerEmail, ip.url
                FROM 
                    productos p
                    LEFT JOIN tags_productos tp ON p.id = tp.producto_id
                    LEFT JOIN reviews_productos rp ON p.id = rp.producto_id
                    LEFT JOIN imagenes_productos ip ON p.id = ip.producto_id
            ";

            if ($category) {
                $sql .= " WHERE p.category = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $category);
            } else {
                $stmt = $conn->prepare($sql);
            }
        }

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result === FALSE) {
            die("Error en la consulta SQL: " . $conn->error);
        }

        $products = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $id = $row["id"];
                
                if (!isset($products[$id])) {
                    $products[$id] = [
                        "id" => $row["id"],
                        "title" => $row["title"],
                        "description" => $row["description"],
                        "category" => $row["category"],
                        "price" => $row["price"],
                        "discountPercentage" => $row["discountPercentage"],
                        "rating" => $row["rating"],
                        "stock" => $row["stock"],
                        "brand" => $row["brand"],
                        "sku" => $row["sku"],
                        "weight" => $row["weight"],
                        "dimensions" => [
                            "width" => $row["dimensions_width"],
                            "height" => $row["dimensions_height"],
                            "depth" => $row["dimensions_depth"]
                        ],
                        "warrantyInformation" => $row["warrantyInformation"],
                        "shippingInformation" => $row["shippingInformation"],
                        "availabilityStatus" => $row["availabilityStatus"],
                        "returnPolicy" => $row["returnPolicy"],
                        "minimumOrderQuantity" => $row["minimumOrderQuantity"],
                        "createdAt" => $row["createdAt"],
                        "updatedAt" => $row["updatedAt"],
                        "barcode" => $row["barcode"],
                        "qrCode" => $row["qrCode"],
                        "thumbnail" => $row["thumbnail"],
                        "tags" => [],
                        "reviews" => [],
                        "images" => []
                    ];
                }

                if ($row["tag"]) {
                    $products[$id]["tags"][] = $row["tag"];
                }

                if ($row["review_rating"]) {
                    $products[$id]["reviews"][] = [
                        "rating" => $row["review_rating"],
                        "comment" => $row["comment"],
                        "date" => $row["date"],
                        "reviewerName" => $row["reviewerName"],
                        "reviewerEmail" => $row["reviewerEmail"]
                    ];
                }

                if ($row["url"]) {
                    $products[$id]["images"][] = $row["url"];
                }
            }
        } else {
            echo json_encode(["error" => "No results found"]);
            exit();
        }

        echo json_encode(array_values($products), JSON_PRETTY_PRINT);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $product_id = isset($data['id']) ? intval($data['id']) : 0;

        if ($product_id > 0) {
            $title = $data['title'];
            $description = $data['description'];
            $category = $data['category'];
            $price = $data['price'];
            $thumbnail = $data['thumbnail'];

            $sql = "
                UPDATE productos SET 
                    title = ?, description = ?, category = ?, price = ?, thumbnail = ?, updatedAt = NOW()
                WHERE id = ?
            ";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssisi", $title, $description, $category, $price, $thumbnail, $product_id);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Product updated successfully"]);
            } else {
                echo json_encode(["error" => "Failed to update product"]);
            }
        } else {
            echo json_encode(["error" => "Invalid product ID"]);
        }
        break;

    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}

$conn->close();
?>
