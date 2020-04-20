import { axios } from '../src';
import * as utils from './utils';

describe('requests', () => {
  beforeEach(() => jasmine.Ajax.install())
  afterEach(() => jasmine.Ajax.uninstall())

  test('test Axios(url)', () => {
    axios('/echo');
    
    return utils.ajaxRequest().then(request => {
      expect(request.url).toBe('/echo');
      expect(request.method).toBe('GET');
    })
  })

  test('Test CancelToken Whether it takes effect', () => {
    const token = axios.cancelTokens.generate();
    
    axios({
      url: '/echo',
      cancelToken: token,
    });

    return utils.ajaxRequest().then(request => {
      expect(request.url).toBe('/echo');
      expect(request.method).toBe('GET');
    })
  });

  test('Test whether the new instance is available', () => {
    const axios1 = axios.instance();

    axios1({
      url: '/echo',
    });

    return utils.ajaxRequest().then(request => {
      expect(request.url).toBe('/echo');
      expect(request.method).toBe('GET');
    })
  });
})