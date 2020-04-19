import { CancelTokenManager as ACancelTokenManager } from '../types';
import { default as CancelToken } from './cancel.token';

class CancelTokenManager extends ACancelTokenManager {
  generate(){
    const cancelToken = new CancelToken();
    return cancelToken;
  }


}

export default CancelTokenManager;