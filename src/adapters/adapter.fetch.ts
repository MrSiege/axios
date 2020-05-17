import * as utils from '../utils';
import * as exception from '../exception';
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types';

function adapterFetch(config: AxiosRequestConfig): AxiosPromise {
  const { 
    url, 
    data, 
    method,
    headers,
    timeout = 0,
    cancelToken,
    responseType = 'text', 
    withCredentials = false,
    onUploaderProgress = () => null,
    onDownloadProgress = () => null,
  } = config;

  const options: any = {
    method,
    headers,
    body: data,
    mode: 'cors',
    credentials: 'include',
  };

  // tslint:disable-next-line:one-variable-per-declaration
  let res: any, rej: any;
  const promise = new Promise<AxiosResponse>((r, e) => { res = r; rej = e});
  
  fetch(url!, options)
  .then(r => exception.listenResponse(res, rej, config, undefined, r)())
  .catch(e => console.log(e))

  return promise;
}

export default adapterFetch;