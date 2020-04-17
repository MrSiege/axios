# Quick Reference Manual for Common Problems of Environmental Configuration
# 环境配置常见问题快速参考手册

### 1. 运行 `npm run test` 报错
- 检查测试用例中是否引入了第三方 js 库，如有，请修改配置 `tsconfig.json` 的 `compilerOptions.allowJs` 属性为 `true`

### 2. 运行 `typedoc` 报错堆栈溢出
- `package.json` 中的 `babel-jest` 依赖会与 `typedoc` 冲突，删掉该依赖即可运行。
- 将`package.json` 中的 `jest` 版本设置为 `23.6.0`, 其他的版本会与 `typedoc` 冲突。

### 2. 使用 jasmine-ajax 测试时 jasmine.Ajax 为 undefined
- 将`package.json` 中的 `jest` 版本设置为 `25.1.0`, 其他的版本会有问题

> 这环境的坑多的离谱，能少用外来的工具就少用，如 `typedoc` 就可以舍弃，生成的文档也是乱的一团糟，谁看得懂？不如自己写。