import prisma from '../../config/database';
import { NotFoundError } from '../../middleware/error.middleware';
import { QueryParams, PaginatedResult } from '../../types';
import { parsePagination, parseActivo } from '../../utils/pagination.utils';
import { CreateInput, UpdateInput } from './plan_estudios.validation';

export async function getAll(query: QueryParams): Promise<PaginatedResult<any>> {
    const { page, limit, skip } = parsePagination(query);
    const where = parseActivo(query.activo);

    const [data, total] = await Promise.all([
        prisma.plan_estudios.findMany({ where, skip, take: limit, orderBy: { f_cre: 'desc' } }),
        prisma.plan_estudios.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
}

export async function getById(id: string) {
    const record = await prisma.plan_estudios.findUnique({ where: { id } });
    if (!record) throw new NotFoundError('Plan de estudios no encontrado');
    return record;
}

export async function create(data: CreateInput) {
    return prisma.plan_estudios.create({ data });
}

export async function update(id: string, data: UpdateInput) {
    await getById(id);
    return prisma.plan_estudios.update({ where: { id }, data });
}

export async function remove(id: string) {
    await getById(id);
    return prisma.plan_estudios.update({ where: { id }, data: { activo: false } });
}
