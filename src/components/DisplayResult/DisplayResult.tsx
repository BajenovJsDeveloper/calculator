import React from 'react';

interface ResultProps {
  result: string | null;
}

const DisplayResult: React.FC<ResultProps> = (
  props: ResultProps
): React.ReactElement => {
  let { result } = props;
  result = result === null ? '0' : result;

  return <div className="box result">{result}</div>;
};

export default DisplayResult;


 // const newResult = result.split('');
 //  if(result.includes('*')){
	// const multiply:string = <React.Fragment>&times;</React.Fragment>;
	// const id = result.indexOf('*');
	// let newstr = result.split('').splice(id,1,multiply)
 //  } 