import { z } from 'zod';

export const createSchema = z.object({
    body: z.object({
        clave: z.string().min(1, 'La clave es requerida'),
        nombre: z.string().optional(),
        zona_escolar: z.string().optional(),
        nivel: z.string().optional(),
        num_tel: z.string().optional(),
        correo: z.string().email('Correo invalido').optional(),
        domicilio: z.string().optional(),
        localidad: z.string().optional(),
        municipio: z.string().optional(),
        estado: z.string().optional(),
        codigo_postal: z.string().optional(),
    }),
});

export const updateSchema = z.object({
    body: z.object({
        clave: z.string().min(1).optional(),
        nombre: z.string().optional(),
        zona_escolar: z.string().optional(),
        nivel: z.string().optional(),
        num_tel: z.string().optional(),
        correo: z.string().email('Correo invalido').optional(),
        domicilio: z.string().optional(),
        localidad: z.string().optional(),
        municipio: z.string().optional(),
        estado: z.string().optional(),
        codigo_postal: z.string().optional(),
        activo: z.boolean().optional(),
    }),
});

export type CreateInput = z.infer<typeof createSchema>['body'];
export type UpdateInput = z.infer<typeof updateSchema>['body'];
