import { AxiosRequest } from './axios.request';
import { AxiosResponse } from './axios.response';

// 拦截器
interface AxiosInterceptors {
  /**
   * 注册一个 request 拦截器
   * @param res resolver 函数
   * @param rej reject 函数
   * @return 拦截器唯一标示
   */
  request(res: RequestInterceptorRES, rej?: RequestInterceptorREJ): string;
  /**
   * 注册一个 response 拦截器
   * @param res resolver 函数
   * @param rej reject 函数
   * @return 拦截器唯一标示
   */
  response(res: ResponseInterceptorRES, rej?: ResponseInterceptorREJ): string;
  /**
   * 注销一个 request | response 拦截器
   * @param interceptorKey 拦截器唯一标示
   */
  destory(interceptorKey: string): void;
}

interface RequestInterceptorRES { (request: AxiosRequest): void }
interface RequestInterceptorREJ { (error: any): void }
interface ResponseInterceptorRES { (response: AxiosResponse): void }
interface ResponseInterceptorREJ { (error: any): void }
interface RequestInterceptor { resolver: RequestInterceptorRES, reject?: RequestInterceptorREJ }
interface ResponseInterceptor { resolver: ResponseInterceptorRES, reject?: ResponseInterceptorREJ }

export {
  AxiosInterceptors,
  RequestInterceptorRES,
  RequestInterceptorREJ,
  ResponseInterceptorRES,
  ResponseInterceptorREJ,
  RequestInterceptor,
  ResponseInterceptor,
}