// TODO: 如果需要在 ts 编写的测试用例中引入基于 js 开发的第三方库，则需要配置 tsconfig.json 的 compilerOptions.allowJs 属性为 true
import * as lambdas from 'lambdas'

describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })
})
