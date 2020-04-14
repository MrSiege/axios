type Method =
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

interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: XMLHttpRequest
}

interface AxiosPromise extends Promise<AxiosResponse> {}

interface AxiosException extends Error {
  isAxiosException: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
}

export { Method, AxiosRequestConfig, AxiosResponse, AxiosPromise, AxiosException }
