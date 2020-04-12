import * as lambdas from 'lambdas';

/**
 * 转换数组为键值对数组
 * @param target 目标对象
 * @return 键值对数组
 */
function pairs(target: object): any[] {
  return lambdas.zip(
    lambdas.keys(target),
    lambdas.values(target),
  );
}

export default pairs;