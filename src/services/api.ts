import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';

type ErrorMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true,
};

const ShouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

const BACKEND_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export function createAPI (): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  const shownErrors = new Set<string>();
  const ERROR_CLEAR_TIMEOUT = 5000;

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessageType>) => {
      if (error.response) {
        const { status } = error.response;
        let errorMessage = '';

        if (status === 404) {
          errorMessage = 'The requested resource was not found. Check the path and repeat the attempt.';
        } else if (status === 500) {
          errorMessage = 'An error occurred on the server. Please try again later.';
        } else {
          errorMessage = error.response.data.message || 'The server is temporarily unavailable. Try it later.';
        }

        if (ShouldDisplayError(error.response) && !shownErrors.has(errorMessage)) {
          toast.warn(errorMessage);
          shownErrors.add(errorMessage);

          setTimeout(() => shownErrors.delete(errorMessage), ERROR_CLEAR_TIMEOUT);
        }
      } else if (!error.response) {
        const fallbackMessage = 'The server is temporarily unavailable. Try it later.';

        if (!shownErrors.has(fallbackMessage)) {
          toast.error(fallbackMessage);
          shownErrors.add(fallbackMessage);

          setTimeout(() => shownErrors.delete(fallbackMessage), ERROR_CLEAR_TIMEOUT);
        }
      }

      throw error;
    }
  );

  return api;
}
