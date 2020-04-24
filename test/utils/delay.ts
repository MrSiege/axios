/**
 * 包装一个函数，使其每次在调用该函数 wait 毫秒后开始执行
 * @param func 包装的函数
 * @param wait 延缓毫秒数
 * @return 被包装的函数
 */
function defer(func: any, wait?: number): any {
  return (...args: any[]) => setTimeout(() => func(...args), wait);
}

export default defer;