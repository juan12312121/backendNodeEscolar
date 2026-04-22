const { sendSuccess, sendError } = require('../utils/response');
const LogActividad = require('../models/LogActividad');

/**
 * =========================================================================
 * CRUD SERVICE - EL MOTOR CENTRAL DEL BACKEND
 * =========================================================================
 * Este servicio es un componente "Genérico" y "Reutilizable". 
 * Sirve para cualquier tabla de la base de datos (Escuelas, Alumnos, etc.)
 * permitiendo que no tengamos que escribir el mismo código una y otra vez.
 */
class CRUDService {
  constructor(Model) {
    this.Model = Model; // Aquí se guarda el modelo de Sequelize que vamos a usar
  }

  /**
   * UTILITARIO: Validación manual de campos requeridos.
   */
  validateRequired(data, fields) {
    const missing = fields.filter(f => !data[f]);
    if (missing.length > 0) {
      throw { status: 400, message: `Faltan campos obligatorios: ${missing.join(', ')}` };
    }
  }

  /**
   * MOTOR DE CONSULTAS (READ)
   * -----------------------------------------------------------------------
   * Soporta: Paginación, Ordenamiento y Filtrado Automático.
   * query: Objeto que viene de la URL (req.query)
   * include: Relaciones que queremos traer (ej: [Turno, Ciclo])
   */
  async getAll(query = {}, include = []) {
    // 1. Extraemos los parámetros de control y el resto son FILTROS
    const { 
      page = 1,           // Página actual (default 1)
      limit = 10,         // Registros por página (default 10)
      sort = this.Model.rawAttributes.f_cre ? 'f_cre' : 'id', // Dinámico según el modelo
      order = 'DESC',     // Dirección (ASC o DESC)
      ...filters          // Todo lo demás son filtros (ej: municipio=Puebla)
    } = query;
    
    // 2. Calculamos el offset (cuántos registros saltarnos)
    // Ejemplo: Si estoy en página 2 y el límite es 10, me salto los primeros 10.
    const offset = (page - 1) * limit;
    
    const where = { ...filters }; // Copiamos los filtros a la consulta SQL

    // 3. Si el modelo tiene el campo 'activo', filtramos por defecto solo los activos
    if (where.activo === undefined && this.Model.rawAttributes.activo) {
        where.activo = true; 
    }

    // 4. Ejecutamos la consulta a la base de datos
    // 'findAndCountAll' devuelve tanto los registros como el TOTAL disponible
    const { count, rows } = await this.Model.findAndCountAll({
      where,
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order.toUpperCase()]]
    });

    // 5. Devolvemos un objeto enriquecido con metadata para el Frontend
    return {
      total: count,               // Total de registros en la BD
      totalPages: Math.ceil(count / limit), // Cuántas páginas existen en total
      currentPage: parseInt(page), // En qué página estamos
      limit: parseInt(limit),     // Cuántos quisimos ver por página
      results: rows               // Los datos reales
    };
  }

  /**
   * CREACIÓN (CREATE)
   * -----------------------------------------------------------------------
   * usuarioId: El ID de quien está operando (para el Log de Auditoría)
   */
  async create(data, usuarioId = null) {
    // 1. Guardamos en la base de datos
    const record = await this.Model.create(data);
    
    // 2. Capturamos el nombre de la entidad (ej: 'Escuela')
    const entidadNombre = this.Model.options?.name?.singular || this.Model.name;

    // 3. AUDITORÍA: Si hay un usuario logueado, registramos la acción
    if (usuarioId) {
      await LogActividad.create({
        usuario_id: usuarioId,
        accion: 'CREATE',
        entidad: entidadNombre,
        entidad_id: record.id,
        detalles: data
      });
    }

    return record;
  }

  /**
   * ACTUALIZACIÓN (UPDATE)
   */
  async update(id, data, usuarioId = null) {
    // 1. Buscamos primero si existe
    const record = await this.getById(id);
    
    // 2. Aplicamos los cambios
    await record.update(data);
    const entidadNombre = this.Model.options?.name?.singular || this.Model.name;

    // 3. AUDITORÍA: Guardamos quién hizo el cambio y qué cambió
    if (usuarioId) {
      await LogActividad.create({
        usuario_id: usuarioId,
        accion: 'UPDATE',
        entidad: entidadNombre,
        entidad_id: id,
        detalles: data
      });
    }

    return record;
  }

  /**
   * ELIMINACIÓN (DELETE / SOFT DELETE)
   */
  async delete(id, usuarioId = null) {
    const record = await this.getById(id);
    
    // 1. Ejecutamos el borrado. 
    // Si el modelo es 'paranoid', esto NO borra de la BD, solo llena 'deletedAt'
    await record.destroy();
    
    const entidadNombre = this.Model.options?.name?.singular || this.Model.name;

    // 2. AUDITORÍA: Registrar que se borró el registro
    if (usuarioId) {
      await LogActividad.create({
        usuario_id: usuarioId,
        accion: 'DELETE',
        entidad: entidadNombre,
        entidad_id: id
      });
    }

    return true;
  }

  /**
   * BÚSQUEDA POR ID
   */
  async getById(id, include = []) {
    const record = await this.Model.findByPk(id, { include });
    if (!record) {
      throw { status: 404, message: `${this.Model.name} no encontrado` };
    }
    return record;
  }
}

module.exports = CRUDService;