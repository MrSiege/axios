import * as lambdas from 'lambdas';
import { AxiosRequestConfig, AxiosDefaultConfig, Method } from '../types';

class DefaultConfig implements AxiosDefaultConfig {
  config: AxiosRequestConfig = {
    url: '',
    method: 'GET',
    timeout: 0,
    withCredentials: false,
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
      }
    },
  }

  constructor(){
    const { config } = this;
    ['get', 'post', 'put', 'delete', 'options', 'head', 'patch'].map(v => config.headers[v] = {});
    ['post', 'put', 'patch'].map(v => config.headers[v]['Content-Type'] = 'application/x-www-form-urlencode');
  }

  /**
   * 合并默认配置和外部传递的配置，合并规则如下
   *  1. 以外部传递的配置为主，外部的配置会覆盖默认配置
   *  2. 默认配置里的 headers 属性说明
   *   a. common 里的配置合并到任何方法的请求中
   *   b. 除 common 命名空间之外的配置只会合并到相对应的请求方法中
   * 
   * @param config 外部传递的配置
   * @return 合并后的配置
   */
  SUMConfig(config: AxiosRequestConfig): AxiosRequestConfig {
    const RConfig = lambdas.clonedeep(this.config);;
    const { headers } = RConfig;
    const method = (config.method || 'get').toLocaleLowerCase();
    
    Object.assign(RConfig, config);
    Object.assign(RConfig.headers, headers.common);
    Object.assign(RConfig.headers, headers[method] || {})

    return RConfig
  }
}

export default DefaultConfig;