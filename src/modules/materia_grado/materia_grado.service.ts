import prisma from '../../config/database';
import { NotFoundError } from '../../middleware/error.middleware';
import { QueryParams, PaginatedResult } from '../../types';
import { parsePagination } from '../../utils/pagination.utils';
import { CreateInput, UpdateInput } from './materia_grado.validation';

export async function getAll(query: QueryParams & { id_materia?: string; id_grado?: string }): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = parsePagination(query);
    const where = {
        ...(query.id_materia && { id_materia: query.id_materia }),
        ...(query.id_grado && { id_grado: query.id_grado }),
    };

    const [data, total] = await Promise.all([
        prisma.materia_Grado.findMany({ where, skip, take: limit }),
        prisma.materia_Grado.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
}

export async function getById(id: string) {
    const record = await prisma.materia_Grado.findUnique({ where: { id } });
    if (!record) throw new NotFoundError('Relacion materia-grado no encontrada');
    return record;
}

export async function create(data: CreateInput) {
    return prisma.materia_Grado.create({ data });
}

export async function update(id: string, data: UpdateInput) {
    await getById(id);
    return prisma.materia_Grado.update({ where: { id }, data });
}

export async function remove(id: string) {
    await getById(id);
    return prisma.materia_Grado.delete({ where: { id } });
}
