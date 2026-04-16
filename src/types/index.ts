// ----------------------------------------------------------------
// Paginacion
// ----------------------------------------------------------------

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedResult<T> {
    data: T[];
    meta: PaginationMeta;
}

export interface QueryParams {
    page?: string;
    limit?: string;
    activo?: string;
}

// ----------------------------------------------------------------
// Auth
// ----------------------------------------------------------------

export type UserRole = 'admin' | 'super_admin';

export interface AuthPayload {
    id: string;
    correo: string;
    rol: UserRole;
    iat?: number;
    exp?: number;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
