# Backend - Sistema de Gestion Administrativa de Personal Academico

## Descripcion del Proyecto

API REST para la gestion administrativa de personal academico (tipo SEP). Sistema de escala grande con 24 tablas interrelacionadas que cubre:

- Autenticacion de usuarios
- Catalogo de escuelas y planes de estudio
- Gestion de personal (personas, empleados, roles, plazas)
- Asignacion de horarios y coberturas
- Estadisticas de alumnos y padron por ciclo

---

## Stack Tecnologico

- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Lenguaje:** TypeScript (strict mode)
- **ORM:** Prisma 5
- **Base de Datos:** MySQL
- **Arquitectura:** MVC hibrido con estructura modular

---

## Estructura del Proyecto

```
Backend/
├── src/
│   ├── config/
│   │   └── database.ts               # Singleton de PrismaClient
│   ├── middleware/
│   │   ├── auth.middleware.ts         # Verificacion JWT (Bearer token)
│   │   ├── error.middleware.ts        # Handler global + clases de error
│   │   └── validate.middleware.ts     # Ejecucion de schemas Zod
│   ├── modules/                       # Dominio modular
│   │   └── auth/
│   │       ├── auth.controller.ts
│   │       ├── auth.routes.ts
│   │       ├── auth.service.ts
│   │       └── auth.validation.ts
│   ├── routes/
│   │   └── index.ts                   # Router raiz (/api)
│   ├── types/
│   │   ├── express.d.ts               # Extension de Request con user
│   │   └── index.ts                   # Tipos compartidos (barrel export)
│   ├── utils/
│   │   ├── hash.utils.ts              # bcrypt helpers
│   │   ├── jwt.utils.ts               # Generacion y verificacion de tokens
│   │   └── response.utils.ts          # Formato estandar de respuesta
│   └── server.ts                      # Punto de entrada Express
├── prisma/
│   ├── migrations/                    # Migraciones generadas por Prisma
│   └── schema.prisma                  # Schema completo (24 modelos)
├── .env                               # Variables de entorno (privado, no en git)
├── .env.example                       # Template de .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Convencion de modulos

Cada dominio dentro de `src/modules/` contiene sus propios archivos:

```
modules/<dominio>/
├── <dominio>.validation.ts    # Schemas Zod de entrada
├── <dominio>.service.ts       # Logica de negocio y acceso a BD
├── <dominio>.controller.ts    # Manejo de request/response
└── <dominio>.routes.ts        # Definicion de rutas Express
```

La infraestructura compartida (middleware, utils, types, config) permanece en sus directorios de nivel superior.

---

## Instalacion y Setup

### 1. Instalar dependencias

```bash
npm install
```



### 2. Crear la base de datos con migraciones

```bash
npx prisma migrate dev --name init
```

### 3. Arrancar el servidor en desarrollo

```bash
npm run dev
```

El servidor estara disponible en `http://localhost:3000`

### 4. Visualizar la BD (opcional)

```bash
npx prisma studio
```

---

## Fases de Desarrollo

### FASE 1 - Setup e Inicializacion [COMPLETADA]

- Configuracion de proyecto: package.json, TypeScript strict, tsconfig
- Schema Prisma con los 24 modelos (MySQL provider)
- Servidor Express con cors, helmet, express.json
- Utils: response.utils, hash.utils, jwt.utils
- Middleware: error.middleware (jerarquia de AppError), validate.middleware
- Tipos compartidos: types/index.ts, types/express.d.ts
- Singleton de PrismaClient con construccion dinamica de DATABASE_URL

---

### FASE 2 - Autenticacion (Auth) [COMPLETADA]

**Endpoints:**
- `POST /api/auth/login` - Login con correo y password
- `POST /api/auth/refresh` - Rotacion de tokens
- `POST /api/auth/logout` - Invalida refresh token en BD

**Modulo:** `src/modules/auth/`

**Tablas:** Usuarios

---

### FASE 3 - Catalogos Base [PENDIENTE]

**Objetivo:** CRUD de entidades base sin dependencias complejas.

**Orden de implementacion:**
1. Plan_estudios
2. Escuela
3. Nombramiento
4. Rol_Empleado
5. Grados (depende de Plan_estudios)
6. Materias (depende de Plan_estudios)
7. Materia_Grado (depende de Materias + Grados)
8. Turnos (depende de Escuela)
9. Ciclo (depende de Plan_estudios + Escuela)

---

### FASE 4 - Personal (Persona y Empleado) [PENDIENTE]

