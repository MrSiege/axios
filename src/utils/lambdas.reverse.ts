/**
 * 反转列表的顺序
 * @param list 列表
 * @return 反转后的列表
 */
function reverse<T>(list: T[]): T[] {
  const result = [];

  for(let index = list.length - 1; index >=0 ; index--) {
    result.push(list[index]);
  }

  return result;
}

export default reverse;