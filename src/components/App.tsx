import React, { useState } from 'react';
import '../index.scss';

const RESULT_ERROR = 'Error';

interface ResultProps {
  result: string | null;
}

interface EqualProps {
  handleEqual: () => void;
}

interface DigitsProps {
  handleDigit: (num: string | undefined) => void;
}

const EqualButton: React.FC<EqualProps> = (
    props: EqualProps
  ): React.ReactElement => {
  const { handleEqual } = props;
  
  return (
    <div className="box equal" onClick={handleEqual}>
      =
    </div>
  );
};

const DisplayResult: React.FC<ResultProps> = (
    props: ResultProps
  ): React.ReactElement => {
  let { result } = props;
  result = result === null? '0': result; 
  return <div className="box result">{result}</div>;
};

const Digits: React.FC<DigitsProps> = (props: DigitsProps) => {
  const { handleDigit } = props;
  const digits = [0, 7, 8, 9, 4, 5, 6, 1, 2, 3];
  const numberClick = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    const tr = ev.target as HTMLElement;
    handleDigit(tr.dataset.id);
  };
  return (
    <>
      {digits.map((item, idx) => (
        <div
          key={`${item}a`}
          onClick={(ev) => numberClick(ev)}
          className="box"
          data-id={item}
        >
          {item}
        </div>
      ))}
    </>
  );
};

interface ClearProps {
  handleClear: () => void;
}

const ClearButton:React.FC<ClearProps> = (props:ClearProps) => {
  const { handleClear } = props;
  return (
      <div className='box action clear' onClick={handleClear}>clear</div>
    );
}

interface ActionsProps{
  handleAction: (act:string) => void;
}

const Actions:React.FC<ActionsProps> = (props:ActionsProps) => {

  const { handleAction } = props;
  const act:Array<string> = ['+','-','*',':'];

  const actClick = (e:React.SyntheticEvent<HTMLDivElement>) => {
    const item = e.target as HTMLElement;
    if(!!item.dataset.act) handleAction(item.dataset.act);
  }
  return (
      <div className="actions">
        {
          act.map(act => (<div key={act} 
            className="box action" 
            onClick={actClick}
            data-act={act}>{act}</div>))
        }
      </div>
    );
}

const resultInit:ResultInit  = {
  res: null,
  a: null,
  b:null,
  action:null,
}
interface ResultInit {
  res: null | string;
  a: null | string;
  b: null | string;
  action: null | string;
}

function resultString(digit:string, result:ResultInit):[string, string, string] {
  let a = (result.a === null)? '': result.a;
  let b = (result.b === null)? '': result.b;
  let act = (result.action === null)? '': result.action;
  let res = '';
  if(!act){
    console.log(a);
    a = Number(`${a}${digit}`).toString().split('').slice(0,15).join('');
  }
  else{
    b = Number(`${b}${digit}`).toString().split('').slice(0,15).join('');;
  }
  res= `${a} ${act} ${b}`;
  return [a, b, res]
}


const Calculator: React.FC = () => {
  const [result, setResult] = useState<ResultInit>(resultInit);

  const handleDigit = (digit: string | undefined) => {
    if(digit){
      let [a,b,res] = resultString(digit, result);
      if(!result.action) {
        setResult({...result, a: a, res: res});
      }
      else{
        setResult({...result, b: b, res: res});
      }
    }
  };

  const handleEqual = () => {
    if(result.a && result.b && result.action){
      const res = calculate(result.a, result.b, result.action);
      setResult({action: null, b: null, a: null, res: res});
    }
  };

  const calculate = (a: string | null,b: string | null, act: string | null) => {

    if(a && b && act){
      let res = '';
      console.log(a,b,act);
      switch (act) {
        case "+":
          res = (Number(a) + Number(b)).toString();
          break;
        case "-":
          res = (Number(a) - Number(b)).toString();
          break;
        case "*":
          res = (Number(a) * Number(b)).toString();
          break;
        case ":":
          let calc = (Number(a) / Number(b)).toString();
          res = (calc === 'Infinity' || calc === '-Infinity')? RESULT_ERROR : calc;
          break;
       
      } 
      return res;
    }
    return '';
  }

  const handleClear = () => {
    setResult(resultInit);
  };
  const handleAction = (act:string) => {
    let res:string = (result.res === null)? '' : result.res;
    let a = result.a;
    if(a){
      if(!result.b){
        // debugger;
        res = (result.action)? 
          `${res.split('').slice(0,-3).join('')} ${act} `:
          `${a} ${act} `;
      }
      else{
        let calc = calculate(result.a, result.b, result.action);
        console.log(calc);
        if(calc !== RESULT_ERROR){
          a = calc;
          res = `${a} ${act} `;
        }
        else {
         setResult({a: null, res: RESULT_ERROR, b: null, action: null});
         return
        }
      }
      setResult({a: a, res: res, b: null, action: act});
    }
  }

  return (
    <>
      <div className="container">
        <DisplayResult result={result.res} />
        <div className="digits">
          <div className="d-grid">
            <ClearButton handleClear={handleClear}/>
            <EqualButton handleEqual={handleEqual} />
            <Digits handleDigit={handleDigit} />
          </div>
        </div>
        <Actions handleAction={handleAction}/>
      </div>
    </>
  );
};

export default Calculator;
