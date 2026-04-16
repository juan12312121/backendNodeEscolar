-- CreateTable
CREATE TABLE `Usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contra` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `refresh_token` VARCHAR(191) NULL,
    `refresh_exp` DATETIME(3) NULL,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuarios_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Escuela` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `clave` VARCHAR(191) NOT NULL,
    `zona_escolar` VARCHAR(191) NULL,
    `nivel` VARCHAR(191) NULL,
    `num_tel` VARCHAR(191) NULL,
    `correo` VARCHAR(191) NULL,
    `domicilio` VARCHAR(191) NULL,
    `localidad` VARCHAR(191) NULL,
    `municipio` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `codigo_postal` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Escuela_clave_key`(`clave`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ciclo` (
    `id` VARCHAR(191) NOT NULL,
    `id_plan` VARCHAR(191) NOT NULL,
    `id_esc` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `f_inicio` DATETIME(3) NULL,
    `f_fin` DATETIME(3) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT false,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Ciclo_id_plan_idx`(`id_plan`),
    INDEX `Ciclo_id_esc_idx`(`id_esc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turnos` (
    `id` VARCHAR(191) NOT NULL,
    `id_esc` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `desc` VARCHAR(191) NULL,
    `h_inicio` DATETIME(3) NULL,
    `h_fin` DATETIME(3) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Turnos_id_esc_idx`(`id_esc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan_estudios` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `desc` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grados` (
    `id` VARCHAR(191) NOT NULL,
    `id_plan` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `numero` INTEGER NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Grados_id_plan_idx`(`id_plan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materias` (
    `id` VARCHAR(191) NOT NULL,
    `id_plan` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `desc` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Materias_id_plan_idx`(`id_plan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia_Grado` (
    `id` VARCHAR(191) NOT NULL,
    `id_materia` VARCHAR(191) NOT NULL,
    `id_grado` VARCHAR(191) NOT NULL,
    `horas_sem` INTEGER NULL,

    UNIQUE INDEX `Materia_Grado_index_0`(`id_materia`, `id_grado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupos` (
    `id` VARCHAR(191) NOT NULL,
    `id_esc` VARCHAR(191) NOT NULL,
    `id_grado` VARCHAR(191) NOT NULL,
    `id_turno` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Grupos_id_esc_idx`(`id_esc`),
    INDEX `Grupos_id_grado_idx`(`id_grado`),
    INDEX `Grupos_id_turno_idx`(`id_turno`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persona` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `app_p` VARCHAR(191) NULL,
    `app_m` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persona_direc` (
    `id` VARCHAR(191) NOT NULL,
    `id_persona` VARCHAR(191) NOT NULL,
    `calle1` VARCHAR(191) NULL,
    `calle2` VARCHAR(191) NULL,
    `refer` VARCHAR(191) NULL,
    `colonia` VARCHAR(191) NULL,
    `cod_post` VARCHAR(191) NULL,
    `ciudad` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `pais` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Persona_direc_id_persona_idx`(`id_persona`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persona_contact` (
    `id` VARCHAR(191) NOT NULL,
    `id_persona` VARCHAR(191) NOT NULL,
    `num_tel1` VARCHAR(191) NULL,
    `num_tel2` VARCHAR(191) NULL,
    `correo` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Persona_contact_id_persona_idx`(`id_persona`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleado` (
    `id` VARCHAR(191) NOT NULL,
    `id_persona` VARCHAR(191) NOT NULL,
    `id_esc` VARCHAR(191) NOT NULL,
    `num_control` VARCHAR(191) NULL,
    `rfc` VARCHAR(191) NOT NULL,
    `curp` VARCHAR(191) NOT NULL,
    `lugar_nac` VARCHAR(191) NULL,
    `estado_civil` VARCHAR(191) NULL,
    `f_ingreso` DATETIME(3) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Empleado_rfc_key`(`rfc`),
    UNIQUE INDEX `Empleado_curp_key`(`curp`),
    INDEX `Empleado_id_persona_idx`(`id_persona`),
    INDEX `Empleado_id_esc_idx`(`id_esc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cobertura` (
    `id` VARCHAR(191) NOT NULL,
    `id_empleado_titular` VARCHAR(191) NOT NULL,
    `id_empleado_cubre` VARCHAR(191) NOT NULL,
    `num_control_temp` VARCHAR(191) NULL,
    `f_inicio` DATETIME(3) NULL,
    `f_fin` DATETIME(3) NULL,
    `motivo` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Cobertura_index_1`(`id_empleado_cubre`, `activo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol_Empleado` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `desc` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleado_Rol` (
    `id` VARCHAR(191) NOT NULL,
    `id_empleado` VARCHAR(191) NOT NULL,
    `id_rol` VARCHAR(191) NOT NULL,
    `f_inicio` DATETIME(3) NULL,
    `f_fin` DATETIME(3) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Empleado_Rol_index_2`(`id_empleado`, `id_rol`, `f_inicio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preparacion_Prof` (
    `id` VARCHAR(191) NOT NULL,
    `id_empleado` VARCHAR(191) NOT NULL,
    `estudios_prof` VARCHAR(191) NULL,
    `escuela_realiz` VARCHAR(191) NULL,
    `tipo_estudio` VARCHAR(191) NULL,
    `ultimo_grado` VARCHAR(191) NULL,
    `institucion` VARCHAR(191) NULL,
    `especialidades` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Preparacion_Prof_id_empleado_key`(`id_empleado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nombramiento` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plaza` (
    `id` VARCHAR(191) NOT NULL,
    `id_empleado` VARCHAR(191) NOT NULL,
    `id_nombramiento` VARCHAR(191) NOT NULL,
    `id_materia` VARCHAR(191) NOT NULL,
    `id_esc` VARCHAR(191) NOT NULL,
    `codigo_plaza` VARCHAR(191) NULL,
    `horas_clase` INTEGER NULL,
    `horas_descarga` INTEGER NULL,
    `horas_fortalec` INTEGER NULL,
    `func_descarga` VARCHAR(191) NULL,
    `evaluado` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Plaza_id_empleado_idx`(`id_empleado`),
    INDEX `Plaza_id_nombramiento_idx`(`id_nombramiento`),
    INDEX `Plaza_id_materia_idx`(`id_materia`),
    INDEX `Plaza_id_esc_idx`(`id_esc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plaza_Grupo` (
    `id` VARCHAR(191) NOT NULL,
    `id_plaza` VARCHAR(191) NOT NULL,
    `id_grupo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Plaza_Grupo_index_3`(`id_plaza`, `id_grupo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trabajo_Externo` (
    `id` VARCHAR(191) NOT NULL,
    `id_empleado` VARCHAR(191) NOT NULL,
    `institucion` VARCHAR(191) NULL,
    `horas` INTEGER NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Trabajo_Externo_id_empleado_idx`(`id_empleado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario_Slot` (
    `id` VARCHAR(191) NOT NULL,
    `id_empleado` VARCHAR(191) NOT NULL,
    `id_grupo` VARCHAR(191) NOT NULL,
    `id_materia` VARCHAR(191) NOT NULL,
    `dia_semana` VARCHAR(191) NULL,
    `h_inicio` DATETIME(3) NULL,
    `h_fin` DATETIME(3) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Horario_Slot_id_empleado_idx`(`id_empleado`),
    INDEX `Horario_Slot_id_grupo_idx`(`id_grupo`),
    INDEX `Horario_Slot_id_materia_idx`(`id_materia`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estadistica_Alumnos` (
    `id` VARCHAR(191) NOT NULL,
    `id_ciclo` VARCHAR(191) NOT NULL,
    `id_grupo` VARCHAR(191) NOT NULL,
    `insc_h` INTEGER NOT NULL DEFAULT 0,
    `insc_m` INTEGER NOT NULL DEFAULT 0,
    `altas_h` INTEGER NOT NULL DEFAULT 0,
    `altas_m` INTEGER NOT NULL DEFAULT 0,
    `bajas_h` INTEGER NOT NULL DEFAULT 0,
    `bajas_m` INTEGER NOT NULL DEFAULT 0,
    `aprob_todos_h` INTEGER NULL,
    `aprob_todos_m` INTEGER NULL,
    `reprob_h` INTEGER NULL,
    `reprob_m` INTEGER NULL,
    `repetidores_h` INTEGER NULL,
    `repetidores_m` INTEGER NULL,
    `f_cre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Estadistica_Alumnos_index_4`(`id_ciclo`, `id_grupo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Padron` (
    `id` VARCHAR(191) NOT NULL,
    `id_ciclo` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'borrador',
    `f_gen` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `f_mod` DATETIME(3) NOT NULL,

    INDEX `Padron_id_ciclo_idx`(`id_ciclo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ciclo` ADD CONSTRAINT `Ciclo_id_plan_fkey` FOREIGN KEY (`id_plan`) REFERENCES `Plan_estudios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ciclo` ADD CONSTRAINT `Ciclo_id_esc_fkey` FOREIGN KEY (`id_esc`) REFERENCES `Escuela`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turnos` ADD CONSTRAINT `Turnos_id_esc_fkey` FOREIGN KEY (`id_esc`) REFERENCES `Escuela`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grados` ADD CONSTRAINT `Grados_id_plan_fkey` FOREIGN KEY (`id_plan`) REFERENCES `Plan_estudios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materias` ADD CONSTRAINT `Materias_id_plan_fkey` FOREIGN KEY (`id_plan`) REFERENCES `Plan_estudios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia_Grado` ADD CONSTRAINT `Materia_Grado_id_materia_fkey` FOREIGN KEY (`id_materia`) REFERENCES `Materias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia_Grado` ADD CONSTRAINT `Materia_Grado_id_grado_fkey` FOREIGN KEY (`id_grado`) REFERENCES `Grados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupos` ADD CONSTRAINT `Grupos_id_esc_fkey` FOREIGN KEY (`id_esc`) REFERENCES `Escuela`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupos` ADD CONSTRAINT `Grupos_id_grado_fkey` FOREIGN KEY (`id_grado`) REFERENCES `Grados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupos` ADD CONSTRAINT `Grupos_id_turno_fkey` FOREIGN KEY (`id_turno`) REFERENCES `Turnos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Persona_direc` ADD CONSTRAINT `Persona_direc_id_persona_fkey` FOREIGN KEY (`id_persona`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Persona_contact` ADD CONSTRAINT `Persona_contact_id_persona_fkey` FOREIGN KEY (`id_persona`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleado` ADD CONSTRAINT `Empleado_id_persona_fkey` FOREIGN KEY (`id_persona`) REFERENCES `Persona`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleado` ADD CONSTRAINT `Empleado_id_esc_fkey` FOREIGN KEY (`id_esc`) REFERENCES `Escuela`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cobertura` ADD CONSTRAINT `Cobertura_id_empleado_titular_fkey` FOREIGN KEY (`id_empleado_titular`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cobertura` ADD CONSTRAINT `Cobertura_id_empleado_cubre_fkey` FOREIGN KEY (`id_empleado_cubre`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleado_Rol` ADD CONSTRAINT `Empleado_Rol_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleado_Rol` ADD CONSTRAINT `Empleado_Rol_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Rol_Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preparacion_Prof` ADD CONSTRAINT `Preparacion_Prof_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plaza` ADD CONSTRAINT `Plaza_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plaza` ADD CONSTRAINT `Plaza_id_nombramiento_fkey` FOREIGN KEY (`id_nombramiento`) REFERENCES `Nombramiento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plaza` ADD CONSTRAINT `Plaza_id_materia_fkey` FOREIGN KEY (`id_materia`) REFERENCES `Materias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plaza` ADD CONSTRAINT `Plaza_id_esc_fkey` FOREIGN KEY (`id_esc`) REFERENCES `Escuela`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plaza_Grupo` ADD CONSTRAINT `Plaza_Grupo_id_plaza_fkey` FOREIGN KEY (`id_plaza`) REFERENCES `Plaza`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plaza_Grupo` ADD CONSTRAINT `Plaza_Grupo_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trabajo_Externo` ADD CONSTRAINT `Trabajo_Externo_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario_Slot` ADD CONSTRAINT `Horario_Slot_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario_Slot` ADD CONSTRAINT `Horario_Slot_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario_Slot` ADD CONSTRAINT `Horario_Slot_id_materia_fkey` FOREIGN KEY (`id_materia`) REFERENCES `Materias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estadistica_Alumnos` ADD CONSTRAINT `Estadistica_Alumnos_id_ciclo_fkey` FOREIGN KEY (`id_ciclo`) REFERENCES `Ciclo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Estadistica_Alumnos` ADD CONSTRAINT `Estadistica_Alumnos_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Padron` ADD CONSTRAINT `Padron_id_ciclo_fkey` FOREIGN KEY (`id_ciclo`) REFERENCES `Ciclo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
