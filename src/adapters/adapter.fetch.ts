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

  const success = (r: Response) => {
    const response: AxiosResponse = {
      data: r.body,
      status: r.status,
      statusText: r.statusText,
      headers: r.headers,
      request: config,
      originalKernel: r,
    }

    exception.listenResponse(res, rej, config, response)();
  }

  const fail = (e: any) => {
    console.log(e);
    exception.listenError(res, rej, config, undefined)()
  }

  if(timeout > 0) setTimeout(exception.listenTimeout(res, rej, config, undefined), timeout);
  fetch(url!, options).then(success).catch(fail);

  return promise;
}

export default adapterFetch;