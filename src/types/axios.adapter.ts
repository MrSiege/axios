import { AxiosRequest } from './axios.request';
import { AxiosPromise } from './axios.response';

interface AxiosAdapter {
  (config: AxiosRequest): AxiosPromise
}

export default AxiosAdapter;