import { default as dispatcher } from './dispatcher';
import { Axios as IAxios,  AxiosRequestConfig, AxiosPromise } from '../types';

class Axios implements IAxios {
  /**
   * 执行 http request 请求
   * @param config 配置项
   * @return AxiosPromise
   */
  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>{
    return dispatcher<T>(config);
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
    return dispatcher<T>(RConfig);
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
    return dispatcher<T>(RConfig);
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
    return dispatcher<T>(RConfig);
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
    return dispatcher<T>(RConfig);
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
    return dispatcher<T>(RConfig);
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
    return dispatcher<T>(RConfig);
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
    return dispatcher<T>(RConfig);
  }
}

export default Axios;