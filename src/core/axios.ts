import * as lambdas from 'lambdas';
import * as utils from '../utils';
import { default as dispatcher } from './dispatcher';
import { default as DefaultConfig } from './default.config';
import { default as InterceptorsManager } from './interceptors';
import { default as createInstance } from './axios.instance';
import { CancelTokenManager } from '../cancel.token';
import { Axios as IAxios, AxiosInstance,  AxiosRequestConfig, AxiosPromise } from '../types';

class Axios extends DefaultConfig implements IAxios {
  // 拦截器管理容器
  interceptors: InterceptorsManager;
  cancelTokens: CancelTokenManager;

  constructor() {
    super();
    this.interceptors = new InterceptorsManager();
    this.cancelTokens = new CancelTokenManager();
  }

  /**
   * 创建一个 AxiosInstance 实例，并且合并参数中的配置到默认配置中
   * @param config 默认配置
   * @return AxiosInstance 实例
   */
  instance(config?: AxiosRequestConfig): AxiosInstance {
    const axiosInstance = createInstance();
    const headers = axiosInstance.config.headers;
    if(config) Object.assign(headers, config.headers);
    if(config) Object.assign(axiosInstance.config, config, { headers });
    return axiosInstance;
  }

  /**
   * 执行 http request 请求
   * @param config 配置项
   * @return AxiosPromise
   */
  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>{
    const { interceptors } = this;
    const { requestInterceptors, responseInterceptors } = interceptors;
    const RConfig = this.SUMConfig(config);
    const { XSRFCookieName, XSRFHeaderName } = RConfig;

    // 设置 xsrf
    if (XSRFCookieName && XSRFHeaderName) RConfig.headers[XSRFHeaderName] = utils.cookieRead(XSRFCookieName);

    const initValue = Promise.resolve(RConfig);
    const iterate = (p: any, i: any) => p.then(i.resolve, i.reject);

    const promiseChain: any[] = [ { resolve: () => dispatcher<T>(RConfig) } ];
    requestInterceptors.map(v => promiseChain.unshift(v));
    responseInterceptors.map(v => promiseChain.push(v));

    const promise = lambdas.reduce(promiseChain, iterate, initValue, undefined);
    return promise;
  }

  /**
   * 执行 http get 请求
   * @param url 请求地址
   * @param config 配置项
   * @return AxiosPromise
   */
  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>{
    const RConfig: AxiosRequestConfig  = { url, method: 'get' };
    if (config) Object.assign(RConfig, config);
    return this.request<T>(RConfig);
  }

  /**
   * 执行 http delete 请求
   * @param url 请求地址
   * @param config 配置项
   * @return AxiosPromise
   */
  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>{
    const RConfig: AxiosRequestConfig  = { url, method: 'delete' };
    if (config) Object.assign(RConfig, config);
    return this.request<T>(RConfig);
  }

  /**
   * 执行 http head 请求
   * @param url 请求地址
   * @param config 配置项
   * @return AxiosPromise
   */
  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>{
    const RConfig: AxiosRequestConfig  = { url, method: 'head' };
    if (config) Object.assign(RConfig, config);
    return this.request<T>(RConfig);
  }

  /**
   * 执行 http options 请求
   * @param url 请求地址
   * @param config 配置项
   * @return AxiosPromise
   */
  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>{
    const RConfig: AxiosRequestConfig  = { url, method: 'options' };
    if (config) Object.assign(RConfig, config);
    return this.request<T>(RConfig);
  }

  /**
   * 执行 http post 请求
   * @param url 请求地址
   * @param data 发送的数据包
   * @param config 配置项
   * @return AxiosPromise
   */
  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>{
    const RConfig: AxiosRequestConfig  = { url, method: 'post', data };
    if (config) Object.assign(RConfig, config);
    return this.request<T>(RConfig);
  }

  /**
   * 执行 http put 请求
   * @param url 请求地址
   * @param data 发送的数据包
   * @param config 配置项
   * @return AxiosPromise
   */
  put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>{
    const RConfig: AxiosRequestConfig  = { url, method: 'put', data };
    if (config) Object.assign(RConfig, config);
    return this.request<T>(RConfig);
  }

  /**
   * 执行 http patch 请求
   * @param url 请求地址
   * @param data 发送的数据包
   * @param config 配置项
   * @return AxiosPromise
   */
  patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>{
    const RConfig: AxiosRequestConfig  = { url, method: 'patch', data };
    if (config) Object.assign(RConfig, config);
    return this.request<T>(RConfig);
  }
}

export default Axios;