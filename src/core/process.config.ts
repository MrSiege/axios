import * as utils from '../utils';
import { AxiosRequestConfig } from '../types';
import { transformURL, transformHeaders, transformData } from './transform';

function processConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  const resolver = utils.flow<AxiosRequestConfig>(
    transformURL,
    transformHeaders,
    transformData,
  );
  
  return resolver(config);
}

export default processConfig;