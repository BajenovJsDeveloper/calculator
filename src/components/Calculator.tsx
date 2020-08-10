import React, { useEffect, useReducer } from 'react';
import Actions from './Actions/Actions';
import Digits from './Digits/Digits';
import ClearButton from './ClearButton/ClearButton';
import EqualButton from './EqualButton/EqualButton';
import DisplayResult from './DisplayResult/DisplayResult';
import initialState from '../State/initialState';
import { reducer } from '../State/reducer';
import '../index.scss';

const NUMBERS: string = '0123456789';
const BACKSPACE: number = 8;
const DELETE: number = 46;
const ESCAPE: number = 27;
const INIT_FOCUS: number = -1;
const FIRST_FOCUS: number = 1;
const SECOND_FOCUS: number = 2;
const LAST_FOCUS: number = 12;

interface Rref extends HTMLDivElement {
  readonly current: HTMLDivElement | null;
}

const Calculator: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const Ref: React.RefObject<Rref> = React.createRef();

  const handleDigit = (digit: string | undefined) => {
    dispatch({ type: 'DIGIT_CLICK', data: digit });
  };

  const handleEqual = () => {
    dispatch({ type: 'EQUAL_CLICK' });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_CLICK' });
  };

  const handleAction = (act: string) => {
    dispatch({ type: 'ACTION_CLICK', data: act });
  };

  const keyPress = (keyboard: React.KeyboardEvent<HTMLDivElement>) => {
    const keyAction: string = keyboard.key;
    const keyNumber: string = keyboard.key;
    const { keyCode } = keyboard;

    switch (keyAction) {
      case '+':
        handleAction(keyAction);
        //
        break;
      case '-':
        handleAction(keyAction);
        //
        break;
      case '*':
        handleAction(keyAction);
        //
        break;
      case '/':
        handleAction(':');
        //
        break;
      case 'Enter':
        handleEqual();
      //
    }
    if (NUMBERS.includes(keyNumber)) {
      handleDigit(keyNumber);
    }
    if (keyCode === BACKSPACE || keyCode === DELETE || keyCode === ESCAPE) {
      handleClear();
    }
  };

  useEffect(() => {
    if (Ref.current) Ref.current.focus();
  }, [Ref]);

  return (
    <>
      <h1>Calculator</h1>
      <div
        role="grid"
        className="container"
        onKeyDown={keyPress}
        tabIndex={INIT_FOCUS}
        ref={Ref}
      >
        <DisplayResult result={state.res} />
        <div className="digits">
          <div className="d-grid">
            <ClearButton handleClear={handleClear} tabId={FIRST_FOCUS} />
            <EqualButton handleEqual={handleEqual} tabId={SECOND_FOCUS} />
            <Digits handleDigit={handleDigit} />
          </div>
        </div>
        <Actions handleAction={handleAction} tabId={LAST_FOCUS} />
      </div>
    </>
  );
};

export default Calculator;
