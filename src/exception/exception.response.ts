import { AxiosException } from '../data.model';
import { AxiosRequestConfig, AxiosResponse } from '../types';

function listenResponse(
  res: any, 
  rej: any,
  config: AxiosRequestConfig,
  request: XMLHttpRequest,
  response?: AxiosResponse,
){
  return () => {
    if(request.status >= 200 && request.status < 300) res(response);
    
    rej(AxiosException.of(
      `Request failed with status code ${request.status}`,
      config,
      undefined,
      request,
      response,
    ));
  }
}

export default listenResponse;