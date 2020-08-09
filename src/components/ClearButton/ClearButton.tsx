import React from 'react';

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

export default ClearButton;
