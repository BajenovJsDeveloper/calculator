import React from 'react';
import '../index.scss';

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <div className='box result'>0</div>
        <div className='box clr'>clear</div>
        <div className='box'>0</div>
        <div className='box action'>*</div>
        <div className='box'>7</div>
        <div className='box'>8</div>
        <div className='box'>9</div>
        <div className='box action'>+</div>
        <div className='box'>4</div>
        <div className='box'>5</div>
        <div className='box'>6</div>
        <div className='box action'>-</div>
        <div className='box'>1</div>
        <div className='box'>2</div>
        <div className='box'>3</div>
        <div className='box action'>:</div>
      </div>
    </React.Fragment>
  );
}

export default App;
