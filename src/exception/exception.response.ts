import { AxiosException } from '../data.model';
import { AxiosRequest, AxiosResponse } from '../types';

function listenResponse(
  res: any, 
  rej: any,
  request: AxiosRequest,
  response: AxiosResponse,
){
  return () => {
    if(response.status >= 200 && response.status < 300) res(response);
    
    rej(AxiosException.of(
      `Request failed with status code ${response.status}`,
      undefined,
      request,
      response,
    ));
  }
}

export default listenResponse;