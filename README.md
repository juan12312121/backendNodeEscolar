# Guía de Mockups - SchoolManagerSEP

Este documento proporciona el contexto técnico del backend y la estructura de vistas necesaria para el desarrollo de los mockups (diseño de interfaz) del sistema de gestión escolar.

## 🚀 Contexto del Backend

El sistema está construido sobre una arquitectura robusta y segura utilizando Node.js.

- **Stack Tecnológico:** Node.js, Express, Sequelize (ORM), MySQL.
- **Seguridad:** Implementación de JWT (JSON Web Tokens), Role-Based Access Control (RBAC), Rate Limiting y protección contra ataques XSS y HPP.
- **Auditoría:** Todas las acciones críticas son registradas en un log de actividad.
- **Arquitectura:** Basada en una "Factory" de rutas que estandariza las operaciones CRUD para todas las entidades.

---

## 👥 Roles de Usuario y Permisos

El sistema utiliza un modelo RBAC. A continuación, se definen los roles sugeridos para los mockups:

| Rol | Descripción | Alcance Principal |
| :--- | :--- | :--- |
| **Super Admin** | Administrador del sistema a nivel estatal/zona. | Gestión de escuelas, usuarios, roles y auditoría global. |
| **Director** | Máxima autoridad dentro de una institución. | Gestión de su escuela, personal docente y administrativo. |
| **Control Escolar** | Personal administrativo encargado de procesos. | Inscripciones, grupos, ciclos escolares y estadística. |
| **RRHH** | Encargado de la gestión de plazas. | Nombramientos, plazas, compatibilidad de empleos. |
| **Docente** | Personal frente a grupo. | Consulta de horarios, materias y listas de alumnos. |

---

## 🏛️ Estructura de Entidades (Modelos)

Para los mockups, considera que los formularios y tablas deben manejar estos datos:

1.  **Seguridad:** Usuarios, Roles y Permisos.
2.  **Infraestructura:** Escuelas (CCT, Nombre, Nivel, Turno).
3.  **Personal:** Personas (Datos generales), Empleados (Plazas, Nombramientos).
4.  **Académico:** Ciclos Escolares, Materias, Grupos y Estudiantes.

---

## 🖼️ Vistas Propuestas por Rol

Para los mockups, considera qué elementos del menú lateral o dashboard deben ocultarse según el rol:

### 1. Módulo de Acceso (Auth)
- **Vistas:** Login, Recuperación.
- **Acceso:** Todos los roles.

### 2. Dashboard Principal
- **Super Admin:** Estadísticas globales de todas las escuelas.
- **Director / Control Escolar:** Estadísticas de su escuela específica.
- **Docente:** Horario del día y avisos institucionales.

### 3. Gestión de Instituciones (Escuelas)
- **Directorio de Escuelas:** Acceso total para **Super Admin**.
- **Ficha de Escuela:** **Director** puede editar la información de su propia escuela.
- **Registro de Escuela:** Exclusivo para **Super Admin**.

### 4. Gestión de Recursos Humanos (Personal)
- **Directorio de Empleados:** **Super Admin**, **Director** y **RRHH**.
- **Gestión de Plazas y Nombramientos:** Exclusivo para **RRHH** y **Super Admin**.
- **Perfil de Empleado:** Lectura para el propio empleado (**Docente**).

### 5. Control Académico
- **Ciclos, Grupos y Materias:** **Control Escolar**, **Director**.
- **Inscripción de Alumnos:** **Control Escolar**.
- **Expediente de Estudiante:** **Docente** (solo sus alumnos), **Control Escolar** y **Director**.

### 6. Administración del Sistema
- **Roles, Permisos y Usuarios:** Exclusivo para **Super Admin**.
- **Logs de Auditoría:** Exclusivo para **Super Admin**.

---

## 📋 Detalle de Campos por Entidad (Formularios)

Utiliza estos campos para diseñar tus formularios y tablas:

### 🏠 Escuela
- **Clave (CCT):** String (10) - Único.
- **Nombre:** String (100).
- **Zona Escolar:** String (5).
- **Nivel:** Dropdown (Preescolar, Primaria, Secundaria).
- **Contacto:** Teléfono (10), Correo.
- **Ubicación:** Domicilio, Localidad, Municipio, Estado, CP.

### 📅 Ciclo Escolar
- **Nombre:** String (ej: 2024-2025).
- **Fechas:** Fecha Inicio, Fecha Fin.
- **Plan de Estudios:** Selección vinculada.
- **Estado:** Switch (Activo/Inactivo).

### 👥 Persona y Empleado
- **Datos Personales:** Nombre, Apellido Paterno, Apellido Materno.
- **Identificadores:** RFC (13), CURP (18) - Únicos.
- **Laboral:** Número de Control, Fecha de Ingreso, Lugar de Nacimiento.
- **Dirección:** Calle, Colonia, CP, Ciudad, Estado.
- **Contacto:** Teléfono 1, Teléfono 2, Correo Personal.

### 💼 Plaza y Nombramiento
- **Código de Plaza:** String (30).
- **Tipo Nombramiento:** Dropdown (Definitivo, Interino, etc.).
- **Carga Horaria:** Horas Clase, Horas Descarga, Horas Fortalecimiento.
- **Asignación:** Escuela vinculada, Materia vinculada.

### 📖 Académico (Grados, Grupos, Materias)
- **Materia:** Nombre, Descripción, Horas Semanales.
- **Grado:** Nombre, Número (1-6).
- **Grupo:** Nombre (A, B, C), Turno vinculado.
- **Horario (Slots):** Día de la semana, Hora Inicio, Hora Fin.

### 🔐 Seguridad y Acceso
- **Login:**
    - Correo Electrónico (Validación de formato email).
    - Contraseña (Mínimo 8 caracteres).
- **Registro de Usuario:**
    - Nombre Completo (Mínimo 3 caracteres).
    - Correo Electrónico.
    - Contraseña (Mínimo 8 caracteres).
    - Selección de Rol (Dropdown con UUID).
- **Rol:** Nombre, Descripción.
- **Permiso:** Nombre, Slug (ej: `crear-escuela`).

---

## ✨ Lineamientos de Diseño Sugeridos

Para lograr un acabado **Premium y Moderno**:

- **Estética:** Minimalista, con uso de sombras suaves (Soft Shadows) y bordes redondeados.
- **Paleta de Colores:** Tonos profesionales (Azules oscuros, grises elegantes) con colores de acento para acciones (Verde para éxito, Rojo para alertas).
- **Tipografía:** Fuentes modernas como *Inter*, *Roboto* u *Outfit*.
- **Interactividad:** Estados de hover claros, micro-animations en botones y transiciones fluidas entre vistas.
- **Responsividad:** El diseño debe ser funcional tanto en Desktop como en Tablet.

---

> [!TIP]
> Al diseñar los formularios, recuerda que el backend utiliza validaciones estrictas. Asegúrate de incluir indicadores visuales de campos obligatorios y mensajes de error claros.
