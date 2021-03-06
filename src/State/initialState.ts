const initialState: ResultInit = {
  res: null,
  a: null,
  b: null,
  action: null,
  complete: false,
};
export interface ResultInit {
  res: null | string;
  a: null | string;
  b: null | string;
  action: null | string | undefined;
  complete: boolean;
}

export default initialState;
