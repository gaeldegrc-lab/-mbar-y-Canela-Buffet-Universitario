<?php
header("Content-Type: application/json; charset=utf-8");
require_once "config.php";

$stmt = $pdo->query(
    "SELECT id, nombre, archivo, creado_en
     FROM galeria
     WHERE aprobado = 1
     ORDER BY creado_en DESC"
);

$images = [];

while ($row = $stmt->fetch()) {
    $images[] = [
        "id" => (int)$row["id"],
        "nombre" => $row["nombre"],
        "url" => "../uploads/" . basename($row["archivo"]),
        "creado_en" => $row["creado_en"]
    ];
}

echo json_encode($images);
?>
