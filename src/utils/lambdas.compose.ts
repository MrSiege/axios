import { default as reverse } from './lambdas.reverse';
import { default as flow } from './lambdas.flow';

/**
 * 函数复合，从右到左执行函数列表，上一个函数的执行结果会作为下个函数的给定参数
 * @param funs 函数列表
 * @return 复合后的函数
 */
function compose<T=any>(...funs: any[]): (...args: any[]) => T {
  return flow<T>(...reverse(funs));
}

export default compose;
