import React from 'react'

interface EqualProps {
  handleEqual: () => void;
  tabId: number;
}

const EqualButton: React.FC<EqualProps> = (
  props: EqualProps
): React.ReactElement => {
  const { handleEqual, tabId } = props;

  const keyClick = (ev:React.KeyboardEvent<HTMLDivElement>) => {
    const item = ev.target as HTMLElement;
    if(ev.keyCode === 32){
      item.click();
    }
  }

  return (
    <div 
    	className="box equal" 
    	tabIndex={tabId} 
    	onKeyDown={keyClick}
    	onClick={handleEqual}>
      =
    </div>
  );
};

export default EqualButton;