import { Response } from "express";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message?: string,
  meta?: PaginationMeta,
  statusCode = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    data,
    message: message || "Operation successful",
    ...(meta && { meta }),
  } as SuccessResponse<T>);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 400,
  errors?: Array<{ field: string; message: string }>
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && errors.length > 0 && { errors }),
  } as ErrorResponse);
};
