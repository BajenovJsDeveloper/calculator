import React from 'react';

interface ActionsProps {
  handleAction: (act: string) => void;
  tabId: number;
}

const Actions: React.FC<ActionsProps> = (props: ActionsProps) => {
  const { handleAction, tabId } = props;
  const divide = <>&divide;</>;
  const multiply = <>&times;</>;
  const minus = <>&ndash;</>;
  const plus = <>&#43;</>;
  const elems: Array<JSX.Element> = [plus, minus, multiply, divide];
  const actItem: Array<string> = ['+', '-', '*', ':'];

  const actClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const item = e.target as HTMLElement;
    if (item.dataset.act) handleAction(item.dataset.act);
  };

  const keyClick = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    const item = ev.target as HTMLElement;
    if (ev.keyCode === 32) {
      item.click();
    }
  };
  return (
    <div className="actions">
      {actItem.map((item: string, idx: number) => (
        <div
          role='button'
          key={item}
          className="box action"
          onClick={actClick}
          onKeyDown={keyClick}
          tabIndex={idx + tabId}
          data-act={item}
        >
          {elems[idx]}
        </div>
      ))}
    </div>
  );
};

export default Actions;
