import React from 'react';

interface ClearProps {
  handleClear: () => void;
  tabId: number;
}

const ClearButton: React.FC<ClearProps> = (props: ClearProps) => {
  const { handleClear, tabId } = props;

  const keyClick = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    const item = ev.target as HTMLElement;
    if (ev.keyCode === 32) {
      item.click();
    }
  };

  return (
    <div
      role='button'
      className="box action clear"
      tabIndex={tabId}
      onKeyDown={keyClick}
      onClick={handleClear}
    >
      CLR
    </div>
  );
};

export default ClearButton;
