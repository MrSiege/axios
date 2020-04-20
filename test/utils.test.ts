import * as utils from '../src/utils';

describe('utils', () => {
  test('utils.flow', () => {
    const fun1 = jest.fn(v => v + 1);
    const fun2 = jest.fn(v => v + 1);
    const fun3 = jest.fn(v => v + 1);

    const fun4 = utils.flow(fun1, fun2, fun3);
    const result = fun4(0);

    // 调用次数都应该为1次
    expect(fun1.mock.calls.length).toBe(1);
    expect(fun2.mock.calls.length).toBe(1);
    expect(fun3.mock.calls.length).toBe(1);
  
    // 每个函数的第一个参数应该为 x + 1 的递增关系，并且函数序列的调用顺序是从左至右
    expect(fun1.mock.calls[0][0]).toBe(0);
    expect(fun2.mock.calls[0][0]).toBe(1);
    expect(fun3.mock.calls[0][0]).toBe(2);

    // 结果应该为 3
    expect(result).toBe(3);
  })

  test('utils.compose', () => {
    const fun1 = jest.fn(v => v + 1);
    const fun2 = jest.fn(v => v + 1);
    const fun3 = jest.fn(v => v + 1);

    const fun4 = utils.compose(fun1, fun2, fun3);
    const result = fun4(0);

    // 调用次数都应该为1次
    expect(fun1.mock.calls.length).toBe(1);
    expect(fun2.mock.calls.length).toBe(1);
    expect(fun3.mock.calls.length).toBe(1);
  
    // 每个函数的第一个参数应该为 x + 1 的递增关系，并且函数序列的调用顺序是从右至左
    expect(fun3.mock.calls[0][0]).toBe(0);
    expect(fun2.mock.calls[0][0]).toBe(1);
    expect(fun1.mock.calls[0][0]).toBe(2);

    // 结果应该为 3
    expect(result).toBe(3);
  })

  test('utils.head and utils.tail', () => {
    const array = [1, 2, 3];
    const head = utils.head(array);
    const tail = utils.tail(array);

    expect(head).toBe(1);
    expect(tail).toStrictEqual([2, 3]);
    expect(array).toStrictEqual([1, 2, 3]);
  })

  test('utils.invoker', () => {
    const fun1 = utils.invoker('toString', Array.prototype.toString);
    const fun2 = utils.invoker('toString', String.prototype.toString);

    const data1= [1, 2, 3];
    const data2 = '123';
    const result1 = fun1(data1);
    const result2 = fun1(data2);
    const result3 = fun2(data2);

    expect(data1).toStrictEqual([1, 2, 3]);
    expect(data2).toBe('123');
    expect(result1).toBe('1,2,3');
    expect(result2).toBe(undefined);
    expect(result3).toBe('123');
  })

  test('utils.dispatch', () => {
    class Person {
      name: string;
      sex: string;
      constructor(name: string, sex: string){
        this.name= name;
        this.sex = sex;
      }
      toString(){
        const { name, sex } = this;
        return `her name is ${name}, A cute little ${sex}`
      }
    }

    const fun1 = jest.fn(utils.invoker('toString', Array.prototype.toString));
    const fun2 = jest.fn(utils.invoker('toString', String.prototype.toString));
    const fun3 = jest.fn(utils.invoker('toString', Person.prototype.toString));
    const polymorphismfn = utils.dispatch(fun1, fun2, fun3);

    const data1 = new Person('艾莉兹', 'girl');
    const data2 = 100236;
    const data3 = [ 'piano', 'violin', 'Lyre' ];

    const result1 = polymorphismfn(data1);
    const result2 = polymorphismfn(data2);
    const result3 = polymorphismfn(data3);

    expect(data1).toStrictEqual(new Person('艾莉兹', 'girl'));
    expect(data2).toBe(100236);
    expect(data3).toStrictEqual([ 'piano', 'violin', 'Lyre' ]);

    expect(result1).toBe('her name is 艾莉兹, A cute little girl');
    expect(result2).toBe(undefined);
    expect(result3).toBe('piano,violin,Lyre');
  })

  test('utils.isDate', () => {
    const data1 = new Date();
    const data2 = '2030-03-23';
    const result1 = utils.isDate(data1);
    const result2 = utils.isDate(data2);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
  })

  test('utils.formPairs', () => {
    const data1 = [['name', '雯梓'], ['artifact', 'Go']];
    const data2 = [['name', '张良'], ['title', 'Strategist'], ['artifact']];
    const result1 = utils.formPairs(data1);
    const result2 = utils.formPairs(data2);
    const result3 = utils.formPairs([]);
    
    expect(result1).toStrictEqual({ name: '雯梓', artifact: 'Go' });
    expect(result2).toStrictEqual({ name: '张良', title: 'Strategist', artifact: undefined });
    expect(result3).toStrictEqual({});
  })

  test('utils.pairs', () => {
    const data1 = { name: '雯梓', artifact: 'Go' };
    const data2 = { name: '张良', title: 'Strategist', artifact: undefined };
    const result1 = utils.pairs(data1);
    const result2 = utils.pairs(data2);
    const result3 = utils.pairs({});
    
    expect(result1).toStrictEqual([['name', '雯梓'], ['artifact', 'Go']]);
    expect(result2).toStrictEqual([['name', '张良'], ['title', 'Strategist'], ['artifact']]);
    expect(result3).toStrictEqual([]);
  })

  test('utils.reverse', () => {
    const data1 = [1, 2, 3];
    const data2 = [3, 2, 1];
    
    const result1 = utils.reverse(data1);
    const result2 = utils.reverse(data2);

    expect(result1).toStrictEqual(data2);
    expect(result2).toStrictEqual(data1);
  })

  test('utils.buildURL Test Without parameters', () => {
    const url = 'https://www.icourse163.org/home.html/#/home/course';
    const params = undefined;
    const result = utils.buildURL(url, params);

    expect(result).toStrictEqual('https://www.icourse163.org/home.html');
  })

  test('utils.buildURL Test whether the parameter conversion is correct', () => {
    const url = 'https://www.icourse163.org/home.html?name=Aliz';

    const params = {
      age: 19,
      birthday: new Date('2030-12-17T09:24:00'),
      teacher: 'Ashilia',
      friends: ['kaito', 'Alcateo, Bundia'],
    };

    const result = utils.buildURL(url, params);
    expect(result).toStrictEqual('https://www.icourse163.org/home.html?name=Aliz&age=19&birthday=2030-12-17T01:24:00.000Z&teacher=Ashilia&friends[]=kaito&friends[]=Alcateo,+Bundia');
  })
})