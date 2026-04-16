import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError, FieldError } from './error.middleware';

export const validate = (schema: ZodSchema) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        if (!result.success) {
            const errors: FieldError[] = result.error.issues.map((issue) => ({
                field: issue.path.slice(1).join('.'),
                message: issue.message,
            }));
            return next(new ValidationError(errors));
        }

        next();
    };
};
