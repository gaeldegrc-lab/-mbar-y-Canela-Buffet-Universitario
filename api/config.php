<?php
// ============================================================
// CONFIGURACIÓN DE BASE DE DATOS
// Cambia estos datos por los que te entregue tu hosting.
// Nunca publiques este archivo en GitHub si contiene
// contraseñas reales.
// ============================================================

$host = "localhost";
$db   = "ambar_canela";
$user = "TU_USUARIO";
$pass = "TU_CONTRASENA";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode([
        "message" => "No se pudo conectar con la base de datos."
    ]);
    exit;
}
?>
