import { reducer } from '../State/reducer';

const MAX_RANGE = 1000000000;
const TEST_COUNT = 20;

describe('Testing reducer...', () => {
  const state = {
    res: null,
    a: null,
    b: null,
    action: null,
  };
  test('digit click  should return number 1', () => {
    const digit = '1';
    const result = '1  ';
    const newState = { ...state, res: result, a: digit };
    expect(reducer(state, { type: 'DIGIT_CLICK', data: digit })).toEqual(
      newState
    );
  });
  test('digit click  should return number legth 15 digits', () => {
    const digit = '1';
    const result = '123456789012345';
    const newState = { ...state, res: result, a: result };
    expect(
      reducer(newState, { type: 'DIGIT_CLICK', data: digit }).res
    ).toHaveLength(15 + 2);
  });
  test('digit click should return second number', () => {
    const newState = { a: '1', b: null, res: '1 + ', action: '+' };
    expect(reducer(newState, { type: 'DIGIT_CLICK', data:'2' }).b).toEqual('2');
  });
  test('test 1 : 0 should return Error', () => {
    const newState = { a: '1', b: '0', res: null, action: ':' };
    expect(reducer(newState, { type: 'EQUAL_CLICK' }).res).toEqual('Error');
  });
  test('test 0 : 0 should return 0', () => {
    const newState = { a: '0', b: '0', res: null, action: ':' };
    expect(reducer(newState, { type: 'EQUAL_CLICK' }).res).toEqual('0');
  });
  test('test action + should return sum of two numbers', () => {
    const newState = { a: '0', b: '1', res: null, action: '+' };
    expect(reducer(newState, { type: 'ACTION_CLICK', data: '+' }).res).toEqual('1 + ');
  });
  test('test CLR action should return 0', () => {
    const newState = { a: '123', b:'456', res: '123 + ', action: '+' };
    expect(reducer(newState, { type: 'CLEAR_CLICK' })).toEqual(state);
  });

});


describe('Test with several sequence of [+] operations', () => {
  for (let j = 0; j < TEST_COUNT; j++) {
    const a = Math.round(Math.random() * MAX_RANGE);
    const b = Math.round(Math.random() * MAX_RANGE);
    const result = (a + b).toString();
    const newState = {
      a: a.toString(),
      b: b.toString(),
      res: null,
      action: '+',
    };
    test(`${a} + ${b} should return: ${result}`, () => {
      expect(reducer(newState, { type: 'EQUAL_CLICK' }).res).toEqual(result);
    });
  }
});
describe('Test with several sequence of [-] operations', () => {
  for (let j = 0; j < TEST_COUNT; j++) {
    const a = Math.round(Math.random() * MAX_RANGE);
    const b = Math.round(Math.random() * MAX_RANGE);
    const result = (a - b).toString();
    const newState = {
      a: a.toString(),
      b: b.toString(),
      res: null,
      action: '-',
    };
    test(`${a} - ${b} should return: ${result}`, () => {
      expect(reducer(newState, { type: 'EQUAL_CLICK' }).res).toEqual(result);
    });
  }
});
describe('Test with several sequence of [*] operations', () => {
  for (let j = 0; j < TEST_COUNT; j++) {
    const a = Math.round(Math.random() * MAX_RANGE);
    const b = Math.round(Math.random() * MAX_RANGE);
    const result =
      a * b > Number.MAX_SAFE_INTEGER
        ? (a * b).toExponential()
        : (a * b).toString();
    const newState = {
      a: a.toString(),
      b: b.toString(),
      res: null,
      action: '*',
    };
    test(`${a} * ${b} should return: ${result}`, () => {
      expect(reducer(newState, { type: 'EQUAL_CLICK' }).res).toEqual(result);
    });
  }
});
describe('Test with several sequence of [:] operations', () => {
  for (let j = 0; j < TEST_COUNT; j++) {
    const a = Math.round(Math.random() * MAX_RANGE);
    const b = Math.round(Math.random() * MAX_RANGE);
    const result =
      a / b > Number.MAX_SAFE_INTEGER
        ? (a / b).toExponential()
        : (a / b).toString();
    const newState = {
      a: a.toString(),
      b: b.toString(),
      res: null,
      action: ':',
    };
    test(`${a} : ${b} should return: ${result}`, () => {
      expect(reducer(newState, { type: 'EQUAL_CLICK' }).res).toEqual(result);
    });
  }
});

