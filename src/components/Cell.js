import React from 'react';

const Cell = props => {
  let letter = props.letter
  let classString = 'cell unselectable'
  if (props.letter === '.') {
    classString += ' shaded'
    letter = '';
  }
  if (props.selected) {
    classString += ' selectedCell'
  }
  let number = (props.number) ? props.number : '';
  return(
    <div className={classString} onClick={props.onClick}>
      <div className="cell-number row">{number}</div>
      <input
        type='text'
        className="cell-letter row"
        value={letter}
        onKeyDownCapture={props.onKeyDown}/>
    </div>
  )
}

export default Cell;
