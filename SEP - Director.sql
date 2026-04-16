CREATE TABLE `Usuarios` (
  `id` uuid PRIMARY KEY,
  `nombre` varchar(100),
  `correo` varchar(100) UNIQUE,
  `contra` varchar(255),
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Escuela` (
  `id` uuid PRIMARY KEY,
  `nombre` varchar(100),
  `clave` varchar(10) UNIQUE,
  `zona_escolar` varchar(5),
  `nivel` varchar(10),
  `num_tel` varchar(10),
  `correo` varchar(50),
  `domicilio` varchar(255),
  `localidad` varchar(50),
  `municipio` varchar(50),
  `estado` varchar(50),
  `codigo_postal` varchar(5),
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Ciclo` (
  `id` uuid PRIMARY KEY,
  `id_plan` uuid,
  `id_esc` uuid,
  `nombre` varchar(20),
  `f_inicio` date,
  `f_fin` date,
  `activo` boolean DEFAULT false,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Turnos` (
  `id` uuid PRIMARY KEY,
  `id_esc` uuid,
  `nombre` varchar(25),
  `desc` text,
  `h_inicio` time,
  `h_fin` time,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Plan_estudios` (
  `id` uuid PRIMARY KEY,
  `nombre` varchar(20),
  `desc` text,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Grados` (
  `id` uuid PRIMARY KEY,
  `id_plan` uuid,
  `nombre` varchar(25),
  `numero` int,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Materias` (
  `id` uuid PRIMARY KEY,
  `id_plan` uuid,
  `nombre` varchar(100),
  `desc` text,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Materia_Grado` (
  `id` uuid PRIMARY KEY,
  `id_materia` uuid,
  `id_grado` uuid,
  `horas_sem` int
);

CREATE TABLE `Grupos` (
  `id` uuid PRIMARY KEY,
  `id_esc` uuid,
  `id_grado` uuid,
  `id_turno` uuid,
  `nombre` varchar(5),
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Persona` (
  `id` uuid PRIMARY KEY,
  `nombre` varchar(50),
  `app_p` varchar(50),
  `app_m` varchar(50),
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Persona_direc` (
  `id` uuid PRIMARY KEY,
  `id_persona` uuid,
  `calle1` varchar(100),
  `calle2` varchar(100),
  `refer` text,
  `colonia` varchar(100),
  `cod_post` varchar(5),
  `ciudad` varchar(50),
  `estado` varchar(50),
  `pais` varchar(50),
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Persona_contact` (
  `id` uuid PRIMARY KEY,
  `id_persona` uuid,
  `num_tel1` varchar(10),
  `num_tel2` varchar(10),
  `correo` varchar(50),
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Empleado` (
  `id` uuid PRIMARY KEY,
  `id_persona` uuid,
  `id_esc` uuid,
  `num_control` varchar(20),
  `rfc` varchar(13) UNIQUE,
  `curp` varchar(18) UNIQUE,
  `lugar_nac` varchar(150),
  `estado_civil` varchar(20),
  `f_ingreso` date,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Cobertura` (
  `id` uuid PRIMARY KEY,
  `id_empleado_titular` uuid,
  `id_empleado_cubre` uuid,
  `num_control_temp` varchar(20),
  `f_inicio` date,
  `f_fin` date,
  `motivo` text,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Rol_Empleado` (
  `id` uuid PRIMARY KEY,
  `nombre` varchar(25),
  `desc` text,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Empleado_Rol` (
  `id` uuid PRIMARY KEY,
  `id_empleado` uuid,
  `id_rol` uuid,
  `f_inicio` date,
  `f_fin` date,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Preparacion_Prof` (
  `id` uuid PRIMARY KEY,
  `id_empleado` uuid UNIQUE,
  `estudios_prof` varchar(200),
  `escuela_realiz` varchar(200),
  `tipo_estudio` varchar(20),
  `ultimo_grado` varchar(100),
  `institucion` varchar(200),
  `especialidades` text,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Nombramiento` (
  `id` uuid PRIMARY KEY,
  `nombre` varchar(100),
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Plaza` (
  `id` uuid PRIMARY KEY,
  `id_empleado` uuid,
  `id_nombramiento` uuid,
  `id_materia` uuid,
  `id_esc` uuid,
  `codigo_plaza` varchar(30),
  `horas_clase` int,
  `horas_descarga` int,
  `horas_fortalec` int,
  `func_descarga` text,
  `evaluado` varchar(255),
  `observaciones` text,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Plaza_Grupo` (
  `id` uuid PRIMARY KEY,
  `id_plaza` uuid,
  `id_grupo` uuid
);

CREATE TABLE `Trabajo_Externo` (
  `id` uuid PRIMARY KEY,
  `id_empleado` uuid,
  `institucion` varchar(200),
  `horas` int,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Horario_Slot` (
  `id` uuid PRIMARY KEY,
  `id_empleado` uuid,
  `id_grupo` uuid,
  `id_materia` uuid,
  `dia_semana` varchar(10),
  `h_inicio` time,
  `h_fin` time,
  `activo` boolean DEFAULT true,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Estadistica_Alumnos` (
  `id` uuid PRIMARY KEY,
  `id_ciclo` uuid,
  `id_grupo` uuid,
  `insc_h` int DEFAULT 0,
  `insc_m` int DEFAULT 0,
  `altas_h` int DEFAULT 0,
  `altas_m` int DEFAULT 0,
  `bajas_h` int DEFAULT 0,
  `bajas_m` int DEFAULT 0,
  `aprob_todos_h` int,
  `aprob_todos_m` int,
  `reprob_h` int,
  `reprob_m` int,
  `repetidores_h` int,
  `repetidores_m` int,
  `f_cre` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE TABLE `Padron` (
  `id` uuid PRIMARY KEY,
  `id_ciclo` uuid,
  `status` varchar(20) DEFAULT 'borrador',
  `f_gen` timestamp DEFAULT (now()),
  `f_mod` timestamp
);

CREATE UNIQUE INDEX `Materia_Grado_index_0` ON `Materia_Grado` (`id_materia`, `id_grado`);

CREATE INDEX `Cobertura_index_1` ON `Cobertura` (`id_empleado_cubre`, `activo`);

CREATE UNIQUE INDEX `Empleado_Rol_index_2` ON `Empleado_Rol` (`id_empleado`, `id_rol`, `f_inicio`);

CREATE UNIQUE INDEX `Plaza_Grupo_index_3` ON `Plaza_Grupo` (`id_plaza`, `id_grupo`);

CREATE UNIQUE INDEX `Estadistica_Alumnos_index_4` ON `Estadistica_Alumnos` (`id_ciclo`, `id_grupo`);

ALTER TABLE `Ciclo` ADD FOREIGN KEY (`id_plan`) REFERENCES `Plan_estudios` (`id`);

ALTER TABLE `Ciclo` ADD FOREIGN KEY (`id_esc`) REFERENCES `Escuela` (`id`);

ALTER TABLE `Turnos` ADD FOREIGN KEY (`id_esc`) REFERENCES `Escuela` (`id`);

ALTER TABLE `Grados` ADD FOREIGN KEY (`id_plan`) REFERENCES `Plan_estudios` (`id`);

ALTER TABLE `Materias` ADD FOREIGN KEY (`id_plan`) REFERENCES `Plan_estudios` (`id`);

ALTER TABLE `Materia_Grado` ADD FOREIGN KEY (`id_materia`) REFERENCES `Materias` (`id`);

ALTER TABLE `Materia_Grado` ADD FOREIGN KEY (`id_grado`) REFERENCES `Grados` (`id`);

ALTER TABLE `Grupos` ADD FOREIGN KEY (`id_esc`) REFERENCES `Escuela` (`id`);

ALTER TABLE `Grupos` ADD FOREIGN KEY (`id_grado`) REFERENCES `Grados` (`id`);

ALTER TABLE `Grupos` ADD FOREIGN KEY (`id_turno`) REFERENCES `Turnos` (`id`);

ALTER TABLE `Persona_direc` ADD FOREIGN KEY (`id_persona`) REFERENCES `Persona` (`id`);

ALTER TABLE `Persona_contact` ADD FOREIGN KEY (`id_persona`) REFERENCES `Persona` (`id`);

ALTER TABLE `Empleado` ADD FOREIGN KEY (`id_persona`) REFERENCES `Persona` (`id`);

ALTER TABLE `Empleado` ADD FOREIGN KEY (`id_esc`) REFERENCES `Escuela` (`id`);

ALTER TABLE `Cobertura` ADD FOREIGN KEY (`id_empleado_titular`) REFERENCES `Empleado` (`id`);

ALTER TABLE `Cobertura` ADD FOREIGN KEY (`id_empleado_cubre`) REFERENCES `Empleado` (`id`);

ALTER TABLE `Empleado_Rol` ADD FOREIGN KEY (`id_empleado`) REFERENCES `Empleado` (`id`);

ALTER TABLE `Empleado_Rol` ADD FOREIGN KEY (`id_rol`) REFERENCES `Rol_Empleado` (`id`);

ALTER TABLE `Preparacion_Prof` ADD FOREIGN KEY (`id_empleado`) REFERENCES `Empleado` (`id`);

ALTER TABLE `Plaza` ADD FOREIGN KEY (`id_empleado`) REFERENCES `Empleado` (`id`);

ALTER TABLE `Plaza` ADD FOREIGN KEY (`id_nombramiento`) REFERENCES `Nombramiento` (`id`);

ALTER TABLE `Plaza` ADD FOREIGN KEY (`id_materia`) REFERENCES `Materias` (`id`);

ALTER TABLE `Plaza` ADD FOREIGN KEY (`id_esc`) REFERENCES `Escuela` (`id`);

ALTER TABLE `Plaza_Grupo` ADD FOREIGN KEY (`id_plaza`) REFERENCES `Plaza` (`id`);

ALTER TABLE `Plaza_Grupo` ADD FOREIGN KEY (`id_grupo`) REFERENCES `Grupos` (`id`);

ALTER TABLE `Trabajo_Externo` ADD FOREIGN KEY (`id_empleado`) REFERENCES `Empleado` (`id`);

ALTER TABLE `Horario_Slot` ADD FOREIGN KEY (`id_empleado`) REFERENCES `Empleado` (`id`);

ALTER TABLE `Horario_Slot` ADD FOREIGN KEY (`id_grupo`) REFERENCES `Grupos` (`id`);

ALTER TABLE `Horario_Slot` ADD FOREIGN KEY (`id_materia`) REFERENCES `Materias` (`id`);

ALTER TABLE `Estadistica_Alumnos` ADD FOREIGN KEY (`id_ciclo`) REFERENCES `Ciclo` (`id`);

ALTER TABLE `Estadistica_Alumnos` ADD FOREIGN KEY (`id_grupo`) REFERENCES `Grupos` (`id`);

ALTER TABLE `Padron` ADD FOREIGN KEY (`id_ciclo`) REFERENCES `Ciclo` (`id`);
