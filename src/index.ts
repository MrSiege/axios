import { AxiosRequestConfig } from './types'
import * as utils from './utils'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = utils.buildURL(config.url, config.params)
}
