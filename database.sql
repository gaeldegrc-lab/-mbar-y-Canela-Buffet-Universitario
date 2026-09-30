-- ============================================================
-- BASE DE DATOS: ÁMBAR Y CANELA
-- MySQL / MariaDB
-- ============================================================

CREATE DATABASE IF NOT EXISTS ambar_canela
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE ambar_canela;

-- ------------------------------------------------------------
-- CONFIRMACIONES DE ASISTENCIA
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS confirmaciones (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    acompanantes TINYINT UNSIGNED NOT NULL DEFAULT 0,
    asistencia ENUM('si', 'no') NOT NULL,
    comentario VARCHAR(500) NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- GALERÍA DE RECUERDOS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS galeria (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL DEFAULT 'Invitado',
    archivo VARCHAR(255) NOT NULL,
    aprobado TINYINT(1) NOT NULL DEFAULT 1,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- OPCIONAL: USUARIOS ADMINISTRADORES
-- Se deja preparada para crear posteriormente un panel
-- privado donde puedan aprobar fotografías.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS administradores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(80) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ADMINISTRADOR: genera un hash seguro con PHP:
-- php -r "echo password_hash('TU_CONTRASENA', PASSWORD_DEFAULT), PHP_EOL;"
-- Después:
-- INSERT INTO administradores(usuario,password_hash) VALUES ('admin','PEGA_EL_HASH_AQUI');
