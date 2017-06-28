import React from 'react';
import CrosswordGrid from './CrosswordGrid'
import CluesContainer from './CluesContainer';

class CrosswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzle: this.props.initialPuzzle,
      clueDirection: "across"
    }
    this.replacePuzzle = this.replacePuzzle.bind(this);
  }

  replacePuzzle(newPuzzle) {
    this.setState({puzzle: newPuzzle})
  }

  render() {
    return(
      <div id='crossword-container' className="row">
        <div className='small-12 large-6 columns'>
          <CrosswordGrid
            puzzle={this.state.puzzle}
            clueDirection={this.state.clueDirection} />
        </div>
        <div className='small-12 large-6 columns'>
          <CluesContainer
            clues={this.state.puzzle.clues}
            clueDirection={this.state.clueDirection} />
        </div>
      </div>

    )
  }
}

export default CrosswordContainer;
