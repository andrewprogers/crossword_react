import React from 'react';
import CrosswordGrid from './CrosswordGrid'
import CluesContainer from './CluesContainer';

class CrosswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzle: this.props.initialPuzzle,
      selectedCell: 0,
      clueDirection: "across"
    }
    this.replacePuzzle = this.replacePuzzle.bind(this);
    this.updateSelectedCell = this.updateSelectedCell.bind(this);
    //this.changeClueDirection = this.changeClueDirection.bind(this);
  }

  replacePuzzle(newPuzzle) {
    this.setState({puzzle: newPuzzle})
  }

  updateSelectedCell(cellIndex) {
    this.setState({selectedCell: cellIndex})
  }

  render() {
    return(
      <div id='crossword-container' className="row">
        <div className='small-12 large-6 columns'>
          <CrosswordGrid
            puzzle={this.state.puzzle}
            selectedCell={this.state.selectedCell}
            clueDirection={this.state.clueDirection}
            onCellChange={this.updateSelectedCell} />
        </div>
        <div className='small-12 large-6 columns'>
          <CluesContainer
            clues={this.state.puzzle.clues}
            selectedCell={this.state.selectedCell}
            clueDirection={this.state.clueDirection} />
        </div>
      </div>

    )
  }
}

export default CrosswordContainer;
