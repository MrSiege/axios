/**
 * 将 fun 函数应用到参数 target, 然后返回参数 target
 * @param fun 
 * @param target 
 * @return 参数
 */
function tap<T=any>(fun: (target: T) => void, target: T): T {
  fun(target);
  return target;
}

export default tap;