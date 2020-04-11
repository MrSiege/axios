import { AxiosRequestConfig } from './types'

function xhr(config: AxiosRequestConfig): void {
  const { url, data, method = 'get' } = config
  const XHR = new XMLHttpRequest()

  XHR.open(method.toUpperCase(), url)
  XHR.send(data)
}
