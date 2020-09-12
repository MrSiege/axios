import { CancelToken } from './axios.cancel.token';
import { default as AxiosAdapter } from './axios.adapter';

type Method = (
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'
)

interface TransformRequest { (data: any, headers?: any): any }
interface TransformResponse { (data: any): any }

interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  cancelToken?: CancelToken
  withCredentials?: boolean
  XSRFCookieName?: string
  XSRFHeaderName?: string
  onUploaderProgress?: (e: ProgressEvent) => void
  onDownloadProgress?: (e: ProgressEvent) => void
  auth?: { username: string, password: string }
  adapter?: AxiosAdapter
  transforms?: {
    request?: TransformRequest[],
    response?: TransformResponse[],
  },
}

interface AxiosRequest {
  config: AxiosRequestConfig,
  url: string,
  status: number,
  remoteAddress: string,
  method: Method,
  headers: object,
  body: object,
}

export { Method, AxiosRequest, AxiosRequestConfig, TransformRequest, TransformResponse }