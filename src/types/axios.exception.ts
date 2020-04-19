import { AxiosRequestConfig } from './axios.request.config';
import { AxiosResponse } from './axios.response';

interface AxiosException extends Error {
  isAxiosException: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
}

export { AxiosException }