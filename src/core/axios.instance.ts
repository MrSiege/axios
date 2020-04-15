import * as lambdas from 'lambdas';
import { default as Axios } from './axios';
import { Axios as IAxios, AxiosInstance as IAxiosInstance,  AxiosRequestConfig, AxiosPromise,  } from '../types';

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

const AxiosInstance: IAxiosInstance & IAxios = Object.assign(axios, instance) as IAxiosInstance & IAxios;

export default AxiosInstance;