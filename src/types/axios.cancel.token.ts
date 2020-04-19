import * as lambdas from 'lambdas';
/**
 * CancelToken 管理容器
 */
abstract class CancelTokenManager {
  /**
   * 生成一个 CancelToken
   * @return CancelToken 实例
   */
  abstract generate(): CancelToken;
}

/**
 * CancelToken 取消令牌
 */
abstract class CancelToken {
  protected canceled: boolean;
  readonly token: any;
  readonly trigger: any;
  readonly promise: Promise<any>;
  readonly $hashcode: string;

  constructor(){
    let doResolver: any = null;
    this.promise = new Promise<any>(r => doResolver = r);
    this.trigger = doResolver;
    this.$hashcode = lambdas.uuid();
    this.canceled = false;
  }

  /**
   * 取消令牌所在的请求操作
   * @param reason 取消原因
   */
  abstract cancel(reason?: string): void

  get isCanceled() : boolean {
    return this.canceled;
  }
}

export { CancelTokenManager, CancelToken }