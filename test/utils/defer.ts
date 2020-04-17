function defer(func: any, ...args: any[]): NodeJS.Timeout {
  return setTimeout(() => func(...args), 0);
}

export default defer;