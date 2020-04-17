import { Axios } from '../src';
import * as utils from './utils';

describe('requests', () => {
  beforeEach(() => jasmine.Ajax.install())
  afterEach(() => jasmine.Ajax.uninstall())

  test('test Axios(url)', () => {
    Axios('/echo');
    
    return utils.ajaxRequest().then(request => {
      expect(request.url).toBe('/echo');
      expect(request.method).toBe('GET');
    })
  })
})