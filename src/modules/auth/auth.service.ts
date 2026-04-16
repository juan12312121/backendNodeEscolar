import prisma from '../../config/database';
import { comparePassword } from '../../utils/hash.utils';
import { generateTokenPair, verifyRefreshToken } from '../../utils/jwt.utils';
import { UnauthorizedError } from '../../middleware/error.middleware';
import { TokenPair, UserRole } from '../../types';

export async function loginService(correo: string, contra: string): Promise<TokenPair> {
    const usuario = await prisma.usuarios.findUnique({ where: { correo } });

    if (!usuario || !usuario.activo) {
        throw new UnauthorizedError('Credenciales invalidas');
    }

    const passwordValid = await comparePassword(contra, usuario.contra);
    if (!passwordValid) {
        throw new UnauthorizedError('Credenciales invalidas');
    }

    const tokens = generateTokenPair({ id: usuario.id, correo: usuario.correo, rol: usuario.rol as UserRole });

    const refreshExp = new Date();
    refreshExp.setDate(refreshExp.getDate() + 1);

    await prisma.usuarios.update({
        where: { id: usuario.id },
        data: { refresh_token: tokens.refreshToken, refresh_exp: refreshExp },
    });

    return tokens;
}

export async function refreshService(refreshToken: string): Promise<TokenPair> {
    let payload;
    try {
        payload = verifyRefreshToken(refreshToken);
    } catch {
        throw new UnauthorizedError('Token invalido o expirado');
    }

    const usuario = await prisma.usuarios.findUnique({ where: { id: payload.id } });

    if (!usuario || !usuario.activo) {
        throw new UnauthorizedError('Token invalido');
    }

    if (usuario.refresh_token !== refreshToken) {
        throw new UnauthorizedError('Token invalido o expirado');
    }

    if (!usuario.refresh_exp || usuario.refresh_exp < new Date()) {
        throw new UnauthorizedError('Token expirado');
    }

    const tokens = generateTokenPair({ id: usuario.id, correo: usuario.correo, rol: usuario.rol as UserRole });

    const refreshExp = new Date();
    refreshExp.setDate(refreshExp.getDate() + 1);

    await prisma.usuarios.update({
        where: { id: usuario.id },
        data: { refresh_token: tokens.refreshToken, refresh_exp: refreshExp },
    });

    return tokens;
}

export async function logoutService(userId: string): Promise<void> {
    await prisma.usuarios.update({
        where: { id: userId },
        data: { refresh_token: null, refresh_exp: null },
    });
}
