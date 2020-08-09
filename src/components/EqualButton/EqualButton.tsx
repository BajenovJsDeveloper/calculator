import React from 'react'

interface EqualProps {
  handleEqual: () => void;
  tabId: number;
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

export default EqualButton;