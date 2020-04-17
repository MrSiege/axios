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

interface TransformRequest { (data: any, headers?: any): any }
interface TransformResponse { (data: any): any }

interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transforms?: {
    request?: TransformRequest[],
    response?: TransformResponse[],
  }
}

interface AxiosDefaultConfig {
  config: AxiosRequestConfig
}

interface AxiosResponse<T=any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: XMLHttpRequest
}

interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

interface AxiosException extends Error {
  isAxiosException: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
}

interface Axios extends AxiosDefaultConfig {
  interceptors: AxiosInterceptors;
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

// 拦截器
interface AxiosInterceptors {
  request(res: RequestInterceptorRES, rej?: RequestInterceptorREJ): string;
  response(res: ResponseInterceptorRES, rej?: ResponseInterceptorREJ): string;
  destory(interceptorKey: string): void;
}

interface RequestInterceptorRES { (request: AxiosRequestConfig): void }
interface RequestInterceptorREJ { (error: any): void }
interface ResponseInterceptorRES { (response: AxiosResponse): void }
interface ResponseInterceptorREJ { (error: any): void }
interface RequestInterceptor { resolver: RequestInterceptorRES, reject?: RequestInterceptorREJ }
interface ResponseInterceptor { resolver: ResponseInterceptorRES, reject?: ResponseInterceptorREJ }

export { 
  Method, 
  AxiosRequestConfig,
  AxiosDefaultConfig,
  AxiosResponse, 
  AxiosPromise, 
  AxiosException, 
  Axios, 
  AxiosInstance,
  AxiosInterceptors,
  RequestInterceptorRES,
  RequestInterceptorREJ,
  ResponseInterceptorRES,
  ResponseInterceptorREJ,
  RequestInterceptor,
  ResponseInterceptor,
}
