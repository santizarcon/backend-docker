-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: btvms15ai8xwf6ucbjky-mysql.services.clever-cloud.com:20760
-- Generation Time: Jul 27, 2024 at 06:55 PM
-- Server version: 8.0.34-26
-- PHP Version: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `btvms15ai8xwf6ucbjky`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_carrito_herramienta` (IN `_cantidad_herramienta` INT, IN `_id_herramienta` INT, IN `_id_user` INT)   BEGIN
	DECLARE _id_carrito int;
    SELECT id INTO _id_carrito FROM carrito WHERE id_user = _id_user;
    IF NOT EXISTS(SELECT * FROM carrito_herramienta  WHERE id_herramienta = _id_herramienta AND id_carrito = _id_carrito AND estado = "carrito") THEN
    	INSERT INTO carrito_herramienta(cantidad_herramienta, id_herramienta, id_carrito) VALUES (_cantidad_herramienta, _id_herramienta, _id_carrito);
    ELSE
    	UPDATE carrito_herramienta SET cantidad_herramienta = cantidad_herramienta + _cantidad_herramienta 
        WHERE id_herramienta = _id_herramienta AND id_carrito = _id_carrito;
    END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_cuentas_eliminadas` (IN `_id_user` INT, IN `_id_admin` INT)   BEGIN
	IF NOT EXISTS(SELECT * FROM cuentas_eliminadas WHERE id_user = _id_user) THEN
		INSERT INTO cuentas_eliminadas(fecha, id_user, id_admin) 
		VALUES (curdate(), _id_user, _id_admin);
    END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_fichas` (IN `_numero_ficha` INT(10), IN `_cantidad_aprendices` INT(2), IN `_nivel_formacion` VARCHAR(50), IN `_programa_formacion` VARCHAR(50), IN `_ambiente` VARCHAR(50))   BEGIN
	INSERT INTO fichas(numero_ficha, cantidad_aprendices, nivel_formacion, programa_formacion, ambiente)
	VALUES (_numero_ficha, _cantidad_aprendices, _nivel_formacion, _programa_formacion, _ambiente);
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_formulario_daño_herramienta` (IN `_asunto` VARCHAR(100), IN `_cantidad` INT, IN `_imagen` LONGBLOB, IN `_descripcion` VARCHAR(500), IN `_id_user` INT, IN `_id_herramienta` INT)   BEGIN
    INSERT INTO formulario_daño_herramienta(asunto, fecha, cantidad, imagen, descripcion, id_user, id_herramienta)
    VALUES(_asunto, curdate(), _cantidad, _imagen, _descripcion, _id_user, _id_herramienta);
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_formulario_nueva_herramienta` (IN `_asunto` VARCHAR(100), IN `_cantidad` INT, IN `_descripcion` VARCHAR(500), IN `_id_user` INT)   BEGIN
	INSERT INTO formulario_nueva_herramienta(asunto, fecha, cantidad, descripcion, id_user)
	VALUES(_asunto, curdate() ,_cantidad, _descripcion, _id_user);
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_herramienta` (IN `_nombre_herramienta` VARCHAR(100), IN `_imagen` LONGBLOB, IN `_descripcion` VARCHAR(500), IN `_cantidad_total` INT(4), IN `_referencia` VARCHAR(100), IN `_id_admin` INT(10))   BEGIN
	INSERT INTO herramienta(nombre_herramienta, imagen, descripcion, cantidad_disponible, cantidad_total, referencia, id_admin)
	VALUES (_nombre_herramienta, _imagen, _descripcion, _cantidad_total, _cantidad_total, _referencia, _id_admin);
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_informe_solicitud` (IN `_numero_ficha` INT, IN `_fecha` DATE, IN `_id_user` INT)   BEGIN
	DECLARE _id_fichas int;
	DECLARE _id_carrito int;
    SELECT id INTO _id_fichas FROM fichas WHERE numero_ficha = _numero_ficha;
    SELECT id INTO _id_carrito FROM carrito WHERE id_user = _id_user;
	INSERT INTO informe_solicitud(fecha, id_fichas, id_user, id_carrito) 
    VALUES (_fecha, _id_fichas, _id_user, _id_carrito);
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_subAdmin` (IN `_email` VARCHAR(100), IN `_password` VARCHAR(100), IN `_nombre` VARCHAR(50), IN `_apellido` VARCHAR(50))   BEGIN 
	INSERT INTO admin (email, password, nombre, apellido) 
	VALUES (_email, _password, _nombre, _apellido); 
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_user` (IN `_email` VARCHAR(100), IN `_password` VARCHAR(100), IN `_nombre` VARCHAR(50), IN `_apellido` VARCHAR(50))   BEGIN  
	INSERT INTO user(email, password, nombre, apellido)  
	VALUES (_email, _password, _nombre, _apellido);  
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_create_user_ficha` (IN `_id_user` INT(10), IN `_numero_ficha` INT(50))   BEGIN
	DECLARE _id_fichas int;
    SELECT id INTO _id_fichas FROM fichas WHERE numero_ficha = _numero_ficha;
	IF NOT EXISTS(SELECT * FROM user_ficha WHERE id_user = _id_user AND id_fichas = _id_fichas) THEN
		INSERT INTO user_ficha(id_user, id_fichas)
		VALUES (_id_user, _id_fichas);
	END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_delete_carrito_herramienta` (IN `_id` INT, IN `_id_user` INT)   BEGIN
	DECLARE _id_carrito int;
    SELECT id INTO _id_carrito FROM carrito WHERE id_user = _id_user;
	IF(_id = 0) THEN
    	DELETE FROM carrito_herramienta WHERE estado = "carrito" AND id_carrito = _id_carrito;
    ELSE
    	DELETE FROM carrito_herramienta WHERE id = _id AND estado = "carrito" AND id_carrito = _id_carrito;
    END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_delete_fichas` (IN `_numero_ficha` INT)   BEGIN
	DELETE FROM fichas WHERE numero_ficha = _numero_ficha;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_delete_herramienta` (IN `_id` INT)   BEGIN
	DELETE FROM herramienta
    WHERE id = _id;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_delete_recuperar_cuenta` (IN `_email` VARCHAR(100))   BEGIN
	DECLARE _id_user int;
    IF EXISTS(SELECT * FROM user WHERE email = _email) THEN
    	SELECT id INTO _id_user FROM user WHERE email = _email;
    	DELETE FROM cuentas_eliminadas WHERE id_user = _id_user;
    END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_delete_user_ficha` (IN `_id` INT)   BEGIN
	DELETE FROM user_ficha WHERE id = _id;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_admin` (IN `_id` INT)   BEGIN
	IF EXISTS (SELECT * FROM admin WHERE id = _id) THEN
        SELECT * FROM admin WHERE id = _id;
	END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_carrito` (IN `_id_user` INT)   BEGIN
	SELECT ch.id, ch.cantidad_herramienta, c.cantidad_total, h.nombre_herramienta, h.imagen, h.cantidad_disponible
	FROM carrito AS c
    INNER JOIN carrito_herramienta AS ch
    ON c.id = ch.id_carrito
    INNER JOIN herramienta AS h
    ON ch.id_herramienta = h.id
    WHERE c.id_user = _id_user AND ch.estado = "carrito";
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_cuentas` ()   BEGIN 
	SELECT id, nombre, apellido, email, "user" as rol, estado
	FROM user
	UNION 
	SELECT id, nombre, apellido, email, rol, estado
	FROM admin WHERE rol = "subAdmin";
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_fichas` ()   BEGIN
SELECT * 
FROM fichas;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_formulario_daño_herramienta` ()   BEGIN
	SELECT fd.asunto, fd.fecha, fd.cantidad, fd.descripcion, u.email, u.nombre, u.apellido, h.nombre_herramienta
    FROM formulario_daño_herramienta AS fd
    INNER JOIN user AS u
    ON u.id = fd.id_user
    INNER JOIN herramienta AS h
    ON h.id = fd.id_herramienta;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_formulario_daño_herramienta_user` (IN `_id_user` INT)   BEGIN
	SELECT fd.asunto, fd.fecha, fd.cantidad, fd.descripcion, u.email, u.nombre, u.apellido, h.nombre_herramienta
    FROM formulario_daño_herramienta AS fd
    INNER JOIN user AS u
    ON u.id = fd.id_user
    INNER JOIN herramienta AS h
    ON h.id = fd.id_herramienta
	WHERE _id_user = _id_user;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_formulario_nueva_herramienta` ()   BEGIN
	SELECT fn.asunto, fn.fecha, fn.cantidad, fn.descripcion, u.email, u.nombre, u.apellido
    FROM formulario_nueva_herramienta AS fn
    INNER JOIN user AS u
    ON u.id = fn.id_user;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_formulario_nueva_herramienta_user` (IN `_id_user` INT)   BEGIN
	SELECT fn.asunto, fn.fecha, fn.cantidad, fn.descripcion, u.email, u.nombre, u.apellido
    FROM formulario_nueva_herramienta AS fn
    INNER JOIN user AS u
    ON u.id = fn.id_user
	WHERE id_user = _id_user;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_herramienta` ()   BEGIN 
	SELECT *
	FROM herramienta;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_herramientas_prestadas` ()   BEGIN
	SELECT hp.cantidad_prestadas, hp.fecha, hp.estado, f.*, u.email, u.nombre, u.apellido, h.nombre_herramienta
    FROM herramientas_prestadas AS hp
    INNER JOIN fichas AS f
    ON hp.id_fichas = f.id
    INNER JOIN user AS u
    ON hp.id_user = u.id
    INNER JOIN herramienta AS h
    ON hp.id_herramienta = h.id;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_informe_carrito` (IN `_id_informe` INT)   BEGIN
	SELECT ch.cantidad_herramienta, h.nombre_herramienta, h.imagen
    FROM carrito_herramienta AS ch
    INNER JOIN herramienta AS h
    ON ch.id_herramienta = h.id
    WHERE ch.estado = CONCAT("informe ", _id_informe);
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_informe_solicitud_admin` ()   BEGIN
	SELECT info.id, info.fecha, info.estado_solicitud, info.estado_entrega, f.numero_ficha, f.cantidad_aprendices, f.nivel_formacion, f.programa_formacion, f.ambiente, u.email, u.nombre, u.apellido
    FROM informe_solicitud AS info
    INNER JOIN fichas AS f
    ON info.id_fichas = f.id
    INNER JOIN user AS u
    ON info.id_user = u.id
    ORDER BY info.id ASC;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_informe_solicitud_user` (IN `_id_user` INT)   BEGIN
	SELECT info.id, info.fecha, info.estado_solicitud, info.estado_entrega, f.numero_ficha, f.cantidad_aprendices, f.nivel_formacion, f.programa_formacion, f.ambiente, u.email, u.nombre, u.apellido
    FROM informe_solicitud AS info
    INNER JOIN fichas AS f
    ON info.id_fichas = f.id
    INNER JOIN user AS u
    ON info.id_user = u.id
    WHERE info.id_user = _id_user
    ORDER BY info.id ASC;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_logueo` (IN `_email` VARCHAR(100))   BEGIN
    IF EXISTS (SELECT * FROM user WHERE email = _email) THEN
        SELECT * FROM user WHERE email = _email;
    ELSEIF EXISTS (SELECT * FROM admin WHERE email = _email) THEN
        SELECT * FROM admin WHERE email = _email;
    END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_user` (IN `_id` INT)   BEGIN
    IF EXISTS (SELECT * FROM user WHERE id = _id) THEN
        SELECT * FROM user WHERE id = _id;
    END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_read_user_ficha` (IN `_id_user` INT)   BEGIN
	SELECT f.*
	FROM user_ficha us 
	INNER JOIN fichas f
	ON f.id = us.id_fichas WHERE us.id_user = _id_user;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_update_cuentas` (IN `_email` VARCHAR(100), IN `_password` VARCHAR(100), IN `_nombre` VARCHAR(50), IN `_apellido` VARCHAR(50), IN `_estado` VARCHAR(20))   BEGIN
    IF EXISTS (SELECT * FROM user WHERE email = _email) THEN
        IF (LENGTH(_password) > 0) THEN
        	UPDATE user SET password = _password WHERE email = _email;
        END IF;
        IF (LENGTH(_nombre) > 0) THEN
        	UPDATE user SET nombre = _nombre WHERE email = _email;
        END IF;
        IF (LENGTH(_apellido) > 0) THEN
        	UPDATE user SET apellido = _apellido WHERE email = _email;
        END IF;
        IF (LENGTH(_estado) > 0) THEN
        	UPDATE user SET estado = _estado WHERE email = _email;
        END IF;
    ELSEIF EXISTS (SELECT * FROM admin WHERE email = _email) THEN
        IF (LENGTH(_password) > 0) THEN
        	UPDATE admin SET password = _password WHERE email = _email;
        END IF;
        IF (LENGTH(_nombre) > 0) THEN
        	UPDATE admin SET nombre = _nombre WHERE email = _email;
        END IF;
        IF (LENGTH(_apellido) > 0) THEN
        	UPDATE admin SET apellido = _apellido WHERE email = _email;
        END IF;
        IF (LENGTH(_estado) > 0) THEN
        	UPDATE admin SET estado = _estado WHERE email = _email;
        END IF;
    END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_update_fichas` (IN `_id` INT, IN `_numero_ficha` INT, IN `_cantidad_aprendices` INT, IN `_nivel_formacion` VARCHAR(50), IN `_programa_formacion` VARCHAR(50), IN `_ambiente` VARCHAR(50), IN `_estado` VARCHAR(20))   BEGIN
	IF (LENGTH(_numero_ficha) > 0) THEN
    	UPDATE fichas SET numero_ficha = _numero_ficha WHERE id = _id;
    END IF;
	IF (LENGTH(_cantidad_aprendices) > 0) THEN
    	UPDATE fichas SET cantidad_aprendices = _cantidad_aprendices WHERE id = _id;
    END IF;
    IF (LENGTH(_nivel_formacion) > 0) THEN
    	UPDATE fichas SET nivel_formacion = _nivel_formacion WHERE id = _id;
    END IF;
    IF (LENGTH(_programa_formacion) > 0) THEN
    	UPDATE fichas SET programa_formacion = _programa_formacion WHERE id = _id;
    END IF;
    IF (LENGTH(_ambiente) > 0) THEN
    	UPDATE fichas SET ambiente = _ambiente WHERE id = _id;
    END IF;
    IF (LENGTH(_estado) > 0) THEN
    	UPDATE fichas SET estado = _estado WHERE id = _id;
    END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_update_herramienta` (IN `_id` INT(10), IN `_nombre_herramienta` VARCHAR(100), IN `_imagen` LONGBLOB, IN `_descripcion` VARCHAR(500), IN `_cantidad_disponible` INT, IN `_cantidad_total` INT, IN `_referencia` VARCHAR(100), IN `_id_admin` INT(10))   BEGIN
        IF (LENGTH(_nombre_herramienta) > 0) THEN
        	UPDATE herramienta SET nombre_herramienta = _nombre_herramienta WHERE id = _id;
        END IF;
        IF (LENGTH(_imagen) > 0) THEN
        	UPDATE herramienta SET imagen = _imagen WHERE id = _id;
        END IF;
        IF (LENGTH(_descripcion) > 0) THEN
        	UPDATE herramienta SET descripcion = _descripcion WHERE id = _id;
        END IF;
        IF (LENGTH(_cantidad_disponible) > 0) THEN
        	UPDATE herramienta SET cantidad_disponible = _cantidad_disponible WHERE id = _id;
        END IF;
        IF (LENGTH(_cantidad_total) > 0) THEN
        	UPDATE herramienta SET cantidad_total = _cantidad_total WHERE id = _id;
        END IF;
        IF (LENGTH(_referencia) > 0) THEN
        	UPDATE herramienta SET referencia = _referencia WHERE id = _id;
        END IF;
        IF (LENGTH(_id_admin) > 0) THEN
        	UPDATE herramienta SET id_admin = _id_admin WHERE id = _id;
        END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_update_herramientas_prestadas` (IN `_id` INT, IN `_estado` VARCHAR(50))   BEGIN
	UPDATE herramientas_prestadas 
    SET estado = _estado 
    WHERE id = _id;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_update_informe_solicitud` (IN `_id` INT, IN `_estado` VARCHAR(20))   BEGIN
	IF(_estado = "aceptado") THEN
    	UPDATE informe_solicitud 
        SET estado_solicitud = _estado, estado_entrega = "en proceso" 
        WHERE id = _id;
    ELSEIF(_estado = "rechazado") THEN
    	UPDATE herramienta AS h
        INNER JOIN carrito_herramienta AS ch
        ON h.id = ch.id_herramienta
        INNER JOIN informe_solicitud AS info
        ON ch.id_carrito = info.id_carrito
        SET h.cantidad_disponible = h.cantidad_disponible + ch.cantidad_herramienta
        WHERE ch.estado = CONCAT("informe ", _id) AND info.id = _id;
    	DELETE FROM informe_solicitud 
        WHERE id = _id;
        DELETE FROM carrito_herramienta 
        WHERE estado = CONCAT("informe ", _id); 
    ELSEIF(_estado = "entregado") THEN
    	UPDATE informe_solicitud 
        SET estado_entrega = _estado 
        WHERE id = _id;
        INSERT INTO herramientas_prestadas(cantidad_prestadas, fecha, id_fichas, id_user, id_herramienta)
		SELECT ch.cantidad_herramienta, curdate(), info.id_fichas, info.id_user, ch.id_herramienta
		FROM informe_solicitud AS info
		JOIN  carrito_herramienta AS ch
        ON ch.id_carrito = info.id_carrito
		WHERE ch.estado = CONCAT("informe ", _id) AND info.id = _id;
    END IF;
