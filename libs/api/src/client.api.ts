import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

export const createClient = ({
  baseURL,
  refreshTokenURL = 'user/refresh-token',
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  updateRefreshToken,
  onUnauthorized,
}: CreateApiProps) => {
  // Состояние процесса обновления токена
  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  // Обработка очереди запросов, ожидающих обновления токена
  const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    });
    failedQueue = [];
  };

  // Создаём экземпляр axios
  const apiClient: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // Перехватчик запросов
  apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // Если запрос повторяется после обновления токена, заголовок уже проставлен вручную
    if (config._retry) return config;

    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // Перехватчик ответов с поддержкой skipAuthRefresh: обработка 401
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;

      // Условия, при которых НЕ пытаемся обновлять токен:
      // 1. Статус не 401
      // 2. Запрос уже повторялся (_retry = true)
      // 3. Запрос явно помечен skipAuthRefresh = true
      if (error.response?.status !== 401 || originalRequest._retry || originalRequest.skipAuthRefresh === true) {
        return Promise.reject(error);
      }

      // Если уже идёт процесс обновления — ставим запрос в очередь
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Вызываем endpoint обновления токена
        const response = await apiClient.post(refreshTokenURL, { refreshToken: getRefreshToken() });
        const { accessToken, refreshToken } = response.data;

        // Сохраняем новый токен
        updateAccessToken(accessToken);
        updateRefreshToken(refreshToken);

        // Обновляем заголовок Authorization в исходном запросе
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Обрабатываем очередь
        processQueue(null, accessToken);

        // Повторяем исходный запрос
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Если refresh не удался — отклоняем все ожидающие запросы
        processQueue(refreshError as Error, null);
        // Можно также очистить локальное хранилище и перенаправить на логин
        updateAccessToken(null);
        updateRefreshToken(null);
        onUnauthorized();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );

  return apiClient;
};

export interface CreateApiProps {
  baseURL: string;
  refreshTokenURL?: string;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  updateAccessToken: (token: string | null) => void;
  updateRefreshToken: (token: string | null) => void;
  onUnauthorized: () => void;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
    skipAuthRefresh?: boolean;
  }
}
