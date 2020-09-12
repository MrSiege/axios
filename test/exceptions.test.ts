import * as exceptions from '../src/exception';

describe('exceptions', () => {
  test('exceptions.listenError', () => new Promise((res, rej) => {
    const config = { url: '' };
    const listenError = exceptions.listenError(res, rej, config);
    setTimeout(() => listenError('system error'));
  }).catch(error => {
    expect(error.isAxiosException).toBe(true);
  }));

  test('exception.listenResponse request succes', () => new Promise((res, rej) => {
    const config = { url: '' };
    const response: any = { data: 'echo' };
    const listenResponse = exceptions.listenResponse(res, rej, config, response);
    setTimeout(() => listenResponse());
  }).then((response: any) => {
    expect(response.data).toEqual('echo');
  }));

  test('exception.listenResponse request fail', () => new Promise((res, rej) => {
    const config = { url: '', status: 500 };
    const response: any = { };
    const listenResponse = exceptions.listenResponse(res, rej, config, response);
    setTimeout(() => listenResponse());
  }).catch((error: any) => {
    const { request } = error;
    expect(request.status).toBe(500);
  }));

  test('exception.listenTimeout', () => new Promise((res, rej) => {
    const config = { url: '' };
    const response: any = { status: 404 };
    const listenTimeout = exceptions.listenTimeout(res, rej, config, response);
    setTimeout(() => listenTimeout());
  }).catch((error: any) => {
    const { response } = error;
    expect(response.status).toBe(404);
    expect(error.code).toBe('ECONNABORTED');
  }));
})