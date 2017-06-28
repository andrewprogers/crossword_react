import React from 'react';
import Clues from './Clues';

class CluesContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div id='clues-container'>
        <Clues
          type='across'
          clues={this.props.clues.across}
          />
        <Clues
          type='down'
          clues={this.props.clues.down}
          />
      </div>
    )
  }
}

export default CluesContainer;
