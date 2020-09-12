import * as utils from '../utils';
import * as exception from '../exception';
import { AxiosRequest, AxiosResponse, AxiosPromise } from '../types';

function callback(XHR: XMLHttpRequest, res: any, rej: any, config: AxiosRequest): any {
  return () => {
    if(XHR.readyState !== 4) return;
    if(XHR.status === 0) return;

    const { responseType = 'text' } = config;
    const responseData = responseType === 'text' ? XHR.responseText : XHR.response;

    const headers = (
      XHR.getAllResponseHeaders()
      .split('\r\n')
      .map(v => v.toLowerCase())
      .map(v => v.split(':'))
      .map(([V, K]) => [V.trim(), K.trim()])
    );

    const axiosResponse: AxiosResponse = {
      originalKernel: XHR,
      request: config,
      data: responseData,
      status: XHR.status,
      statusText: XHR.statusText,
      headers: utils.formPairs(headers),
    };

    exception.listenResponse(res, rej, config, axiosResponse);
  }
};

function adapterXHR(config: AxiosRequest): AxiosPromise {
  const { 
    url, 
    data, 
    method = 'get', 
    responseType = 'text', 
    headers,
    timeout = 0,
    cancelToken,
    withCredentials = false,
    onUploaderProgress,
    onDownloadProgress,
  } = config;

  // tslint:disable-next-line:one-variable-per-declaration
  let res: any, rej: any;
  const XHR = new XMLHttpRequest();
  const promise = new Promise<AxiosResponse>((r, e) => { res = r; rej = e});
  const listenTimeout = exception.listenTimeout(res, rej, config, undefined, timeout);
  const listenError = exception.listenError(res, rej, config, undefined);

  // 取消
  if(cancelToken) {
    // tslint:disable-next-line: no-floating-promises
    cancelToken.promise.then((message: string) => { XHR.abort(); rej(message); });

    // 已取消则不执行请求
    if(cancelToken.isCanceled) {
      listenError('CancelToken has expired.');
      return promise;
    };
  }

  Object.assign(XHR, {
    responseType,
    timeout,
    withCredentials,
    ontimeout: listenTimeout,
    onerror: listenError,
    onreadystatechange: callback(XHR, res, rej, config),
  });

  if(data instanceof FormData) delete headers['Content-Type'];
  XHR.open(method.toUpperCase(), url!, true);
  if(onDownloadProgress) XHR.onprogress = onDownloadProgress;
  if(onUploaderProgress) XHR.upload.onprogress = onUploaderProgress;
  utils.pairs(headers).map(VK => XHR.setRequestHeader(VK[0], VK[1]));
  XHR.send(data);
  return promise;
}

export default adapterXHR;