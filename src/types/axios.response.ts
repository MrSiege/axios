import { AxiosRequestConfig } from './axios.request.config';

interface AxiosResponse<T=any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: XMLHttpRequest
}

interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

export { AxiosResponse, AxiosPromise }