<?php
header("Content-Type: application/json; charset=utf-8");
require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["message" => "Método no permitido."]);
    exit;
}

$nombre = trim($_POST["nombre"] ?? "Invitado");

if (!isset($_FILES["foto"]) || $_FILES["foto"]["error"] !== UPLOAD_ERR_OK) {
    http_response_code(422);
    echo json_encode(["message" => "No se recibió una fotografía válida."]);
    exit;
}

$file = $_FILES["foto"];

if ($file["size"] > 5 * 1024 * 1024) {
    http_response_code(422);
    echo json_encode(["message" => "La fotografía no puede superar 5 MB."]);
    exit;
}

$allowed = [
    "image/jpeg" => "jpg",
    "image/png" => "png",
    "image/webp" => "webp"
];

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file["tmp_name"]);

if (!isset($allowed[$mime])) {
    http_response_code(422);
    echo json_encode(["message" => "Formato de imagen no permitido."]);
    exit;
}

$filename = bin2hex(random_bytes(16)) . "." . $allowed[$mime];
$uploadDir = dirname(__DIR__) . "/uploads/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$destination = $uploadDir . $filename;

if (!move_uploaded_file($file["tmp_name"], $destination)) {
    http_response_code(500);
    echo json_encode(["message" => "No se pudo guardar la fotografía."]);
    exit;
}

$stmt = $pdo->prepare(
    "INSERT INTO galeria (nombre, archivo, aprobado)
     VALUES (:nombre, :archivo, 1)"
);

$stmt->execute([
    ":nombre" => $nombre !== "" ? $nombre : "Invitado",
    ":archivo" => $filename
]);

echo json_encode([
    "message" => "¡Recuerdo agregado a la galería!"
]);
?>
