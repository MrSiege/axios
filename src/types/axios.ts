import { AxiosRequestConfig } from './axios.request';
import { AxiosInterceptors } from './axios.interceptors';
import { AxiosPromise } from './axios.response';
import { CancelTokenManager } from './axios.cancel.token';

interface AxiosDefaultConfig {
  config: AxiosRequestConfig
}

interface Axios extends AxiosDefaultConfig {
  interceptors: AxiosInterceptors;
  cancelTokens: CancelTokenManager;
  instance(config?: AxiosRequestConfig): AxiosInstance;
  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>;
  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}

interface AxiosInstance extends Axios {
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>;
  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export { AxiosDefaultConfig, Axios, AxiosInstance }