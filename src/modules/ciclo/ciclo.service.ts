import prisma from '../../config/database';
import { NotFoundError } from '../../middleware/error.middleware';
import { QueryParams, PaginatedResult } from '../../types';
import { parsePagination, parseActivo } from '../../utils/pagination.utils';
import { CreateInput, UpdateInput } from './ciclo.validation';

export async function getAll(query: QueryParams & { id_esc?: string; id_plan?: string }): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = parsePagination(query);
    const where = {
        ...parseActivo(query.activo),
        ...(query.id_esc && { id_esc: query.id_esc }),
        ...(query.id_plan && { id_plan: query.id_plan }),
    };

    const [data, total] = await Promise.all([
        prisma.ciclo.findMany({ where, skip, take: limit, orderBy: { f_cre: 'desc' } }),
        prisma.ciclo.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
}

export async function getById(id: string) {
    const record = await prisma.ciclo.findUnique({ where: { id } });
    if (!record) throw new NotFoundError('Ciclo no encontrado');
    return record;
}

export async function create(data: CreateInput) {
    return prisma.ciclo.create({ data });
}

export async function update(id: string, data: UpdateInput) {
    await getById(id);
    return prisma.ciclo.update({ where: { id }, data });
}

export async function remove(id: string) {
    await getById(id);
    return prisma.ciclo.update({ where: { id }, data: { activo: false } });
}
