import React from 'react';

const Cell = props => {
  let letter = props.letter
  let classString = 'cell unselectable'
  if (props.letter === '.') {
    classString += ' shaded'
    letter = null;
  }
  if (props.selected) {
    classString += ' selectedCell'
  }
  let number = (props.number) ? props.number : '';
  return(
    <div className={classString} onClick={props.onClick}>
      <div className="cell-number row">{number}</div>
      <div className="cell-letter row">{letter}</div>
    </div>
  )
}

export default Cell;
