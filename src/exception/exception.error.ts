import { AxiosException } from '../data.model';
import { AxiosRequestConfig, AxiosResponse } from '../types';

function listenError(
  res: any, 
  rej: any,
  config: AxiosRequestConfig,
  request?: XMLHttpRequest,
  response?: AxiosResponse,
){
  return () => rej(AxiosException.of(
    'Network Error',
    config,
    undefined,
    request,
    response,
  ));
}

export default listenError;