import { AxiosRequest } from './axios.request';
import { AxiosResponse } from './axios.response';

interface AxiosException extends Error {
  isAxiosException: boolean
  code?: string
  request?: AxiosRequest
  response?: AxiosResponse
}

export { AxiosException }