import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.utils';
import { UnauthorizedError } from './error.middleware';

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new UnauthorizedError('Token no proporcionado'));
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = verifyAccessToken(token);
        next();
    } catch {
        next(new UnauthorizedError('Token invalido o expirado'));
    }
};
