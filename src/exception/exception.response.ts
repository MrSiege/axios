import { AxiosException } from '../data.model';
import { AxiosRequestConfig, AxiosResponse } from '../types';

function listenResponse(
  res: any, 
  rej: any,
  config: AxiosRequestConfig,
  request?: XMLHttpRequest,
  response?: AxiosResponse,
){
  return () => {
    if(res.status >= 200 && res.status < 300) res(response);
    
    rej(AxiosException.of(
      `Request failed with status code ${res.status}`,
      config,
      undefined,
      request,
      response,
    ));
  }
}

export default listenResponse;