import { axios, adapters } from '../src';
import * as utils from './utils';
const fetchAxios = axios.instance({ adapter: adapters.fetch });

describe('adapters', () => {
  beforeEach(() => jasmine.Ajax.install())
  afterEach(() => jasmine.Ajax.uninstall())

  test('adapters.fetch', async () => {
    fetchAxios('/echo', { method: 'post' });
    const request = await utils.ajaxRequest();
    console.log(request);
    // expect(request.url).toBe('/echo');
    // expect(request.method).toBe('POST');
  })
})