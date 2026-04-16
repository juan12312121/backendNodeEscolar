import prisma from '../../config/database';
import { NotFoundError } from '../../middleware/error.middleware';
import { QueryParams, PaginatedResult } from '../../types';
import { parsePagination, parseActivo } from '../../utils/pagination.utils';
import { CreateInput, UpdateInput } from './grados.validation';

export async function getAll(query: QueryParams & { id_plan?: string }): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = parsePagination(query);
    const where = {
        ...parseActivo(query.activo),
        ...(query.id_plan && { id_plan: query.id_plan }),
    };

    const [data, total] = await Promise.all([
        prisma.grados.findMany({ where, skip, take: limit, orderBy: { numero: 'asc' } }),
        prisma.grados.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
}

export async function getById(id: string) {
    const record = await prisma.grados.findUnique({ where: { id } });
    if (!record) throw new NotFoundError('Grado no encontrado');
    return record;
}

export async function create(data: CreateInput) {
    return prisma.grados.create({ data });
}

export async function update(id: string, data: UpdateInput) {
    await getById(id);
    return prisma.grados.update({ where: { id }, data });
}

export async function remove(id: string) {
    await getById(id);
    return prisma.grados.update({ where: { id }, data: { activo: false } });
}
