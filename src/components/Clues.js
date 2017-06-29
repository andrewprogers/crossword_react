import React from 'react';

const Clues = props => {
  let getSelectedClueCell = () => {
    if (props.clueDirection === 'across') {
      let col = props.selectedCellColumn;
      while (col > 0 && props.grid[props.selectedCellRow][col -1] !== '.') {
        col -= 1;
      }
      return ({
        row: props.selectedCellRow,
        column: col,
        gridNum: props.gridNums[props.selectedCellRow][col]
      })
    } else {
      let row = props.selectedCellRow;
      while (row > 0 && props.grid[row - 1][props.selectedCellColumn] !== '.') {
        row -= 1;
      }
      return ({
        row: row,
        column: props.selectedCellColumn,
        gridNum: props.gridNums[row][props.selectedCellColumn]
      })
    }
  }

  let classString = 'clue-box';
  if (props.clueDirection === props.type) {
    classString += ' selected-clues';
  }

  let type = props.type
  let label = type.charAt(0).toUpperCase() + type.slice(1);

  let clueCell = getSelectedClueCell();
  let selected = clueCell.gridNum;
  let clues = props.clues.map(clueObj => {
    let className = (selected === clueObj.gridNum) ? "selected" : "";
    let clickHandler = () => {
      props.onClueClick(clueObj.row, clueObj.column)
      if (props.clueDirection !== props.type) {
        props.changeClueDirection(type)
      }
    }
    return(
      <li
        key={clueObj.text}
        onClick={clickHandler}
        className={className}>{clueObj.text}</li>
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
// onClueClick
