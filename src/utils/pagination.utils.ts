import { QueryParams } from '../types';

export function parsePagination(query: QueryParams) {
    const page = Math.max(1, parseInt(query.page || '1', 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit || '20', 10) || 20));
    return { page, limit, skip: (page - 1) * limit };
}

export function parseActivo(activo?: string): { activo?: boolean } {
    if (activo === 'all') return {};
    return { activo: activo !== 'false' };
}
