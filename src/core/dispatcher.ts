import * as utils from '../utils';
import { default as xhr } from './xhr';
import { AxiosRequestConfig, AxiosPromise } from '../types';
import { default as processConfig } from './process.config';

/**
 * 派发 http 请求的核心逻辑
 * @param config 
 */
function dispatcher<T>(config: AxiosRequestConfig): AxiosPromise<T> {
  const RConfig = processConfig(config);
  const { transforms = {}, headers, data } = RConfig;
  const { request = [], response = [] } = transforms;

  // 转换 request data
  const warp = (v: any) => (x: any) => v(x, headers);
  const transformsREQ = request.map(warp);
  RConfig.data = utils.flow(...transformsREQ)(data);

  return xhr(RConfig).then(axiosResponse => {
    // 转换 response data
    const { data } = axiosResponse;
    axiosResponse.data = utils.flow(...response)(data);
    return axiosResponse;
  });
}

export default dispatcher;