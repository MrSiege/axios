import { AxiosException } from '../data.model';
import { AxiosRequestConfig, AxiosResponse } from '../types';

function listenTimeout(
  res: any, 
  rej: any,
  config: AxiosRequestConfig,
  request?: any,
  response?: AxiosResponse,
  timeout?: number,
){
  return () => rej(AxiosException.of(
    `Network request timeout, The timeout time you set is ${timeout} ms`,
    config,
    'ECONNABORTED',
    request,
    response,
  ));
}

export default listenTimeout;