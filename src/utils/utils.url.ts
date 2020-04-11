import * as lambdas from 'lambdas'
import * as lambdasExtends from './lambdas.extends'

/**
 * 将 params 数据包中的参数编译进 url 中
 *  1. 数据类型为 array 时，转为 key[]=value1, key[]=value2
 *  2. 数据类型为 date 时，转为 2020-04-11T13:18:49.174Z ISO 格式字符串
 *  3. 数据类型为 object 时，转为 key1=value1, key2=value2
 *  4. 数据类型为基本类型时，转为 key1=value1
 *
 * @param url url 字符串
 * @param params 参数数据包
 * @return 拼接编译参数后的字符串
 */
function buildURL(url: string, params: object): string {
  // 去掉 url 的 hash
  let URL = url.split('/#/')[0]

  if (!params) {
    return URL
  }

  /**
   * params 中属性可能的值
   * 1. array
   * 2. date
   * 3. 基本类型
   */
  interface Isa {
    (value: any): boolean
  } // 判断类型
  interface Transform {
    (key: string, value: any): string
  } // 转换数据

  // 拼接谓词函数与转换函数
  const transform = (is: Isa, action: Transform) => {
    return (target: any) => (is(target[1]) ? action(target[0], target[1]) : undefined)
  }

  const fromArray: Transform = (key, value) => value.map((v: any) => `${key}[]=${v}`).join('&') // 转换array类型
  const fromDate: Transform = (key, value) => `${key}=${value.toISOString()}` // 转换date类型
  const fromBasic: Transform = (key, value) => `${key}=${value}` // 转换其他基础类型

  const toParamURL = lambdasExtends.dispatch(
    transform(lambdas.isArray, fromArray),
    transform(lambdasExtends.isDate, fromDate),
    (target: any) => fromBasic(target[0], target[1])
  )

  const keys = lambdas.keys(params)
  const values = lambdas.values(params)
  const KV = lambdas.zip(keys, values).filter((v: any) => v[1])
  const paramURL = KV.map((v: any) => toParamURL(v)).join('&')

  return `${URL}${URL.indexOf('?') === -1 ? '?' : '&'}${encodeURIComponent(paramURL)}`
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
    .replace(/%3D/g, '=')
    .replace(/%26/g, '&')
}

export { buildURL }
