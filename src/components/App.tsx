import React, { useState, useRef, useEffect, useReducer } from 'react';
import Actions from './Actions/Actions';
import Digits from './Digits/Digits';
import ClearButton from './ClearButton/ClearButton';
import EqualButton from './EqualButton/EqualButton';
import DisplayResult from './DisplayResult/DisplayResult';
import initialState, {ResultInit}  from './State/initialState';
import {reducer} from './State/reducer';
import '../index.scss';

const RESULT_ERROR: string = 'Error';
const NUMBERS: string = '0123456789';
const BACKSPACE: number = 8;
const DELETE: number = 46;
const ESCAPE: number = 27;






function resultToString(
  digit: string,
  result: ResultInit
): [string, string, string] {
  let a: string = result.a === null ? '' : result.a;
  let b: string = result.b === null ? '' : result.b;
  let act = result.action === null ? '' : result.action;
  let res = '';
  if (!act) {
    console.log(a);
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
  res = `${a} ${act} ${b}`;
  return [a, b, res];
}

interface Rref extends HTMLDivElement {
  readonly current: HTMLDivElement | null;
}

const Calculator: React.FC = () => {
  const [result, setResult] = useState<ResultInit>(initialState);
  const [state, dispatch] = useReducer(reducer, {name:''});
  const Ref: React.RefObject<Rref> = React.createRef();

  const handleDigit = (digit: string | undefined) => {
    if (digit) {
      let [a, b, res] = resultToString(digit, result);
      if (!result.action) {
        setResult({ ...result, a: a, res: res });
      } else {
        setResult({ ...result, b: b, res: res });
      }
    }
    dispatch({type:'ADD'});
  };

  const handleEqual = () => {
    if (result.a && result.b && result.action) {
      const res = calculate(result.a, result.b, result.action);
      setResult({ action: null, b: null, a: null, res: res });
    }
  };

  const calculate = (
    a: string | null,
    b: string | null,
    act: string | null
  ) => {
    if (a !== null && b !== null && act !== null) {
      let res = '';
      // console.log(a, b, act);
      switch (act) {
        case '+':
          res = (Number(a) + Number(b)).toString();
          break;
        case '-':
          res = (Number(a) - Number(b)).toString();
          break;
        case '*':
          res = (Number(a) * Number(b)).toString();
          break;
        case ':':
          let calc = (Number(a) / Number(b)).toString();
            res = isNaN(Number(calc))? '0' : calc;
            res = (calc === 'Infinity' || calc === '-Infinity') ? RESULT_ERROR : res;
      }
      return res;
    }
    return '';
  };

  const handleClear = () => {
    setResult(initialState);
  };
  const handleAction = (act: string) => {
    let res: string = result.res === null ? '' : result.res;
    let a = result.a;
    if (a) {
      if (!result.b) {
        res = result.action
          ? `${res.split('').slice(0, -3).join('')} ${act} `
          : `${a} ${act} `;
      } else {
        let calc = calculate(result.a, result.b, result.action);
        console.log(calc);
        if (calc !== RESULT_ERROR) {
          if (
            Number(calc) > Number.MAX_SAFE_INTEGER ||
            Number(calc) < Number.MIN_SAFE_INTEGER
          ) {
            calc = Number(calc).toExponential();
            setResult({ a: null, res: calc, b: null, action: null });
            return;
          }
          a = calc;
          res = `${a} ${act} `;
        } else {
          setResult({ a: null, res: RESULT_ERROR, b: null, action: null });
          return;
        }
      }
      setResult({ a: a, res: res, b: null, action: act });
    }
  };

  const keyPress = (keyboard: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(keyboard.keyCode, keyboard.key);
    const keyAction: string = keyboard.key;
    const keyNumber: string = keyboard.key;
    const keyCode: number = keyboard.keyCode;

    switch (keyAction) {
      case '+':
        handleAction(keyAction);
        //
        break;
      case '-':
        handleAction(keyAction);
        //
        break;
      case '*':
        handleAction(keyAction);
        //
        break;
      case '/':
        handleAction(':');
        //
        break;
      case 'Enter':
        handleEqual();
      //
    }
    if (NUMBERS.includes(keyNumber)) {
      handleDigit(keyNumber);
    }
    if (keyCode == BACKSPACE || keyCode == DELETE || keyCode == ESCAPE) {
      handleClear();
    }
  };

  useEffect(() => {
    if (Ref.current) Ref.current.focus();
  }, [Ref.current]);

  return (
    <>
      <h1>Calculator {state.name}</h1>
      <div className="container" onKeyDown={keyPress} tabIndex={-1} ref={Ref}>
        <DisplayResult result={result.res} />
        <div className="digits">
          <div className="d-grid">
            <ClearButton handleClear={handleClear} tabId={1} />
            <EqualButton handleEqual={handleEqual} tabId={2} />
            <Digits handleDigit={handleDigit} />
          </div>
        </div>
        <Actions handleAction={handleAction} tabId={12} />
      </div>
    </>
  );
};

export default Calculator;
