import React from 'react';
import Clues from './Clues';

const CluesContainer = props => {
  let acrossClues = [];
  let downClues = [];
  let acrossClueTextCopy = props.clues.across.slice();
  let downClueTextCopy = props.clues.down.slice();

  for (var r = 0; r < props.gridNums.length; r++) {
    for (var c = 0; c < props.gridNums.length; c++) {
      if (props.gridNums[r][c] === 0){
        continue;
      } else {
        if ((c === 0) || (props.grid[r][c - 1] === '.')) {
          let clue = {
            gridNum: props.gridNums[r][c],
            row: r,
            column: c,
            text: acrossClueTextCopy.shift()
          }
          acrossClues.push(clue)
        }
        if ((r === 0) || (props.grid[r - 1][c] === '.')) {
          let clue = {
            gridNum: props.gridNums[r][c],
            row: r,
            column: c,
            text: downClueTextCopy.shift()
          }
          downClues.push(clue)
        }
      }
    }
  }

  return(
    <div id='clues-container'>
      <Clues
        type='across'
        grid={props.grid}
        clues={acrossClues}
        gridNums={props.gridNums}
        clueDirection={props.clueDirection}
        selectedCellRow={props.selectedCellRow}
        selectedCellColumn={props.selectedCellColumn}
        onClueClick={props.onClueClick}
        />
      <Clues
        type='down'
        grid={props.grid}
        clues={downClues}
        gridNums={props.gridNums}
        clueDirection={props.clueDirection}
        selectedCellRow={props.selectedCellRow}
        selectedCellColumn={props.selectedCellColumn}
        onClueClick={props.onClueClick}
        />
    </div>
  )
}

export default CluesContainer;
