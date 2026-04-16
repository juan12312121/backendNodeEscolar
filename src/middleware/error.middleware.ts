import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { sendError } from '../utils/response.utils';

// ----------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------

export interface FieldError {
    field: string;
    message: string;
}

export interface IAppError {
    statusCode: number;
    message: string;
    errors?: FieldError[];
    isOperational: boolean;
}

// ----------------------------------------------------------------
// Clase base
// ----------------------------------------------------------------

export class AppError extends Error implements IAppError {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly errors?: FieldError[];

    constructor(message: string, statusCode: number = 500, errors?: FieldError[]) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = true;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

// ----------------------------------------------------------------
// Errores 4xx
// ----------------------------------------------------------------

export class BadRequestError extends AppError {
    constructor(message: string = 'Solicitud invalida', errors?: FieldError[]) {
        super(message, 400, errors);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'No autorizado') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Acceso denegado') {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Recurso no encontrado') {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'El recurso ya existe') {
        super(message, 409);
    }
}

export class ValidationError extends AppError {
    constructor(errors: FieldError[], message: string = 'Error de validacion') {
        super(message, 422, errors);
    }
}

// ----------------------------------------------------------------
// Handler global
// ----------------------------------------------------------------

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): Response => {
    // Error operacional conocido
    if (err instanceof AppError) {
        return sendError(res, err.message, err.statusCode, err.errors);
    }

    // Errores de Prisma
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                return sendError(res, 'El registro ya existe (valor duplicado)', 409);
            case 'P2025':
                return sendError(res, 'Registro no encontrado', 404);
            case 'P2003':
                return sendError(res, 'Referencia invalida: el recurso relacionado no existe', 400);
            case 'P2014':
                return sendError(res, 'La relacion entre los registros es invalida', 400);
            default:
                break;
        }
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        return sendError(res, 'Datos enviados al servidor invalidos', 400);
    }

    // Error no operacional: no exponer detalles internos
    console.error({
        timestamp: new Date().toISOString(),
        name: err.name,
        message: err.message,
        stack: err.stack,
    });

    return sendError(res, 'Error interno del servidor', 500);
};

// ----------------------------------------------------------------
// Async handler
// ----------------------------------------------------------------

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
