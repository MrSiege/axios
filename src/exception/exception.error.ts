import { AxiosException } from '../data.model';
import { AxiosRequest, AxiosResponse } from '../types';

function listenError(
  res: any, 
  rej: any,
  request?: AxiosRequest,
  response?: AxiosResponse,
){
  return (error: string = 'Network Error') => rej(AxiosException.of(
    error,
    undefined,
    request,
    response,
  ));
}

export default listenError;