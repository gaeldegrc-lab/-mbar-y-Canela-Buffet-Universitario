<?php
header("Content-Type: application/json; charset=utf-8");
require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["message" => "Método no permitido."]);
    exit;
}

$nombre = trim($_POST["nombre"] ?? "");
$email = trim($_POST["email"] ?? "");
$acompanantes = (int)($_POST["acompanantes"] ?? 0);
$asistencia = $_POST["asistencia"] ?? "";
$comentario = trim($_POST["comentario"] ?? "");

if ($nombre === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(["message" => "Revisa tu nombre y correo."]);
    exit;
}

if (!in_array($asistencia, ["si", "no"], true)) {
    http_response_code(422);
    echo json_encode(["message" => "Selecciona una opción de asistencia."]);
    exit;
}

if ($acompanantes < 0 || $acompanantes > 4) {
    http_response_code(422);
    echo json_encode(["message" => "Número de acompañantes no válido."]);
    exit;
}

$sql = "INSERT INTO confirmaciones
        (nombre, email, acompanantes, asistencia, comentario)
        VALUES (:nombre, :email, :acompanantes, :asistencia, :comentario)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":nombre" => $nombre,
    ":email" => $email,
    ":acompanantes" => $acompanantes,
    ":asistencia" => $asistencia,
    ":comentario" => $comentario
]);

echo json_encode([
    "message" => $asistencia === "si"
        ? "¡Gracias! Tu asistencia quedó confirmada."
        : "Gracias por avisarnos."
]);
?>
