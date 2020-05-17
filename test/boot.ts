const jasmineCore = require('jasmine-core');
// @ts-ignore
global.getJasmineRequireObj = function () { return jasmineCore; };
// @ts-ignore
global.fetch = require('node-fetch');
require('jasmine-ajax');
// 模拟响应 fetch　请求
require('jest-fetch-mock').enableMocks();
// 关闭模拟响应
// fetchMock.dontMock();