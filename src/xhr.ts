import * as lambdas from 'lambdas';
import * as utils from './utils';
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  let doResolver: any = () => null;
  const promise = new Promise<AxiosResponse>(r => doResolver = r);
  const { url, data, method = 'get', responseType = 'text', headers } = config;
  const XHR = new XMLHttpRequest();

  const callback = function () : any {
    if(XHR.readyState !== 4) return;
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

    doResolver(axiosResponse);
  };

  XHR.responseType = responseType;
  XHR.onreadystatechange = callback;
  XHR.open(method.toUpperCase(), url, true);
  utils.pairs(headers).map(VK => XHR.setRequestHeader(VK[0], VK[1]));
  XHR.send(data);
  return promise;
}

export default xhr;