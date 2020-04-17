import * as utils from '../utils';
import * as exception from '../exception';
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types';

function xhr(config: AxiosRequestConfig): AxiosPromise {
  const { 
    url, 
    data, 
    method = 'get', 
    responseType = 'text', 
    headers,
    timeout = 0,
  } = config;

  let res: any = () => null;
  let rej: any = () => null;
  const promise = new Promise<AxiosResponse>((r, e) => { res = r; rej = e});
  const XHR = new XMLHttpRequest();

  const callback = function () : any {
    if(XHR.readyState !== 4) return;
    if(XHR.status === 0) return;
    const responseData = responseType === 'text' ? XHR.responseText : XHR.response;

    const headers = (
      XHR.getAllResponseHeaders()
      .split('\r\n')
      .map(v => v.toLowerCase())
      .map(v => v.split(':'))
      .map(VK => [VK[0].trim(), VK[1].trim()])
    );

    const axiosResponse: AxiosResponse = {
      config,
      request: XHR,
      data: responseData,
      status: XHR.status,
      statusText: XHR.statusText,
      headers: utils.formPairs(headers),
    };

    exception.listenResponse(res, rej, config, XHR, axiosResponse);
  };

  XHR.responseType = responseType;
  XHR.onreadystatechange = callback;
  XHR.timeout = timeout;
  XHR.ontimeout = exception.listenTimeout(res, rej, config, XHR, undefined, timeout);
  XHR.onerror = exception.listenError(res, rej, config, XHR, undefined);
  XHR.open(method.toUpperCase(), url, true);
  utils.pairs(headers).map(VK => XHR.setRequestHeader(VK[0], VK[1]));
  XHR.send(data);
  return promise;
}

export default xhr;