import { AxiosRequestConfig, AxiosPromise } from '../types';
import { default as xhr } from './xhr';
import { default as processConfig } from './process.config';

function dispatcher<T>(config: AxiosRequestConfig): AxiosPromise<T> {
  const resolveredConfig = processConfig(config);
  return xhr(resolveredConfig);
}

export default dispatcher;