import { CancelToken as ACancelToken } from '../types';

class CancelToken extends ACancelToken {
  cancel(reason?: string): void {
    this.trigger(reason);
    this.canceled = true;
  }
}

export default CancelToken;