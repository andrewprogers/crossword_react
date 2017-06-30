import React from 'react';

const Cell = props => {
  let letter = props.letter
  let classString = 'cell unselectable'
  let clickHandler = props.onClick;

  if (props.letter === '.') {
    classString += ' shaded'
    letter = '';
    clickHandler = null;
  }
  if (props.selected) {
    classString += ' selectedCell'
  }

  let number = (props.number) ? props.number : '';
  return(
    <div className={classString} onClick={clickHandler}>
      <div className="cell-number row">{number}</div>
      <input
        type='text'
        className="cell-letter row"
        value={letter}
        onKeyDownCapture={props.on.handleKeyDown}/>
    </div>
  )
}

export default Cell;