END$$

CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` PROCEDURE `sp_update_responsabilidad_herramienta` (IN `_id` INT, IN `_id_user` INT)   BEGIN
	UPDATE herramientas_prestadas 
    SET id_user = _id_user 
    WHERE id = _id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `rol` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'subAdmin',
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `rol`, `email`, `password`, `nombre`, `apellido`, `estado`) VALUES
(1, 'admin', '@admin', '$2b$10$uvfbZuwrYVLRkcyyIFrW..9vGhRC5mjYAO91z6q39O0qF6O1yh3EG', 'Santiago', 'Patiño Hurtado', 'activo'),
(2, 'subAdmin', 'me', '$2b$10$krzcfdmtkMNrFQfkvmIjbuNh9czsx3nRPfCzZI6EwybuF1wzJBNdm', 'me', 'me', 'activo'),
(3, 'subAdmin', 'mari', '$2b$10$lj/I/EX.Qjyr.xPhBIdq1.RnLRf9Ye774ax05o7mp0iwL0.XJiEQ.', 'mari', 'mari', 'activo'),
(4, 'subAdmin', 'marii@gmail.com', '$2b$10$rKMxWH75iKdS1WX5jccKsOjBlEUtxMcQKjwhLiSgq8u3sZ1bEuhH6', 'mari', 'castaño', 'activo');

-- --------------------------------------------------------

--
-- Table structure for table `carrito`
--

CREATE TABLE `carrito` (
  `id` int NOT NULL,
  `cantidad_total` int NOT NULL DEFAULT '0',
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `carrito`
--

INSERT INTO `carrito` (`id`, `cantidad_total`, `id_user`) VALUES
(1, 0, 1),
(2, 0, 2),
(3, 0, 3),
(4, 0, 4),
(5, 0, 5),
(6, 0, 6),
(7, 0, 8),
(8, 0, 9),
(9, 0, 10),
(10, 0, 11),
(11, 0, 12),
(12, 0, 13),
(13, 0, 14),
(14, 0, 16),
(15, 0, 17),
(16, 0, 18),
(17, 0, 20),
(18, 0, 21),
(19, 0, 22),
(20, 0, 23),
(21, 0, 24),
(22, 0, 26),
(23, 0, 27),
(24, 0, 28);

-- --------------------------------------------------------

--
-- Table structure for table `carrito_herramienta`
--

CREATE TABLE `carrito_herramienta` (
  `id` int NOT NULL,
  `cantidad_herramienta` int NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'carrito',
  `id_herramienta` int NOT NULL,
  `id_carrito` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `carrito_herramienta`
--

INSERT INTO `carrito_herramienta` (`id`, `cantidad_herramienta`, `estado`, `id_herramienta`, `id_carrito`) VALUES
(1, 47, 'informe 1', 2, 2),
(2, 4, 'informe 1', 5, 2),
(3, 2, 'informe 2', 2, 8),
(4, 5, 'informe 2', 4, 8),
(5, 2, 'informe 3', 8, 9),
(6, 5, 'informe 4', 10, 1);

--
-- Triggers `carrito_herramienta`
--
DELIMITER $$
CREATE TRIGGER `after_delete_carrito_herramienta_trigger` AFTER DELETE ON `carrito_herramienta` FOR EACH ROW BEGIN
	UPDATE carrito AS c
	SET c.cantidad_total = COALESCE(
    (SELECT SUM(ch.cantidad_herramienta)
    FROM carrito_herramienta AS ch 
    WHERE ch.id_carrito = c.id AND ch.estado = "carrito"), 0);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_carrito_herramienta_trigger` AFTER INSERT ON `carrito_herramienta` FOR EACH ROW BEGIN
	UPDATE carrito AS c
	SET c.cantidad_total = COALESCE(
    (SELECT SUM(ch.cantidad_herramienta)
    FROM carrito_herramienta AS ch 
    WHERE ch.id_carrito = c.id AND ch.estado = "carrito"), 0);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_carrito_herramienta_trigger` AFTER UPDATE ON `carrito_herramienta` FOR EACH ROW BEGIN
	UPDATE carrito AS c
	SET c.cantidad_total = COALESCE(
    (SELECT SUM(ch.cantidad_herramienta)
    FROM carrito_herramienta AS ch 
    WHERE ch.id_carrito = c.id AND ch.estado = "carrito"), 0);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `cuentas_eliminadas`
--

CREATE TABLE `cuentas_eliminadas` (
  `id` int NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'activo',
  `id_user` int NOT NULL,
  `id_admin` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `cuentas_eliminadas`
--

INSERT INTO `cuentas_eliminadas` (`id`, `fecha`, `estado`, `id_user`, `id_admin`) VALUES
(1, '2024-07-17', 'activo', 2, 1),
(3, '2024-07-17', 'activo', 5, 1),
(4, '2024-07-17', 'activo', 6, 1),
(5, '2024-07-17', 'activo', 8, 1);

--
-- Triggers `cuentas_eliminadas`
--
DELIMITER $$
CREATE TRIGGER `after_insert_eliminar_cuenta_trigger` AFTER INSERT ON `cuentas_eliminadas` FOR EACH ROW BEGIN
	IF(NEW.estado = "activo") THEN
    	UPDATE user SET estado = "inactivo" WHERE id = NEW.id_user;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_delete_recuperar_cuenta_trigger` BEFORE DELETE ON `cuentas_eliminadas` FOR EACH ROW BEGIN
	UPDATE user SET estado = "activo" WHERE id = OLD.id_user;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `fichas`
