# Ámbar y Canela — Invitación digital

## Estructura

- `index.html` → estructura y contenido de la invitación.
- `css/styles.css` → colores, tipografías, diseño responsive y animaciones.
- `js/app.js` → contador, animaciones al hacer scroll, confirmaciones y galería.
- `api/config.php` → conexión MySQL.
- `api/rsvp.php` → guarda confirmaciones.
- `api/gallery.php` → devuelve fotografías aprobadas.
- `api/upload.php` → recibe y guarda fotografías.
- `database.sql` → crea las tablas.
- `uploads/` → fotografías subidas.

## Instalación con XAMPP

1. Instala XAMPP.
2. Copia la carpeta `ambar_y_canela` dentro de:
   `htdocs/`
3. Abre phpMyAdmin.
4. Importa `database.sql`.
5. Edita `api/config.php`.
6. Si usas XAMPP por defecto, normalmente:
   - host: localhost
   - usuario: root
   - contraseña: vacía
7. Inicia Apache y MySQL.
8. Visita:
   `http://localhost/ambar_y_canela/`

## Hosting

Sube la carpeta a un hosting que tenga:
- PHP 8+
- MySQL/MariaDB
- permisos de escritura en `uploads/`

Después crea la base de datos desde el panel del hosting y ejecuta `database.sql`.

## Google Maps

En `index.html` hay un mapa de ejemplo.
Para una ubicación exacta:
1. Abre Google Maps.
2. Busca el edificio/campus.
3. Pulsa Compartir.
4. Selecciona "Insertar un mapa".
5. Copia el `src` del iframe.
6. Sustituye el `src` del iframe del proyecto.

## Fecha

La fecha del contador se modifica en:
`js/app.js`

Busca:
`const EVENT_DATE = ...`

## Seguridad

Antes de publicar:
- Cambia las credenciales de `config.php`.
- Mantén fuera del repositorio las contraseñas.
- Considera poner las fotografías en revisión antes de mostrarlas.
- En producción conviene añadir protección contra spam/CAPTCHA y límites de frecuencia.

## Nuevas funciones v2

- Sobre/sello de apertura.
- Música ambiental opcional en `music/ambiente.mp3`.
- Hojas otoñales animadas.
- Galería con aprobación previa.
- Panel privado en `/admin/`.
- Inicio de sesión con `password_hash` de PHP.

Para crear la contraseña del administrador:
`php -r "echo password_hash('TU_CONTRASENA', PASSWORD_DEFAULT), PHP_EOL;"`

Luego inserta el hash en la tabla `administradores`.
