import { default as flow } from './lambdas.flow';

/**
 * 读取指定键的cookie
 * @param key 键
 * @return value cookie的值
 */
function cookieRead(key: string): string {
  const resolver = flow(
    (v: string) => v.split(';'),
    (v: string[]) => v.map(x => x.split('=')),
    (v: [string, string][]) => new Map(v),
  );

  const cookies = resolver(document.cookie);
  return cookies.get(key);
}

export default cookieRead;