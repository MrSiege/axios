import { AxiosRequest } from './axios.request';

interface AxiosResponse<T=any> {
  data: T
  status: number
  statusText: string
  headers: object
  request: AxiosRequest
  originalKernel: any
}

interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

export { AxiosResponse, AxiosPromise }