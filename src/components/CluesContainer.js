import React from 'react';
import Clues from './Clues';

const CluesContainer = props => {
  return(
    <div id='clues-container'>
      <Clues
        type='across'
        clues={props.clues.across}
        />
      <Clues
        type='down'
        clues={props.clues.down}
        />
    </div>
  )
}

export default CluesContainer;
