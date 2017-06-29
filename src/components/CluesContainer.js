import React from 'react';
import Clues from './Clues';

const CluesContainer = props => {
  return(
    <div id='clues-container'>
      <Clues
        type='across'
        grid={props.grid}
        clues={props.clues.across}
        gridNums={props.gridNums}
        clueDirection={props.clueDirection}
        selectedCellRow={props.selectedCellRow}
        selectedCellColumn={props.selectedCellColumn}
        />
      <Clues
        type='down'
        grid={props.grid}
        clues={props.clues.down}
        gridNums={props.gridNums}
        clueDirection={props.clueDirection}
        selectedCellRow={props.selectedCellRow}
        selectedCellColumn={props.selectedCellColumn}
        />
    </div>
  )
}

export default CluesContainer;
