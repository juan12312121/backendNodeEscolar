import { Request, Response } from 'express';
import { loginService, refreshService, logoutService } from './auth.service';
import { sendSuccess } from '../../utils/response.utils';
import { asyncHandler } from '../../middleware/error.middleware';
import { LoginInput, RefreshInput } from './auth.validation';

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { correo, contra } = req.body as LoginInput;
    const tokens = await loginService(correo, contra);
    return sendSuccess(res, tokens, 'Inicio de sesion exitoso');
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body as RefreshInput;
    const tokens = await refreshService(refreshToken);
    return sendSuccess(res, tokens, 'Tokens renovados');
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await logoutService(userId);
    return sendSuccess(res, null, 'Sesion cerrada');
});
