import { z } from 'zod';

export const createSchema = z.object({
    body: z.object({
        id_esc: z.string().min(1, 'La escuela es requerida'),
        nombre: z.string().optional(),
        desc: z.string().optional(),
        h_inicio: z.string().datetime({ offset: true }).optional(),
        h_fin: z.string().datetime({ offset: true }).optional(),
    }),
});

export const updateSchema = z.object({
    body: z.object({
        nombre: z.string().optional(),
        desc: z.string().optional(),
        h_inicio: z.string().datetime({ offset: true }).optional(),
        h_fin: z.string().datetime({ offset: true }).optional(),
        activo: z.boolean().optional(),
    }),
});

export type CreateInput = z.infer<typeof createSchema>['body'];
export type UpdateInput = z.infer<typeof updateSchema>['body'];
