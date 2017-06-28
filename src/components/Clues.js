import React from 'react';

const Clues = props => {
  let type = props.type
  let label = type.charAt(0).toUpperCase() + type.slice(1);
  let clues = props.clues.map(clue => {
    return(
      <li key={clue}>{clue}</li>
    )
  })

  return(
    <div>
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
