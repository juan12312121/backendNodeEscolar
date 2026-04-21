const { Rol, Permiso, Usuario, RolPermiso } = require('../models');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
require('dotenv').config();

const initialData = async () => {
    try {
        logger.info('Iniciando población de base de datos...');

        // 1. Crear Permisos Básicos
        const permisosDef = [
            { nombre: 'Ver Usuarios', slug: 'ver-usuarios', descripcion: 'Permite listar usuarios' },
            { nombre: 'Gestionar Usuarios', slug: 'gestionar-usuarios', descripcion: 'Permite crear, editar y eliminar usuarios' },
            { nombre: 'Ver Escuelas', slug: 'ver-escuelas', descripcion: 'Permite listar escuelas' },
            { nombre: 'Gestionar Escuelas', slug: 'gestionar-escuelas', descripcion: 'Permite crear, editar y eliminar escuelas' },
            { nombre: 'Ver Empleados', slug: 'ver-empleados', descripcion: 'Permite listar empleados' },
            { nombre: 'Gestionar Empleados', slug: 'gestionar-empleados', descripcion: 'Permite crear, editar y eliminar empleados' },
            { nombre: 'Ver Auditoría', slug: 'ver-auditoria', descripcion: 'Permite ver los logs de actividad del sistema' }
        ];

        const permisosCreados = await Promise.all(
            permisosDef.map(p => Permiso.findOrCreate({ where: { slug: p.slug }, defaults: p }))
        );
        logger.info('Permisos creados/verificados.');

        // 2. Crear Rol Super Admin
        const [adminRole] = await Rol.findOrCreate({
            where: { nombre: 'Super Administrador' },
            defaults: { descripcion: 'Acceso total al sistema' }
        });
        logger.info('Rol Super Administrador listo.');

        // 3. Asignar todos los permisos al Super Admin
        await adminRole.setPermisos(permisosCreados.map(p => p[0].id));
        logger.info('Permisos asignados al Administrador.');

        // 4. Crear Usuario Administrador Inicial si no existe
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@school.com';
        const adminPass = process.env.ADMIN_PASSWORD || 'Admin1234!';
        
        const existingAdmin = await Usuario.findOne({ where: { correo: adminEmail } });
        
        if (!existingAdmin) {
            const hashedPass = await bcrypt.hash(adminPass, 10);
            await Usuario.create({
                nombre: 'Administrador Sistema',
                correo: adminEmail,
                contra: hashedPass,
                id_rol: adminRole.id
            });
            logger.info(`Usuario Administrador creado: ${adminEmail}`);
        } else {
            logger.info('El usuario administrador ya existe.');
        }

        logger.info('¡Población completada con éxito!');
        process.exit(0);
    } catch (error) {
        logger.error('Error poblando la base de datos:', error);
        process.exit(1);
    }
};

initialData();
