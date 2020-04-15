import * as lambdas from 'lambdas';
import * as utils from '../utils';
import { AxiosRequestConfig } from '../types';

/**
 * 转换 config 的 url
 * @param config 配置对象
 * @return AxiosRequestConfig 配置
 */
function transformURL(config: AxiosRequestConfig): AxiosRequestConfig {
  const { url, params } = config;
  config.url = utils.buildURL(url, params);
  return config;
}

/**
 * 转换 config 的 data
 * @param config 配置对象
 * @return AxiosRequestConfig 配置
 */
function transformData(config: AxiosRequestConfig): AxiosRequestConfig {
  const { data } = config;
  config.data = lambdas.isObject(data) ? JSON.stringify(data) : data;

  if(!config.data){
    delete config.data;
  }

  return config;
}

/**
 * 转换 config 的 headers
 * @param config 配置对象
 * @return AxiosRequestConfig 配置
 */
function transformHeaders(config: AxiosRequestConfig): AxiosRequestConfig {
  const { headers = {}, data } = config;
  headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : headers['content-type'];
  delete headers['content-type'];

  // 如果不存在 Content-Type，并且 data 为对象，则自动设置 Content-Type
  if(!lambdas.exist(headers['Content-Type']) && lambdas.isObject(data)){
    headers['Content-Type'] = 'application/json;charset=utf-8';
  }

  // 删除无效的 Content-Type
  if(!headers['Content-Type']){
    delete headers['Content-Type'];
  }

  config.headers = headers;
  return config;
}

export { 
  transformURL, 
  transformData,
  transformHeaders,
};