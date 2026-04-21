const Escuela = require('./Escuela');
const Ciclo = require('./Ciclo');
const Turno = require('./Turno');
const PlanEstudio = require('./PlanEstudio');
const Grado = require('./Grado');
const Materia = require('./Materia');
const Grupo = require('./Grupo');
const Estudiante = require('./Estudiante');
const Persona = require('./Persona');
const Empleado = require('./Empleado');
const RolEmpleado = require('./RolEmpleado');
const Nombramiento = require('./Nombramiento');
const Plaza = require('./Plaza');
const HorarioSlot = require('./HorarioSlot');
const Usuario = require('./Usuario');
const Rol = require('./Rol');
const Permiso = require('./Permiso');
const RolPermiso = require('./RolPermiso');
const LogActividad = require('./LogActividad');

// --- RELACIONES ---

// Escuela - Ciclo, Turno, Grupo, Empleado
Escuela.hasMany(Ciclo, { foreignKey: 'id_esc' });
Ciclo.belongsTo(Escuela, { foreignKey: 'id_esc' });

Escuela.hasMany(Turno, { foreignKey: 'id_esc' });
Turno.belongsTo(Escuela, { foreignKey: 'id_esc' });

Escuela.hasMany(Grupo, { foreignKey: 'id_esc' });
Grupo.belongsTo(Escuela, { foreignKey: 'id_esc' });

Escuela.hasMany(Empleado, { foreignKey: 'id_esc' });
Empleado.belongsTo(Escuela, { foreignKey: 'id_esc' });

// PlanEstudio - Grado, Materia, Ciclo
PlanEstudio.hasMany(Grado, { foreignKey: 'id_plan' });
Grado.belongsTo(PlanEstudio, { foreignKey: 'id_plan' });

PlanEstudio.hasMany(Materia, { foreignKey: 'id_plan' });
Materia.belongsTo(PlanEstudio, { foreignKey: 'id_plan' });

PlanEstudio.hasMany(Ciclo, { foreignKey: 'id_plan' });
Ciclo.belongsTo(PlanEstudio, { foreignKey: 'id_plan' });

// Grado - Grupo
Grado.hasMany(Grupo, { foreignKey: 'id_grado' });
Grupo.belongsTo(Grado, { foreignKey: 'id_grado' });

// Turno - Grupo
Turno.hasMany(Grupo, { foreignKey: 'id_turno' });
Grupo.belongsTo(Turno, { foreignKey: 'id_turno' });

// Persona - Estudiante, Empleado, Usuario
Persona.hasOne(Estudiante, { foreignKey: 'id_persona' });
Estudiante.belongsTo(Persona, { foreignKey: 'id_persona' });

Persona.hasOne(Empleado, { foreignKey: 'id_persona' });
Empleado.belongsTo(Persona, { foreignKey: 'id_persona' });

// Empleado - Plaza, HorarioSlot
Empleado.hasMany(Plaza, { foreignKey: 'id_empleado' });
Plaza.belongsTo(Empleado, { foreignKey: 'id_empleado' });

Empleado.hasMany(HorarioSlot, { foreignKey: 'id_empleado' });
HorarioSlot.belongsTo(Empleado, { foreignKey: 'id_empleado' });

// Usuarios y Roles
Usuario.belongsTo(Rol, { foreignKey: 'id_rol', as: 'rol' });
Rol.hasMany(Usuario, { foreignKey: 'id_rol', as: 'usuarios' });

// Auditoría
LogActividad.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Usuario.hasMany(LogActividad, { foreignKey: 'usuario_id', as: 'logs' });

Rol.belongsToMany(Permiso, { 
    through: RolPermiso, 
    foreignKey: 'id_rol', 
    otherKey: 'id_permiso',
    as: 'permisos'
});
Permiso.belongsToMany(Rol, { 
    through: RolPermiso, 
    foreignKey: 'id_permiso', 
    otherKey: 'id_rol',
    as: 'roles'
});

module.exports = {
    Escuela,
    Ciclo,
    Turno,
    PlanEstudio,
    Grado,
    Materia,
    Grupo,
    Estudiante,
    Persona,
    Empleado,
    RolEmpleado,
    Nombramiento,
    Plaza,
    HorarioSlot,
    Usuario,
    Rol,
    Permiso,
    RolPermiso,
    LogActividad
};
