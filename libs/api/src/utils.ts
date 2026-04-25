import axios, { type AxiosError, CanceledError } from 'axios';

import { type ApiErrorResponse, HttpStatus } from '@nono-art/api-types';
import { isEnumValue, isObjectLike } from '@nono-art/utils';

export enum ApiErrorCode {
  canceled = 'CANCELED',
  networkError = 'NETWORK_ERROR',
  timeout = 'TIMEOUT',
  httpError = 'HTTP_ERROR',
  unknownError = 'UNKNOWN_ERROR',
}

/**
 * Унифицированный формат ошибки API в приложении
 */
export interface ApiError extends Omit<ApiErrorResponse, 'status'> {
  readonly message: string;
  readonly code: ApiErrorCode;
  readonly status?: number | HttpStatus | undefined;
  readonly originalError?: unknown;
  readonly data?: any;
  readonly apiErrorRes?: Partial<ApiErrorResponse>;
}

export const getApiError = (error: unknown): ApiError => {
  // 1. Проверяем отмену запроса
  if (error instanceof CanceledError) {
    const apiErrorRes = getApiErrorResponse(error);

    return {
      status: HttpStatus.CLIENT_CLOSED_REQUEST,
      message: 'запрос был отменён',
      code: ApiErrorCode.canceled,
      originalError: error,
      ...(!!apiErrorRes ? { apiErrorRes } : {}),
    };
  }

  // 2. Проверяем, что это ошибка Axios
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    const apiErrorRes = getApiErrorResponse(axiosError);

    // 2.0. Тайм-аут
    if (axiosError.code === 'ECONNABORTED')
      return {
        status: axiosError.status,
        message: 'превышено время ожидания ответа от сервера',
        code: ApiErrorCode.timeout,
        originalError: error,
        ...(!!apiErrorRes ? { apiErrorRes } : {}),
      };

    // 2.1. Ошибка пришла с ответом от сервера (4xx, 5xx)
    if (!!axiosError.response)
      return {
        message: apiErrorRes?.message || 'что-то пошло не так',
        status: apiErrorRes?.status || axiosError.response.status,
        code: ApiErrorCode.httpError,
        data: axiosError.response.data,
        originalError: error,
        ...(!!apiErrorRes ? { apiErrorRes } : {}),
      };

    // 2.2. Запрос был сделан, но ответ не получен (сетевая ошибка)
    if (!!axiosError.request)
      return {
        status: axiosError.status,
        message: 'сервер недоступен. Проверьте подключение к интернету',
        code: ApiErrorCode.networkError,
        originalError: error,
        ...(!!apiErrorRes ? { apiErrorRes } : {}),
      };

    // 2.3. Ошибка при настройке запроса (например, неверный URL)
    return {
      status: axiosError.status,
      message: axiosError.message || 'ошибка при выполнении запроса',
      code: ApiErrorCode.unknownError,
      originalError: error,
      ...(!!apiErrorRes ? { apiErrorRes } : {}),
    };
  }

  // 3. Ошибка не связана с Axios (например, ошибка в коде, выброшенная строка и т.д.)
  if (error instanceof Error)
    return {
      message: error.message,
      code: ApiErrorCode.unknownError,
      originalError: error,
    };

  // 4. Вообще непонятно что (например, выброшена строка)
  return {
    message: String(error),
    code: ApiErrorCode.unknownError,
    originalError: error,
  };
};

const getApiErrorResponse = (error: AxiosError): Partial<ApiErrorResponse> | null => {
  if (!error.response) return null;
  if (!isObjectLike(error.response.data)) return null;

  const message = getApiErrorResponseMessage(error.response.data);
  const status = getApiErrorResponseStatus(error.response.data);

  if (!message && !status) return null;

  const res: Partial<ApiErrorResponse> = {
    ...(!!message ? { message } : {}),
    ...(!!status ? { status } : {}),
  };

  return res;
};

const getApiErrorResponseMessage = ({ message }: Record<string, unknown>): string | null => {
  if (!message) return null;
  if (typeof message !== 'string') return null;

  return message;
};

const getApiErrorResponseStatus = ({ status }: Record<string, unknown>): HttpStatus | null => {
  if (!status) return null;
  if (typeof status !== 'number') return null;
  if (!isEnumValue(HttpStatus, status)) return null;
  return status;
};
