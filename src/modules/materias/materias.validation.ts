import { z } from 'zod';

export const createSchema = z.object({
    body: z.object({
        id_plan: z.string().min(1, 'El plan de estudios es requerido'),
        nombre: z.string().optional(),
        desc: z.string().optional(),
    }),
});

export const updateSchema = z.object({
    body: z.object({
        nombre: z.string().optional(),
        desc: z.string().optional(),
        activo: z.boolean().optional(),
    }),
});

export type CreateInput = z.infer<typeof createSchema>['body'];
export type UpdateInput = z.infer<typeof updateSchema>['body'];
