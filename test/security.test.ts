import { axios } from '../src';
import * as utils from './utils';

describe('axios security test', () => {
  beforeEach(() => jasmine.Ajax.install())
  afterEach(() => jasmine.Ajax.uninstall())

  test('axios config auth HTTP Authorization', async () => {
    const auth = { username: 'william', password: '123456' };
    axios('/echo', { method: 'post', auth });
    const request = await utils.ajaxRequest();

    const up = atob(request.requestHeaders.Authorization.split(' ')[1]);
    expect(request.url).toBe('/echo');
    expect(request.method).toBe('POST');
    expect(up).toBe('william:123456');
  })
})