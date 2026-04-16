import { z } from 'zod';

export const createSchema = z.object({
    body: z.object({
        id_plan: z.string().min(1, 'El plan de estudios es requerido'),
        id_esc: z.string().min(1, 'La escuela es requerida'),
        nombre: z.string().optional(),
        f_inicio: z.string().datetime({ offset: true }).optional(),
        f_fin: z.string().datetime({ offset: true }).optional(),
    }),
});

export const updateSchema = z.object({
    body: z.object({
        nombre: z.string().optional(),
        f_inicio: z.string().datetime({ offset: true }).optional(),
        f_fin: z.string().datetime({ offset: true }).optional(),
        activo: z.boolean().optional(),
    }),
});

export type CreateInput = z.infer<typeof createSchema>['body'];
export type UpdateInput = z.infer<typeof updateSchema>['body'];