**Entidades:**
- Persona, Persona_direc, Persona_contact
- Empleado, Preparacion_Prof, Empleado_Rol, Trabajo_Externo

---

### FASE 5 - Plazas y Horarios [PENDIENTE]

**Entidades:**
- Grupos, Plaza, Plaza_Grupo, Horario_Slot

---

### FASE 6 - Coberturas [PENDIENTE]

**Entidad:** Cobertura

---

### FASE 7 - Estadisticas y Padron [PENDIENTE]

**Entidades:**
- Estadistica_Alumnos
- Padron (workflow: borrador -> publicado -> cerrado)

---

### FASE 8 - Gestion de Usuarios [PENDIENTE]

**Operaciones:** Crear, listar, actualizar, cambiar password, desactivar.

---

### FASE 9 - README Final y Refinamiento [PENDIENTE]

---

## Autenticacion

El sistema usa JWT:

### Refresh Token
- **Duracion:** Configurable via `JWT_EXPIRES_IN` en .env (default: `1d`)
- **Uso:** `POST /api/auth/refresh` para rotar ambos tokens
- **Almacenado:** En BD (tabla Usuarios, columna refresh_token)

### Flujo

1. Login: `POST /api/auth/login` devuelve `{ accessToken, refreshToken }`
2. Requests protegidos: header `Authorization: Bearer <accessToken>`
3. Token expirado: `POST /api/auth/refresh` con `{ refreshToken }` en body
4. Logout: `POST /api/auth/logout` (requiere token valido) invalida el refresh

---

## Estandares de Codigo

### Respuesta Estandar

**Exito:**
```json
{
  "success": true,
  "data": {},
  "message": "Operacion exitosa",
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Descripcion del error",
  "errors": [
    { "field": "correo", "message": "Correo invalido" }
  ]
}
```

### Paginacion

```
GET /api/escuelas?page=1&limit=20&activo=true
```

Query params:
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `activo` (default: `true`; usar `all` para incluir inactivos)

### Soft Delete

Todas las entidades tienen campo `activo`. El delete es logico (activo = false). Los listados filtran por `activo: true` por defecto.

### Jerarquia de Errores

```
AppError (base)
├── BadRequestError    400
├── UnauthorizedError  401
├── ForbiddenError     403
├── NotFoundError      404
├── ConflictError      409
└── ValidationError    422
```

Los errores de Prisma se mapean automaticamente en el handler global: `P2002` -> 409, `P2025` -> 404, `P2003/P2014` -> 400.

---

## Tablas de la Base de Datos (24 modelos)

| Tabla | Descripcion | Dependencias |
|-------|-------------|--------------|
| Usuarios | Usuarios del sistema | - |
| Escuela | Datos institucionales | - |
| Plan_estudios | Planes de estudio | - |
| Rol_Empleado | Catalogo de roles | - |
| Nombramiento | Catalogo de nombramientos | - |
| Ciclo | Ciclos escolares | Plan_estudios, Escuela |
| Turnos | Turnos (matutino, vespertino) | Escuela |
| Grados | Grados por plan | Plan_estudios |
| Materias | Materias por plan | Plan_estudios |
| Materia_Grado | Relacion materias-grados | Materias, Grados |
| Grupos | Grupos (secciones) | Escuela, Grado, Turno |
| Persona | Datos personales base | - |
| Persona_direc | Domicilios | Persona |
| Persona_contact | Contactos | Persona |
| Empleado | Empleados academicos | Persona, Escuela |
| Preparacion_Prof | Educacion del empleado | Empleado |
| Empleado_Rol | Asignacion de roles con vigencia | Empleado, Rol_Empleado |
| Trabajo_Externo | Trabajos externos | Empleado |
| Plaza | Plazas de empleados | Empleado, Nombramiento, Materia, Escuela |
| Plaza_Grupo | Relacion plaza-grupo | Plaza, Grupos |
| Horario_Slot | Horarios de clase | Empleado, Grupos, Materias |
| Cobertura | Sustituciones entre empleados | Empleado (titular + cubre) |
| Estadistica_Alumnos | Estadisticas por grupo | Ciclo, Grupos |
| Padron | Padron de empleados por ciclo | Ciclo |

---

## Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia con nodemon + ts-node

# Produccion
npm run build            # Compila TypeScript a dist/
npm run start            # Inicia desde dist/

# Base de datos
npm run migrate          # prisma migrate dev
npm run migrate:prod     # prisma migrate deploy
npm run generate         # prisma generate
npm run studio           # Prisma Studio
```

**Ultima actualizacion:** 14 de Abril, 2026

**Estado:** Fase 2 - Autenticacion completada
