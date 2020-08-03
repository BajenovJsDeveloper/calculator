import React, { useState } from 'react';
import '../index.scss';

interface ResultProps {
  result: string;
}

interface EqualProps {
  hdlEqual: () => void;
}

interface DigitsProps {
  hdlClick: (num: string | undefined) => void;
}

const EqualButton: React.FC<EqualProps> = (
  props: EqualProps
): React.ReactElement => {
  const { hdlEqual } = props;
  const clickEqual = () => {
    hdlEqual();
  };
  return (
    <div className="box equal" onClick={clickEqual}>
      =
    </div>
  );
};

const DisplayResult: React.FC<ResultProps> = (
  props: ResultProps
): React.ReactElement => {
  const { result } = props;
  return <div className="box result">{result}</div>;
};

const Digits: React.FC<DigitsProps> = (props) => {
  const { hdlClick } = props;
  const digits = [0, 7, 8, 9, 4, 5, 6, 1, 2, 3];
  const numberClick = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    const tr = ev.target as HTMLElement;
    hdlClick(tr.dataset.id);
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

const App: React.FC = () => {
  const [result, setResult] = useState<string>('0');
  const digitsClick = (num: string | undefined) => {
    if (num) setResult(result + num);
  };

  const hdlClickEqual = () => {
    setResult('nothing');
  };

  return (
    <>
      <div className="container">
        <DisplayResult result={result} />
        <div className="digits">
          <div className="d-grid">
            <div className="box">clr</div>
            <EqualButton hdlEqual={hdlClickEqual} />
            <Digits hdlClick={digitsClick} />
          </div>
        </div>
        <div className="actions">
          <div className="box action">*</div>
          <div className="box action">+</div>
          <div className="box action">-</div>
          <div className="box action">:</div>
        </div>
      </div>
    </>
  );
};

export default App;
