/**
 * 转换键值对数组为对象
 * @param target 键值对数组
 * @return 对象
 */

function formPairs(list: any[]): object {
  const result: any = {};
  list.map((VK: any) => result[VK[0]] = VK[1]);
  return result;
}

export default formPairs;