import React, { useState, useRef, useEffect, useReducer } from 'react';

import '../index.scss';

const RESULT_ERROR: string = 'Error';
const NUMBERS: string = '0123456789';
const BACKSPACE: number = 8;
const DELETE: number = 46;
const ESCAPE: number = 27;

interface ResultProps {
  result: string | null;
}

interface EqualProps {
  handleEqual: () => void;
  tabId: number;
}

interface DigitsProps {
  handleDigit: (num: string | undefined) => void;
}

function reducer(state:{name:string}, action:{type:string}){
  switch(action.type){
    case 'ADD':
      return {...state, name:'hello'}
  }
  return {...state};
}

const EqualButton: React.FC<EqualProps> = (
  props: EqualProps
): React.ReactElement => {
  const { handleEqual, tabId } = props;

  return (
    <div className="box equal" tabIndex={tabId} onClick={handleEqual}>
      =
    </div>
  );
};

const DisplayResult: React.FC<ResultProps> = (
  props: ResultProps
): React.ReactElement => {
  let { result } = props;
  result = result === null ? '0' : result;

  return <div className="box result">{result}</div>;
};

const Digits: React.FC<DigitsProps> = (props: DigitsProps) => {
  const { handleDigit } = props;
  const digits: Array<number> = [0, 7, 8, 9, 4, 5, 6, 1, 2, 3];
  const numberClick = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    const tr = ev.target as HTMLElement;
    handleDigit(tr.dataset.id);
  };

  const keyClick = (ev:React.KeyboardEvent<HTMLDivElement>) => {
    const item = ev.target as HTMLElement;
    if(ev.keyCode === 32){
      item.click();
    }
  }

  return (
    <>
      {digits.map((item: number, idx: number) => (
        <div
          key={`${item}a`}
          onClick={(ev) => numberClick(ev)}
          className="box"
          data-id={item}
          onKeyDown={keyClick}
          tabIndex={item+2}
        >
          {item}
        </div>
      ))}
    </>
  );
};

interface ClearProps {
  handleClear: () => void;
  tabId: number;
}

const ClearButton: React.FC<ClearProps> = (props: ClearProps) => {
  const { handleClear, tabId } = props;

  return (
    <div className="box action clear" tabIndex={tabId} onClick={handleClear}>
      CLR
    </div>
  );
};

interface ActionsProps {
  handleAction: (act: string) => void;
  tabId: number;
}

const Actions: React.FC<ActionsProps> = (props: ActionsProps) => {
  const { handleAction, tabId } = props;
  const divide = <React.Fragment>&divide;</React.Fragment>;
  const multiply = <React.Fragment>&times;</React.Fragment>;
  const minus = <React.Fragment>&ndash;</React.Fragment>;
  const plus = <React.Fragment>&#43;</React.Fragment>;
  const elems: Array<JSX.Element> = [ plus, minus, multiply, divide];
  const actItem: Array<string> = ['+', '-', '*', ':'];

  const actClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const item = e.target as HTMLElement;
    if (!!item.dataset.act) handleAction(item.dataset.act);
  };
  return (
    <div className="actions">
      {actItem.map((actItem: string, idx: number) => (
        <div
          key={actItem}
          className="box action"
          onClick={actClick}
          tabIndex={idx + tabId}
          data-act={actItem}
        >
          {elems[idx]}
        </div>
      ))}
    </div>
  );
};

const resultInit: ResultInit = {
  res: null,
  a: null,
  b: null,
  action: null,
};
interface ResultInit {
  res: null | string;
  a: null | string;
  b: null | string;
  action: null | string;
}

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
  const [result, setResult] = useState<ResultInit>(resultInit);
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
    setResult(resultInit);
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
