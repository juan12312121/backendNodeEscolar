import { Request, Response } from 'express';
import * as service from './plan_estudios.service';
import { sendSuccess } from '../../utils/response.utils';
import { asyncHandler } from '../../middleware/error.middleware';
import { CreateInput, UpdateInput } from './plan_estudios.validation';

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const result = await service.getAll(req.query);
    return sendSuccess(res, result.data, undefined, result.meta);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
    const record = await service.getById(req.params.id);
    return sendSuccess(res, record);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
    const record = await service.create(req.body as CreateInput);
    return sendSuccess(res, record, 'Plan de estudios creado', undefined, 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
    const record = await service.update(req.params.id, req.body as UpdateInput);
    return sendSuccess(res, record, 'Plan de estudios actualizado');
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
    await service.remove(req.params.id);
    return sendSuccess(res, null, 'Plan de estudios desactivado');
});
