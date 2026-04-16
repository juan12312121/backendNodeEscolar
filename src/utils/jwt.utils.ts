import jwt from 'jsonwebtoken';
import { AuthPayload, TokenPair } from '../types';

const ACCESS_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = (process.env.JWT_SECRET as string) + '_refresh';

export function generateTokenPair(payload: Pick<AuthPayload, 'id' | 'correo' | 'rol'>): TokenPair {
    const accessToken = jwt.sign(payload, ACCESS_SECRET);
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } as jwt.SignOptions);
    return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string): AuthPayload {
    return jwt.verify(token, ACCESS_SECRET) as AuthPayload;
}

export function verifyRefreshToken(token: string): AuthPayload {
    return jwt.verify(token, REFRESH_SECRET) as AuthPayload;
}
