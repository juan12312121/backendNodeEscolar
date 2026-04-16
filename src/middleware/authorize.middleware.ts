import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types';
import { ForbiddenError, UnauthorizedError } from './error.middleware';

export const authorize = (...roles: UserRole[]) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        if (!req.user) {
            return next(new UnauthorizedError());
        }

        if (!roles.includes(req.user.rol)) {
            return next(new ForbiddenError());
        }

        next();
    };
};
