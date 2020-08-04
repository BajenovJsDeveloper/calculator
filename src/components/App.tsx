import React, { useState } from 'react';
import '../index.scss';

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

const Calculator: React.FC = () => {
  const [result, setResult] = useState<ResultInit>(resultInit);
  // const [nums, setNums] = useState<Array<number>>([0,0]);

  const handleDigit = (num: string | undefined) => {
    if(num){
      const res = (result.res === null) ? '' : result.res;
      if(!result.action) {
        const a = (result.a === null) ? '' : result.a;
        setResult({...result, a: `${a}${num}`, res: `${res}${num}`});
      }
      else{
        const b = (result.b === null) ? '' : result.b;
        setResult({...result, b: `${b}${num}`, res: `${res}${num}`});
      }
    }
  };

  const handleEqual = () => {
    // setResult('nothing');
  };

  const handleClear = () => {
    setResult(resultInit);
  };
  const handleAction = (act:string) => {
    const res = (result.res === null)? '' : result.res;
    if(result.a && !result.action){
       setResult({...result, action: act, res: `${res} ${act} `});
    }
    //------------------------  fix this problem   
    else {
      
      setResult({...result, action: act, res: `${res.slice(0,-2)} ${act} `});
    }
    //--------------------------------------------
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
