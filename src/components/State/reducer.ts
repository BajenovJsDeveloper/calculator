import { ResultInit } from './initialState';

const RESULT_ERROR: string = 'Error';

export interface ActionObject {
  type: string;
  data?: string | undefined;
}

function calculate(
  a: string | null,
  b: string | null,
  act: string | null | undefined
): string {
  if (a !== null && b !== null && act !== null) {
    let result: string = '';
    switch (act) {
      case '+':
        result = (Number(a) + Number(b)).toString();
        break;
      case '-':
        result = (Number(a) - Number(b)).toString();
        break;
      case '*':
        result = (Number(a) * Number(b)).toString();
        break;
      case ':':{
        const calc: string = (Number(a) / Number(b)).toString();
        result = isNaN(Number(calc)) ? '0' : calc;
        result =
          calc === 'Infinity' || calc === '-Infinity' ? RESULT_ERROR : result;
      }
    }
    return result;
  }
  return '';
}

function resultToString(
  digit: string,
  state: ResultInit
): [string, string, string] {
  let a: string = state.a === null ? '' : state.a;
  let b: string = state.b === null ? '' : state.b;
  const act = state.action === null ? '' : state.action;
  let result = '';
  if (act === '') {
    // console.log(a);
    a =
      (a + digit).length < 16
        ? Number(`${a}${digit}`).toString().split('').slice(0, 15).join('')
        : a;
  } else {
    b =
      (b + digit).length < 16
        ? Number(`${b}${digit}`).toString().split('').slice(0, 15).join('')
        : b;
  }
  result = `${a} ${act} ${b}`;
  return [a, b, result];
}

function checkOutofRange(act: string | undefined, calc: string): ResultInit {
  let newCalcResult = calc;
  if (
    Number(newCalcResult) > Number.MAX_SAFE_INTEGER ||
    Number(newCalcResult) < Number.MIN_SAFE_INTEGER
  ) {
    newCalcResult = Number(newCalcResult).toExponential();
    return { res: newCalcResult, a: null, b: null, action: null };
  } 
  const a = newCalcResult;
  const result = `${a} ${act} `;
  return { res: result, a, b: null, action: act };
}
//-----------------------------------------------------------
function reducer(state: ResultInit, action: ActionObject) {
  let newState: ResultInit = { ...state };
  switch (action.type) {
    //-------------------------------------------------------
    case 'DIGIT_CLICK':{
      const digit = action.data;
      if (digit) {
        const [a, b, result] = resultToString(digit, state);
        const currentAction = state.action;
        newState = 
            (currentAction === null)
              ? { res: result, a, b: state.b, action: state.action }
              : { res: result, a: state.a, b, action: state.action };
      }
      break;
    }
    //-------------------------------------------------------
    case 'EQUAL_CLICK':{
      if (state.a && state.b && state.action) {
        const res = calculate(state.a, state.b, state.action);
        newState = { res, a: null, b: null, action: null };
      }
      break;
    }
    //-------------------------------------------------------
    case 'ACTION_CLICK':{
      let res: string = state.res === null ? '' : state.res;
      const { a } = state;
      const { b } = state;
      if (a !== null) {
        const act = action.data;
        if (b === null) {
          res = state.action
            ? `${res.split('').slice(0, -3).join('')} ${act} `
            : `${a} ${act} `;
          newState = { res, a, b: null, action: act };
        } else {
          const calc = calculate(state.a, b, state.action);
          newState =
              calc === RESULT_ERROR
                ? { res: RESULT_ERROR, a: null, b: null, action: null }
                : { ...checkOutofRange(act, calc) };
        }
        // console.log('action:',act);
      }
      break;
    }
    //-------------------------------------------------------
    case 'CLEAR_CLICK':{
      newState = { res: null, a: null, b: null, action: null };
    }
  }
  //-------------------------------------------------------
  return newState;
}

export { reducer };
