import React from 'react';
import CrosswordGrid from './CrosswordGrid'

class CrosswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzle: this.props.initialPuzzle
    }
    this.replacePuzzle = this.replacePuzzle.bind(this);
  }

  replacePuzzle(newPuzzle) {
    this.setState({puzzle: newPuzzle})
  }

  render() {
    return(
      <div>
        <CrosswordGrid
          puzzle={this.state.puzzle} />
      </div>

    )
  }
}

export default CrosswordContainer;
