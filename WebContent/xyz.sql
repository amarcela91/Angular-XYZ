-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2017 a las 00:41:59
-- Versión del servidor: 5.7.11
-- Versión de PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `xyz`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `Cedula` varchar(15) NOT NULL,
  `Nombres` varchar(30) NOT NULL,
  `Apellidos` varchar(30) NOT NULL,
  `Email` varchar(120) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Direccion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`Cedula`, `Nombres`, `Apellidos`, `Email`, `Telefono`, `Direccion`) VALUES
('1029001659', 'Marcela', 'Londono', 'nana@gmail.com', '3135490088', 'Calle alegre'),
('99999999', 'Edison', 'Sierra', 'eSierra@gmail.com', '3819077', 'Calle hermosa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `Codigo` int(12) NOT NULL,
  `Pregunta1` tinyint(1) NOT NULL,
  `Pregunta2` tinyint(1) NOT NULL,
  `Pregunta3` tinyint(1) NOT NULL,
  `Pregunta4` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`Codigo`, `Pregunta1`, `Pregunta2`, `Pregunta3`, `Pregunta4`) VALUES
(1, 10, 9, 8, 10),
(2, 10, 5, 9, 10),
(3, 7, 10, 9, 7),
(4, 7, 10, 9, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peticiones`
--

CREATE TABLE `peticiones` (
  `Codigo` int(12) NOT NULL,
  `Texto` varchar(120) NOT NULL,
  `Cliente` varchar(15) NOT NULL,
  `FechaCreacion` date NOT NULL,
  `Resuelto` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `peticiones`
--

INSERT INTO `peticiones` (`Codigo`, `Texto`, `Cliente`, `FechaCreacion`, `Resuelto`) VALUES
(1, 'La presente es para solicitar una explicación sobre', '1029001659', '2017-04-29', 0),
(2, 'La presente es para solicitar un cambio en ', '99999999', '2017-05-29', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `Codigo` varchar(4) NOT NULL,
  `Nombre` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`Codigo`, `Nombre`) VALUES
('EMP', 'Empleado'),
('ENC', 'Encargado'),
('GRT', 'Gerente'),
('USR', 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Login` varchar(20) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Contrasena` varchar(50) NOT NULL,
  `Rol` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Login`, `Nombres`, `Apellidos`, `Contrasena`, `Rol`) VALUES
('Empleado1', 'Cualquier', 'Fulano', 'FC0928466fb498920b3a1', 'EMP'),
('Encargado', 'Jesus', 'Velasquez', 'JEUZSqpfHIRuolU3RWjz4OA', 'ENC'),
('Gerente', 'Adriana', 'Guzman', 'A8aRrCgMNPkisdUfL8w5HA', 'GRT');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`Cedula`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`Codigo`);

--
-- Indices de la tabla `peticiones`
--
ALTER TABLE `peticiones`
  ADD PRIMARY KEY (`Codigo`,`Cliente`),
  ADD KEY `Codigo` (`Codigo`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Codigo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Login`),
  ADD KEY `Rol` (`Rol`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`Rol`) REFERENCES `roles` (`Codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