--

CREATE TABLE `fichas` (
  `id` int NOT NULL,
  `numero_ficha` int NOT NULL,
  `cantidad_aprendices` int NOT NULL,
  `nivel_formacion` varchar(50) NOT NULL,
  `programa_formacion` varchar(50) NOT NULL,
  `ambiente` varchar(50) NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `fichas`
--

INSERT INTO `fichas` (`id`, `numero_ficha`, `cantidad_aprendices`, `nivel_formacion`, `programa_formacion`, `ambiente`, `estado`) VALUES
(1, 2696118, 24, 'tecnologia', 'adso', 'SENA de calatrava', 'activo'),
(2, 2222, 14, 'Tecnico', 'Moda', 'Sena', 'Activo');

-- --------------------------------------------------------

--
-- Table structure for table `formulario_daño_herramienta`
--

CREATE TABLE `formulario_daño_herramienta` (
  `id` int NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'enviado',
  `id_user` int NOT NULL,
  `id_herramienta` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `formulario_daño_herramienta`
--

INSERT INTO `formulario_daño_herramienta` (`id`, `asunto`, `fecha`, `cantidad`, `imagen`, `descripcion`, `estado`, `id_user`, `id_herramienta`) VALUES
(1, 'lo dañe', '2024-07-10', 2, '', 'que me importa', 'enviado', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `formulario_nueva_herramienta`
--

CREATE TABLE `formulario_nueva_herramienta` (
  `id` int NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'enviado',
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `herramienta`
--

CREATE TABLE `herramienta` (
  `id` int NOT NULL,
  `nombre_herramienta` varchar(100) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `cantidad_disponible` int NOT NULL,
  `cantidad_total` int NOT NULL,
  `referencia` varchar(100) NOT NULL,
  `id_admin` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `herramienta`
--

INSERT INTO `herramienta` (`id`, `nombre_herramienta`, `imagen`, `descripcion`, `cantidad_disponible`, `cantidad_total`, `referencia`, `id_admin`) VALUES
(1, 'Guia para la recubridora', 'https://http2.mlstatic.com/D_NQ_NP_923929-MCO46681491389_072021-O.webp', 'La guía de dobladillo dobla para usted un ancho regular de tejido, permitiendo hacer más fácilmente los dobladillos, puños y otros acabados de bordes.', 50, 50, '2423', 1),
(2, 'tijerass', 'https://www.perlesandco.es/images/product/3/3/3/333221_xl1/im-Tijeras-universels-para-tela-26-cm-Easy-Action-Softouch-Fiskars-Blanc-x1.jpg', 'Cortan', 1, 2, '2233', 1),
(3, 'Cinta métrica', 'https://1.bp.blogspot.com/-WnT0GdCVZQA/XwhqPIidIKI/AAAAAAABK2U/yyh22j93C3kQGYVP7FFtiLLNruetsAqeACLcBGAsYHQ/s2048/Dise%25C3%25B1o%2Bsin%2Bt%25C3%25ADtulo%2B%252835%2529.png', 'La cinta métrica es un instrumento ...', 30, 30, '1254', 1),
(4, 'Pie De Guia Para Maquina De Coser Plana Industrial ', 'https://macoser.co/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTQ4NTgwMywicHVyIjoiYmxvYl9pZCJ9fQ==--fe746f1ffb67a139dd1455e0e77e5dfd0a488177/Pie%2012463H1_8.png?locale=es', 'Para realizar pespuntes se utiliza generalmente una guía de puntadas, como un prensatelas con guía de puntadas. Un prensatelas para costura con guía de bordes (a veces llamado prensatelas para dobladillos o prensatelas para unir bordes(Se abre en una pestaña nueva)), se utiliza más cerca de las costuras o a lo largo de los bordes de la tela.', 55, 60, '5647', 1),
(5, 'Alfileres de costura', 'https://m.media-amazon.com/images/I/71BAJmCP1ML._AC_SS450_.jpg', 'Los alfileres de costura son pequeñas clavijas metálicas con cabezas de colores que se utilizan para sujetar las telas en su lugar antes de cocerlas. Son fundamentales para mantener las telas alineadas y evitar que se desplacen durante el proceso de costura. Los alfileres vienen en diferentes longitudes y grosores para adaptarse a diferentes tipos de telas y proyectos.', 41, 45, '5722', 1),
(6, 'Descosedor o desgarrador de costuras', 'https://fddistribuidora.com.mx/wp-content/uploads/2021/09/descoseedores-2.jpg', 'Esta herramienta, también conocida como \"descosedor\" o \"desgarrador de costuras\", es imprescindible para deshacer costuras de manera precisa y rápida. Permite corregir errores de costura, reutilizar telas y realizar ajustes en prendas de forma eficiente. Su punta afilada y pequeña cuchilla facilitan la eliminación de puntadas sin dañar la tela.', 90, 90, '2893', 1),
(7, 'Pie Prensatela Dobladillo Con Guia', 'https://insumostextiles.wordpress.com/wp-content/uploads/2020/06/fullsizerender-32-1.jpg?w=558', 'El pie prensa tela roulotté, también conocido como narrow hemming foot, está diseñado para coser un dobladillo muy fino logrando esconder el orillo de la tela de la misma manera que lo hace un dobladillo con doble vuelta', 40, 40, '8964', 1),
(8, 'Hilos de coser', 'https://5.imimg.com/data5/CL/BV/TC/SELLER-38015944/synthetic-blended-yarn-500x500.jpg', 'Los hilos de coser son elementos básicos en cualquier proyecto de costura, ya que se utilizan para unir las telas y crear costuras resistentes. Están disponibles en una amplia variedad de colores, grosores y materiales para adaptarse a diferentes tipos de telas y proyectos. Elegir el hilo adecuado es crucial para lograr costuras duraderas y de calidad en tus prendas.', 18, 20, '3003', 1),
(9, 'Agujas de mano', 'https://static.compreloadomicilio.com/sidcomp/products/02/638a2b878fbdc603028484.webp', 'Las agujas de mano son herramientas indispensables para realizar costuras a mano y para detalles finos en la confección de prendas. Vienen en diferentes tamaños y grosores para adaptarse a diferentes tipos de telas y técnicas de costura. Es importante utilizar la aguja adecuada para cada tipo de tela y proyecto para obtener resultados óptimos.', 55, 55, '5412', 1),
(10, 'Regla de costura', 'https://m.media-amazon.com/images/I/71CN0HOU5kL._AC_SS450_.jpg', 'La regla de costura es una herramienta plana y recta utilizada para trazar líneas rectas, medir patrones y marcar telas con precisión. Es esencial para obtener cortes exactos y costuras bien alineadas en tus proyectos de costura. La regla de costura suele estar marcada con medidas estándar en pulgadas y centímetros para facilitar la medición y el trazado de patrones.', 25, 30, '1234', 1),
(11, 'Jaboncillo de sastre', 'https://www.pontejos.com/74439-thickbox_default/jaboncillo-de-sastre-clover.jpg', 'El jaboncillo de sastre es un utensilio utilizado para marcar telas temporalmente con líneas que se borran fácilmente. Permite realizar marcas precisas en las telas sin dañarlas, lo que es útil para trazar patrones, marcar dobleces y coser con precisión. El jaboncillo de sastre suele estar hecho de tiza o cera y es una herramienta versátil en la confección de prendas.', 90, 90, '2234', 1);

-- --------------------------------------------------------

--
-- Table structure for table `herramientas_prestadas`
--

CREATE TABLE `herramientas_prestadas` (
  `id` int NOT NULL,
  `cantidad_prestadas` int NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'en uso',
  `id_fichas` int NOT NULL,
  `id_user` int NOT NULL,
  `id_herramienta` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `herramientas_prestadas`
--

INSERT INTO `herramientas_prestadas` (`id`, `cantidad_prestadas`, `fecha`, `estado`, `id_fichas`, `id_user`, `id_herramienta`) VALUES
(1, 47, '2024-07-10', 'en uso', 2, 2, 2),
(2, 4, '2024-07-10', 'en uso', 2, 2, 5);

--
-- Triggers `herramientas_prestadas`
--
DELIMITER $$
CREATE TRIGGER `after_insert_herramientas_prestadas_trigger` AFTER INSERT ON `herramientas_prestadas` FOR EACH ROW BEGIN
	INSERT INTO reportes_prestamos(fecha, descripcion, id_herramientas_prestadas)
    VALUES(curdate(), "Este reporte se genera con la idea de que te mantengas informado de todas las herramientas que estan prestadas hasta este momento.", new.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_herramientas_prestadas_trigger` AFTER UPDATE ON `herramientas_prestadas` FOR EACH ROW BEGIN
	IF(new.estado = "devuelto") THEN
    	DELETE FROM reportes_prestamos 
        WHERE id_herramientas_prestadas = new.id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `informe_solicitud`
--

CREATE TABLE `informe_solicitud` (
  `id` int NOT NULL,
  `fecha` date NOT NULL,
  `estado_solicitud` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'en proceso',
  `estado_entrega` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_fichas` int NOT NULL,
  `id_user` int NOT NULL,
  `id_carrito` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `informe_solicitud`
--

INSERT INTO `informe_solicitud` (`id`, `fecha`, `estado_solicitud`, `estado_entrega`, `id_fichas`, `id_user`, `id_carrito`) VALUES
(1, '2024-07-10', 'aceptado', 'entregado', 2, 2, 2),
(2, '2024-07-16', 'en proceso', NULL, 2, 9, 8),
(3, '2024-07-17', 'en proceso', NULL, 2, 10, 9),
(4, '2024-07-17', 'aceptado', 'en proceso', 2, 1, 1),
(5, '2024-07-17', 'en proceso', NULL, 1, 1, 1);

--
-- Triggers `informe_solicitud`
--
DELIMITER $$
CREATE TRIGGER `after_insert_informe_solicitud_trigger` AFTER INSERT ON `informe_solicitud` FOR EACH ROW BEGIN
	UPDATE carrito_herramienta 
    SET estado = CONCAT("informe ", new.id) 
    WHERE id_carrito = new.id_carrito AND estado = "carrito";
    UPDATE herramienta AS h
    INNER JOIN carrito_herramienta AS ch
    ON ch.id_herramienta = h.id
    SET h.cantidad_disponible = h.cantidad_disponible - ch.cantidad_herramienta
    WHERE ch.estado = CONCAT("informe ", new.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `reportes_daños_herramientas`
--

CREATE TABLE `reportes_daños_herramientas` (
  `id` int NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `id_formulario_daño_herramienta` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `reportes_prestamos`
--

CREATE TABLE `reportes_prestamos` (
  `id` int NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `id_herramientas_prestadas` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `reportes_prestamos`
--

INSERT INTO `reportes_prestamos` (`id`, `fecha`, `descripcion`, `id_herramientas_prestadas`) VALUES
(1, '2024-07-10', 'Este reporte se genera con la idea de que te mantengas informado de todas las herramientas que estan prestadas hasta este momento.', 1),
(2, '2024-07-10', 'Este reporte se genera con la idea de que te mantengas informado de todas las herramientas que estan prestadas hasta este momento.', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `nombre`, `apellido`, `estado`) VALUES
(1, 'mi@', '$2b$10$oTHMY79GSAYVa9iO8NcdVeKMw9gNzFdrsAZKeiHPK03qLwRry7q2S', 'mi', 'mi', 'activo'),
(2, 'becerra@becerra', '$2b$10$06SP8FRi4TQj1Nim/U2/aOCZVuQFkfJpJwadtmojmDmbaz.HtXMl.', 'becerra', 'becerra', 'inactivo'),
(3, 'pipepadilla.arrubla@gmail.com', '$2b$10$UVwll46zOf7.8K87LBG0XejRNgpbUa9J7VY.ROhQzhqHh0UwlGKVi', 'juan', 'padilla', 'activo'),
(4, 'santipahur@gmail.com', '$2b$10$lLn2IZ0NgDrPusPtIfiJ8.RyzfX0yBMK6YllN.8PnNpd18EK1EikC', 'Santiago', 'Patiño', 'activo'),
(5, 's@asd.com', '$2b$10$aAikIpPMNt0B/HLYlPQdc./2L9gTYcbyzvPTqF0wfAzZiawAWaaiK', 'adasd', 'asdasda', 'inactivo'),
(6, 's@santi.com', '$2b$10$31lH1UluWaBv0JRaxJtJx.bZW96r9nT/sarnPMtyAS9g0gqqUg4EK', 'ads', 'asdasd', 'inactivo'),
(8, 'santahur@gmail.com', '$2b$10$6bcpeiuy.0jJwsns/E3vkuqooNAOFyUzcaxTMgQpM8mnrg.3AJgl6', 'Santiago', 'Patiño Hurtado', 'inactivo'),
(9, 'mari@gmail.com', '$2b$10$vxa8JLhs2j2KM19yqVkeoeGOO3GT18oWXbHo6fwsCXy9Pu5qWOHzG', 'marithza', 'casta', 'activo'),
(10, 'f@gmail.com', '$2b$10$4GvcjOGlimiNNfjcVGcy9OTgkHLh/wAJlMPai1HyQA6owz5y1HATW', 'f', 'f', 'activo'),
(11, 'santiago@becerra.org', '$2b$10$DF.mcgxmG3REkPkC/Bnho.YA3DMYKBXeuHX.s0Y7AeFIUtptQBlT2', 'becerra1', 'becerra1', 'activo'),
(12, 'santi@gmail.com', '$2b$10$tKiWUGgpgtrvzNt100bk1OvgZzK9smjHrc/DiGStw/tjq0z4lAeU6', 'sant', 'sant', 'activo'),
(13, 'ma@gmail.com', '$2b$10$tWGPC75MdcDTt35zfnlr2udrMgThizrhsKeIijTYJNJdWJVZEl.Ty', 'ma', 'ma', 'activo'),
(14, 'mari@gm.com', '$2b$10$vdKrezg4yPZKvsRr4xt4jOSK05NsmGX8AUbPisWSIOrUeLYkSZMo.', 'ma', 'ma', 'activo'),
(16, 'maaa@gmail.com', '$2b$10$7szObRHTacJFWcIbhu7bauLgOKCAJcVU.dz1MjdFH4ugE26jNefrq', 'ma', 'ma', 'activo'),
(17, 'w@gmail.com', '$2b$10$c51NY47aa.SLKtxRfXrFIeZuCzXSqYQvTcSK/Xk5PrpqRDtEbCN76', 'www', 'www', 'activo'),
(18, 'jhv@sik.com', '$2b$10$jChfj/CmRaucBtn1dhLD8OZj95B0btFMUYUTQQpZvRTIYA27hHuF2', 'jh', 'nhnhv', 'activo'),
(20, 'masss@gmail.com', '$2b$10$TPnbpg4RNh7VFkybdrlcP.7G635XhCfQKfLX6sy3DWG8SKrwgydvi', 'ma', 'ma', 'activo'),
(21, 'sadasd@sadas.com', '$2b$10$VZVcSB193T6UD5NWMdFB5e8Zzv8IMwF7749Q/KGfwcfbsneRZPJyK', 'asdlkhaskd', 'ashdla', 'activo'),
(22, 'ma@gmail.co1', '$2b$10$X08xE/zAaVM5mvzpCX/B6OZvWo14YJCn6Yy/e72rio3AujNtw2EZq', 'ma', 'me', 'activo'),
(23, 's@gmail.com', '$2b$10$4EOUnXO8pW3pdO4CGAdbGOpYHihVMA.dOZ8pxR4fcP9SXBGBqHCZu', 'sa', 'sa', 'activo'),
(24, 'santii@gmail.com', '$2b$10$Vu/Kw5DolFtMbokOU6K9PeOon6OYp5KHZwnfF8NklvlxV0sOkpESK', 's', 'w', 'activo'),
(26, 'maq@gmail.com', '$2b$10$D2LUfDCrTh5wLzsJk8P0Neh3hNrzHC3fWJSGerYpuVtM7s8h468IO', 'ma', 'ma', 'activo'),
(27, 'ma@hotmail.com', '$2b$10$tWbVLr9trcuVgRI7W5fx5u6BcX7kj826XH9HQ/EmYl4mrztxSdJGW', 'ma', 'ma', 'activo'),
(28, 'becerra@gmail.com', '$2b$10$9jRlyqyosl1UkXGKVB3lc.UZi8QyJv/TC5di8MvqSZMAx9.6/ZM1u', 'becerra', 'becerra', 'activo');

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `after_insert_user_trigger` AFTER INSERT ON `user` FOR EACH ROW BEGIN
	IF NOT EXISTS(SELECT * FROM carrito WHERE id_user = new.id) THEN
		INSERT INTO carrito(id_user) VALUES (new.id);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_ficha`
--

CREATE TABLE `user_ficha` (
  `id` int NOT NULL,
  `id_fichas` int NOT NULL,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_carrito_id_user` (`id_user`);

--
-- Indexes for table `carrito_herramienta`
--
ALTER TABLE `carrito_herramienta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_carrito_herramienta_id_herramienta` (`id_herramienta`),
  ADD KEY `fk_carrito_herramienta_id_carrito` (`id_carrito`);

--
-- Indexes for table `cuentas_eliminadas`
--
ALTER TABLE `cuentas_eliminadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cuentas_eliminadas_id_user` (`id_user`),
  ADD KEY `fk_cuentas_eliminadas_id_admin` (`id_admin`);

--
-- Indexes for table `fichas`
--
ALTER TABLE `fichas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_ficha` (`numero_ficha`);

--
-- Indexes for table `formulario_daño_herramienta`
--
ALTER TABLE `formulario_daño_herramienta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_formulario_daño_herramienta_id_user` (`id_user`),
  ADD KEY `fk_formulario_daño_herramienta_id_herramienta` (`id_herramienta`);

--
-- Indexes for table `formulario_nueva_herramienta`
--
ALTER TABLE `formulario_nueva_herramienta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_formulario_nueva_herramienta_id_user` (`id_user`);

--
-- Indexes for table `herramienta`
--
ALTER TABLE `herramienta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_herramienta_id_admin` (`id_admin`);

--
-- Indexes for table `herramientas_prestadas`
--
ALTER TABLE `herramientas_prestadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_herramientas_prestadas_id_fichas` (`id_fichas`),
  ADD KEY `fk_herramientas_prestadas_id_user` (`id_user`),
  ADD KEY `fk_herramientas_prestadas_id_herramienta` (`id_herramienta`);

--
-- Indexes for table `informe_solicitud`
--
ALTER TABLE `informe_solicitud`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_informe_solicitud_id_fichas` (`id_fichas`),
  ADD KEY `fk_informe_solicitud_id_user` (`id_user`),
  ADD KEY `fk_informe_solicitud_id_carrito` (`id_carrito`);

--
-- Indexes for table `reportes_daños_herramientas`
--
ALTER TABLE `reportes_daños_herramientas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reportes_daños_herramientas_id_formulario_daño_herramienta` (`id_formulario_daño_herramienta`);

--
-- Indexes for table `reportes_prestamos`
--
ALTER TABLE `reportes_prestamos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reportes_prestamos_id_herramientas_prestadas` (`id_herramientas_prestadas`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_ficha`
--
ALTER TABLE `user_ficha`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_ficha_id_fichas` (`id_fichas`),
  ADD KEY `fk_user_ficha_id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `carrito_herramienta`
--
ALTER TABLE `carrito_herramienta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cuentas_eliminadas`
--
ALTER TABLE `cuentas_eliminadas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `fichas`
--
ALTER TABLE `fichas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `formulario_daño_herramienta`
--
ALTER TABLE `formulario_daño_herramienta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `formulario_nueva_herramienta`
--
ALTER TABLE `formulario_nueva_herramienta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `herramienta`
--
ALTER TABLE `herramienta`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `herramientas_prestadas`
--
ALTER TABLE `herramientas_prestadas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `informe_solicitud`
--
ALTER TABLE `informe_solicitud`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reportes_daños_herramientas`
--
ALTER TABLE `reportes_daños_herramientas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reportes_prestamos`
--
ALTER TABLE `reportes_prestamos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user_ficha`
--
ALTER TABLE `user_ficha`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `fk_carrito_id_user	` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carrito_herramienta`
--
ALTER TABLE `carrito_herramienta`
  ADD CONSTRAINT `fk_carrito_herramienta_id_carrito` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_carrito_herramienta_id_herramienta` FOREIGN KEY (`id_herramienta`) REFERENCES `herramienta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cuentas_eliminadas`
--
ALTER TABLE `cuentas_eliminadas`
  ADD CONSTRAINT `fk_cuentas_eliminadas_id_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cuentas_eliminadas_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `formulario_daño_herramienta`
--
ALTER TABLE `formulario_daño_herramienta`
  ADD CONSTRAINT `fk_formulario_daño_herramienta_id_herramienta` FOREIGN KEY (`id_herramienta`) REFERENCES `herramienta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_formulario_daño_herramienta_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `formulario_nueva_herramienta`
--
ALTER TABLE `formulario_nueva_herramienta`
  ADD CONSTRAINT `fk_formulario_nueva_herramienta_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `herramienta`
--
ALTER TABLE `herramienta`
  ADD CONSTRAINT `fk_herramienta_id_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `herramientas_prestadas`
--
ALTER TABLE `herramientas_prestadas`
  ADD CONSTRAINT `fk_herramientas_prestadas_id_fichas` FOREIGN KEY (`id_fichas`) REFERENCES `fichas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_herramientas_prestadas_id_herramienta` FOREIGN KEY (`id_herramienta`) REFERENCES `herramienta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_herramientas_prestadas_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `informe_solicitud`
--
ALTER TABLE `informe_solicitud`
  ADD CONSTRAINT `fk_informe_solicitud_id_carrito` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_informe_solicitud_id_fichas` FOREIGN KEY (`id_fichas`) REFERENCES `fichas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_informe_solicitud_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reportes_daños_herramientas`
--
ALTER TABLE `reportes_daños_herramientas`
  ADD CONSTRAINT `fk_reportes_daños_herramientas_id_formulario_daño_herramienta` FOREIGN KEY (`id_formulario_daño_herramienta`) REFERENCES `formulario_daño_herramienta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reportes_prestamos`
--
ALTER TABLE `reportes_prestamos`
  ADD CONSTRAINT `fk_reportes_prestamos_id_herramientas_prestadas` FOREIGN KEY (`id_herramientas_prestadas`) REFERENCES `herramientas_prestadas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_ficha`
--
ALTER TABLE `user_ficha`
  ADD CONSTRAINT `fk_user_ficha_id_fichas` FOREIGN KEY (`id_fichas`) REFERENCES `fichas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_ficha_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`udvkxnqxrkypeqxv`@`%` EVENT `evt_eliminar_cuentas_delete` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-16 00:00:00' ON COMPLETION PRESERVE ENABLE DO DELETE u
FROM user AS u
INNER JOIN cuentas_eliminadas AS ce ON u.id = ce.id_user
WHERE ce.estado = "activo" AND DATEDIFF(curdate(), ce.fecha) >= 30$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
