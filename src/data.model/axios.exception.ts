import { AxiosException as IAxiosException, AxiosRequestConfig, AxiosResponse } from '../types';

class AxiosException extends Error implements IAxiosException {
  isAxiosException: boolean;
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse;

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string,
    request?: any,
    response?: AxiosResponse,
  ){
    super(message);
    this.isAxiosException = true;
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    Object.setPrototypeOf(this, Error);
  }

  static of(
    message: string,
    config: AxiosRequestConfig,
    code?: string,
    request?: any,
    response?: AxiosResponse,
  ): AxiosException{
    return new AxiosException(
      message,
      config,
      code,
      request,
      response,
    );
  }
}

export default AxiosException;