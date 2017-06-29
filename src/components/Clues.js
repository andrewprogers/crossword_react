import React from 'react';

const Clues = props => {
  let classString = 'clue-box';
  if (props.clueDirection === props.type) {
    classString += ' selected-clues';
  }

  let type = props.type
  let label = type.charAt(0).toUpperCase() + type.slice(1);

  if (props.clueDirection === 'across') {
    let col = props.selectedCellColumn;
    while (col > 0 && props.grid[props.selectedCellRow][col -1] !== '.') {
      col -= 1;
    }
  } else {
    let row = props.selectedCellRow;
    while (row > 0 && props.grid[row - 1][props.selectedCellColumn] !== '.') {
      row -= 1;
    }
  }

  let acrossNumbers = props.clues.map((clue) => {
    let num = clue.match(/^(\d*)\./)[1];
    return parseInt(num);
  })

  let clues = props.clues.map(clue => {
    return(
      <li key={clue}>{clue}</li>
    )
  })

  return(
    <div className={classString}>
      <h3>{label}</h3>
      <div className='clues'>
        <ul>
          {clues}
        </ul>
      </div>
    </div>
  )
}

export default Clues;

// type='across'
// clues={props.clues.across}
// gridNums={props.gridNums}
// clueDirection={props.clueDirection}
// selectedCellRow={props.selectedCellRow}
// selectedCellColumn={props.selectedCellColumn}
