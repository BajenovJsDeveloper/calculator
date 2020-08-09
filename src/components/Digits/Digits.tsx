import React from 'react';

interface DigitsProps {
  handleDigit: (num: string | undefined) => void;
}

const Digits: React.FC<DigitsProps> = (props: DigitsProps) => {
  const { handleDigit } = props;
  const digits: Array<number> = [0, 7, 8, 9, 4, 5, 6, 1, 2, 3];
  const numberClick = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    const tr = ev.target as HTMLElement;
    handleDigit(tr.dataset.id);
  };

  const keyClick = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    const item = ev.target as HTMLElement;
    if (ev.keyCode === 32) {
      item.click();
    }
  };

  return (
    <>
      {digits.map((item: number, idx: number) => (
        <div
          role='button'
          key={`${item}a`}
          onClick={(ev) => numberClick(ev)}
          className="box"
          data-id={item}
          onKeyDown={keyClick}
          tabIndex={item + 2}
        >
          {item}
        </div>
      ))}
    </>
  );
};

export default Digits;
