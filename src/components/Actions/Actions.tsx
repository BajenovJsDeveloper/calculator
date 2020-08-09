import React from 'react'

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

export default Actions