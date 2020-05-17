import { AxiosRequestConfig } from './axios.request.config';
import { AxiosPromise } from './axios.response';

interface AxiosAdapter {
  (config: AxiosRequestConfig): AxiosPromise
}

export default AxiosAdapter;