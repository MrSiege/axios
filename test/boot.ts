const jasmineCore = require('jasmine-core');
// @ts-ignore
global.getJasmineRequireObj = function () { return jasmineCore; };
// @ts-ignore
global.fetch = require('node-fetch');
require('jasmine-ajax');