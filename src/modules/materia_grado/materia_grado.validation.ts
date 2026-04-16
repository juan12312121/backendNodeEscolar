import { z } from 'zod';

export const createSchema = z.object({
    body: z.object({
        id_materia: z.string().min(1, 'La materia es requerida'),
        id_grado: z.string().min(1, 'El grado es requerido'),
        horas_sem: z.number().int().nonnegative().optional(),
    }),
});

export const updateSchema = z.object({
    body: z.object({
        horas_sem: z.number().int().nonnegative().optional(),
    }),
});

export type CreateInput = z.infer<typeof createSchema>['body'];
export type UpdateInput = z.infer<typeof updateSchema>['body'];
