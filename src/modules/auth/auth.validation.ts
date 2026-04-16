import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        correo: z.string().email('Correo invalido'),
        contra: z.string().min(1, 'La contrasena es requerida'),
    }),
});

export const refreshSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1, 'El refresh token es requerido'),
    }),
});

export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RefreshInput = z.infer<typeof refreshSchema>['body'];
