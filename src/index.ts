import { AxiosRequestConfig, AxiosPromise } from './types';
import * as utils from './utils';
import * as transform from './transform';
import { default as xhr } from './xhr';

function axios(config: AxiosRequestConfig): AxiosPromise {
  const resolverConfig = utils.flow<AxiosRequestConfig>(
    processConfig,
  );

  const axiosConfig = resolverConfig(config);
  console.log(axiosConfig);
  return xhr(config);
}

function processConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  return utils.flow<AxiosRequestConfig>(
    transform.transformURL,
    transform.transformHeaders,
    transform.transformData,
  )(config);
}

axios({
  url: 'http://wiki.haskell.org/',
  data: {},
});

axios({
  url: 'http://wiki.haskell.org',
  headers: {
    'content-type': 'application/javascript'
  }
});

axios({
  url: 'http://wiki.haskell.org/',
  params: {
    name: 'wei',
    beginDate: new Date(),
    endDate: new Date(),
    queryKeys: [
      'Antoneva',
      'An',
      'Wen Xin',
    ]
  }
});