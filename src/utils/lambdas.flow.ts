import * as lambdas from 'lambdas'
import { default as head } from './lambdas.head';
import { default as tail } from './lambdas.tail';

/**
 * 函数流，从左到右执行函数列表，上一个函数的执行结果会作为下个函数的给定参数
 * @see compose
 * @param funs 函数列表
 * @return 复合后的函数
 */
function flow<T=any>(...funs: any[]): (...args: any[]) => T {
  if(funs.length === 0) return (...args: any[]) => args as any;

  return (...args: any[]) => {
    const first = head(funs);

    return lambdas.reduce(
      tail(funs),
      (result, fun) => fun(result), 
      first(...args),
      null
    );
  }
}

export default flow;
