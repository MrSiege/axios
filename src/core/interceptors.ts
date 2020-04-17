import * as lambdas from 'lambdas';

import { 
  AxiosInterceptors, 
  RequestInterceptorRES, 
  RequestInterceptorREJ, 
  ResponseInterceptorRES, 
  ResponseInterceptorREJ,
  RequestInterceptor, 
  ResponseInterceptor,
} from '../types';

class InterceptorsManager implements AxiosInterceptors {
  requestInterceptors: RequestInterceptor[];
  responseInterceptors: ResponseInterceptor[];
  private KIMapREQ: Map<String, Number>;
  private KIMapREJ: Map<String, Number>;

  constructor(){
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.KIMapREQ = new Map();
    this.KIMapREJ = new Map();
  }

  /**
   * 注册一个 request 拦截器
   * @param res resolver 函数
   * @param rej reject 函数
   * @return interceptor key 可以用它来注销拦截器
   */
  request(res: RequestInterceptorRES, rej?: RequestInterceptorREJ): string {
    const { requestInterceptors, KIMapREQ } = this;
    const key = lambdas.uuid();
    const length = requestInterceptors.length;
    const index = length === 0 ? 0 : length - 1;
    const interceptor: RequestInterceptor = { resolver: res, reject: rej };
    requestInterceptors.push(interceptor);
    KIMapREQ.set(key, index);
    return key;
  }

  /**
   * 注册一个 response 拦截器
   * @param res resolver 函数
   * @param rej reject 函数
   * @return interceptor key 可以用它来注销拦截器
   */
  response(res: ResponseInterceptorRES, rej?: ResponseInterceptorREJ): string {
    const { responseInterceptors, KIMapREJ } = this;
    const key = lambdas.uuid();
    const length = responseInterceptors.length;
    const index = length === 0 ? 0 : length - 1;
    const interceptor: ResponseInterceptor = { resolver: res, reject: rej };
    responseInterceptors.push(interceptor);
    KIMapREJ.set(key, index);
    return key;
  }

  /**
   * 注销一个拦截器
   * @param interceptorKey 拦截器的键
   */
  destory(interceptorKey: string): void {
    const { requestInterceptors, responseInterceptors, KIMapREQ, KIMapREJ } = this;

    if(KIMapREQ.get(interceptorKey) !== undefined) {
      requestInterceptors.splice(KIMapREQ.get(interceptorKey) as any, 1);
      KIMapREQ.delete(interceptorKey);
    }
    else if(KIMapREJ.get(interceptorKey) !== undefined) {
      responseInterceptors.splice(KIMapREJ.get(interceptorKey) as any, 1);
      KIMapREJ.delete(interceptorKey);
    }
  }
}

export default InterceptorsManager;