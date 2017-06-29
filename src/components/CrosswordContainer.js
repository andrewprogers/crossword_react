import React from 'react';
import CrosswordGrid from './CrosswordGrid'
import CluesContainer from './CluesContainer';

class CrosswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzle: this.props.initialPuzzle,
      grid: this.parseGrid(this.props.initialPuzzle.grid),
      selectedCellRow: 0,
      selectedCellColumn: 0,
      clueDirection: "across"
    }
    this.updateSelectedCell = this.updateSelectedCell.bind(this);
    //this.changeClueDirection = this.changeClueDirection.bind(this);
  }

  parseGrid(puzzleArray) {
    let size = Math.sqrt(puzzleArray.length)
    let newGrid = []
    for (var i = 0; i < size; i++) {
      let start = i * size
      newGrid.push(puzzleArray.slice(start, start + size))
    }
    return newGrid;
  }

  updateSelectedCell(row, column) {
    this.setState({
      selectedCellRow: row,
      selectedCellColumn: column
    })
  }

  render() {
    return(
      <div id='crossword-container' className="row">
        <div className='small-12 large-6 columns'>
          <CrosswordGrid
            grid={this.state.grid}
            puzzle={this.state.puzzle}
            selectedCellRow={this.state.selectedCellRow}
            selectedCellColumn={this.state.selectedCellColumn}
            clueDirection={this.state.clueDirection}
            onCellChange={this.updateSelectedCell} />
        </div>
        <div className='small-12 large-6 columns'>
          <CluesContainer
            clues={this.state.puzzle.clues}
            selectedCellRow={this.state.selectedCellRow}
            selectedCellColumn={this.state.selectedCellColumn}
            clueDirection={this.state.clueDirection} />
        </div>
      </div>

    )
  }
}

export default CrosswordContainer;
