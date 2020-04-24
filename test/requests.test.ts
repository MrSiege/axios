import { axios } from '../src';
import * as utils from './utils';

describe('requests', () => {
  beforeEach(() => jasmine.Ajax.install())
  afterEach(() => jasmine.Ajax.uninstall())

  test('axios(url, config)', async () => {
    axios('/echo', { method: 'post' });
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('POST');
  })

  test('axios(config)', async () => {
    const token = axios.cancelTokens.generate();
    axios({ url: '/echo', cancelToken: token});
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('GET');
  });

  test('axios.instance(defConfig)', async () => {
    const Axios = axios.instance({ method: 'DELETE' });
    Axios({ url: '/echo' });
    const request = await utils.ajaxRequest()
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('DELETE');
  });

  test('axios.request', async () => {
    axios.request({ url: '/echo' });
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('GET');
  });

  test('axios.get', async () => {
    axios.get('/echo');
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('GET');
  });

  test('axios.delete', async () => {
    axios.delete('/echo');
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('DELETE');
  });

  test('axios.head', async () => {
    axios.head('/echo');
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('HEAD');
  });

  test('axios.options', async () => {
    axios.options('/echo');
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('OPTIONS');
  });

  test('axios.post', async () => {
    axios.post('/echo');
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('POST');
  });

  test('axios.put', async () => {
    axios.put('/echo');
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('PUT');
  });

  test('axios.patch', async () => {
    axios.patch('/echo');
    const request = await utils.ajaxRequest();
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('PATCH');
  });
})