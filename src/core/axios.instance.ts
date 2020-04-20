import * as lambdas from 'lambdas';
import { default as Axios } from './axios';
import { AxiosInstance as IAxiosInstance,  AxiosRequestConfig, AxiosPromise } from '../types';

function createInstance(): IAxiosInstance & Axios {
  const instance = new Axios();

  function axios<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    // 函数重载，匹配 <T=any>(config: AxiosRequestConfig): AxiosPromise<T>
    if(lambdas.isObject(url) && !config) {
      const RConfig: AxiosRequestConfig = url as any;
      return instance.request<T>(RConfig);
    }
    
    // 函数重载，匹配 <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    return instance.get<T>(url, config);
  }

  // TODO: Object.assign 无法复制 Axios 原型上的属性
  const AxiosInstance: IAxiosInstance & Axios = Object.assign(axios, instance) as any;

  for(const key in instance) {
    (AxiosInstance as any)[key] = (instance as any)[key];
  }

  return AxiosInstance;
}

export default createInstance;