import { z } from 'zod';

export const createSchema = z.object({
    body: z.object({
        nombre: z.string().min(1, 'El nombre es requerido'),
        desc: z.string().optional(),
    }),
});

export const updateSchema = z.object({
    body: z.object({
        nombre: z.string().min(1).optional(),
        desc: z.string().optional(),
        activo: z.boolean().optional(),
    }),
});

export type CreateInput = z.infer<typeof createSchema>['body'];
export type UpdateInput = z.infer<typeof updateSchema>['body'];
