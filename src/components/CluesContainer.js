import React from 'react';
import Clues from './Clues';

const CluesContainer = props => {
  return(
    <div id='clues-container'>
      <Clues
        type='across'
        clues={props.clues.across}
        clueDirection={props.clueDirection}
        />
      <Clues
        type='down'
        clues={props.clues.down}
        clueDirection={props.clueDirection}
        />
    </div>
  )
}

export default CluesContainer;
