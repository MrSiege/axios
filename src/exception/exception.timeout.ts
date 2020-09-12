import { AxiosException } from '../data.model';
import { AxiosRequest, AxiosResponse } from '../types';

function listenTimeout(
  res: any, 
  rej: any,
  request?: AxiosRequest,
  response?: AxiosResponse,
  timeout?: number,
){
  return () => rej(AxiosException.of(
    `Network request timeout, The timeout time you set is ${timeout} ms`,
    'ECONNABORTED',
    request,
    response,
  ));
}

export default listenTimeout;