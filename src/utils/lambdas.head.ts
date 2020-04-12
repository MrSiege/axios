/**
 * 返回列表的第一个元素
 * @param list 列表
 * @return 列表的第一个元素
 */
function head<T>(list: T[]): T {
  return list[0];
}

export default head;