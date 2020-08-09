import React from 'react';

interface ResultProps {
  result: string | null;
}

const DisplayResult: React.FC<ResultProps> = (
  props: ResultProps
): React.ReactElement => {
  let { result } = props;
  result = result === null ? '0' : result;
  const newResult: Array<string> = result.split('');
  const id: number = newResult.indexOf('*');

  if (id !== -1) newResult[id] = String.fromCharCode(215);

  return <div className="box result">{newResult}</div>;
};

export default DisplayResult;
