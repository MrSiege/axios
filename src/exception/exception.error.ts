import { AxiosException } from '../data.model';
import { AxiosRequestConfig, AxiosResponse } from '../types';

function listenError(
  res: any, 
  rej: any,
  config: AxiosRequestConfig,
  request?: any,
  response?: AxiosResponse,
){
  return (error: string = 'Network Error') => rej(AxiosException.of(
    error,
    config,
    undefined,
    request,
    response,
  ));
}

export default listenError;