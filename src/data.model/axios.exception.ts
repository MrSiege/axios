import { AxiosException as IAxiosException, AxiosRequest, AxiosResponse } from '../types';

class AxiosException extends Error implements IAxiosException {
  isAxiosException: boolean;
  code?: string;
  request?: AxiosRequest;
  response?: AxiosResponse;

  constructor(
    message: string,
    code?: string,
    request?: any,
    response?: AxiosResponse,
  ){
    super(message);
    this.isAxiosException = true;
    this.code = code;
    this.request = request;
    this.response = response;
    Object.setPrototypeOf(this, Error);
  }

  static of(
    message: string,
    code?: string,
    request?: AxiosRequest,
    response?: AxiosResponse,
  ): AxiosException{
    return new AxiosException(
      message,
      code,
      request,
      response,
    );
  }
}

export default AxiosException;