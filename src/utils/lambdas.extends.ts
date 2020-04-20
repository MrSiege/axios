import * as lambdas from 'lambdas'

/**
 * 接受一个方法，如果给定对象存在该方法则调用它
 * @param name 方法名
 * @param method 函数
 * @return invoker 函数
 */
function invoker(name: string, method: any): (target: any, ...args: any[]) => any {
  return (target: any, ...args: any[]) => {
    const targetMethod = target[name]

    if(targetMethod && method === targetMethod) return targetMethod.apply(target, args);
    else return undefined;
  }
}

/**
 * 创建一个多态函数，将函数列表映射到给定对象，并返回第一个存在的值
 * 1. 确保目标的存在
 * 2. 检查是否有原生版本，如果有则使用它
 * 3. 如果没有，则做一些实现这些行为的具体任务
 *   · 做特定类型的任务（如果适用）
 *   · 做特定参数的任务（如果适用）
 *   · 做特定个参数的任务（如果适用）
 * @param funcs 函数列表
 * @return 多态函数
 */
function dispatch(...funs: any[]): (target: any, ...args: any[]) => any {
  return (target: any, ...args: any[]) => {
    let result
    for (let index = 0; index < funs.length; index++) {
      const fun = funs[index]
      result = fun.apply(fun, [target].concat(args))

      // TODO: 这里除了 undefined 和 null，其他值都算函数计算出了结果
      if (lambdas.exist(result)) return result
    }
  }
}

/**
 * 判断数据类型是否是 date 类型
 * @param target
 * @return 是否是 date 类型
 */
function isDate(target: any): target is Date {
  return Object.prototype.toString.call(target) === '[object Date]'
}

export { invoker, dispatch, isDate }
